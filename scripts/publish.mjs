import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export function mergePlugin(catalog, incoming) {
    const index = catalog.findIndex(p => p.guid === incoming.guid);
    if (catalog.filter(p => p.guid === incoming.guid).length > 1) throw new Error('Duplicate plugin GUID');
    const old = index < 0 ? null : catalog[index];
    const versions = [...(old?.versions ?? [])];
    for (const version of incoming.versions) {
        const found = versions.find(v => v.version === version.version);
        if (found && (found.checksum !== version.checksum || found.sourceUrl !== version.sourceUrl || found.targetAbi !== version.targetAbi)) {
            throw new Error(`Released version ${incoming.name} ${version.version} is immutable`);
        }
        if (!found) versions.push(version);
    }
    versions.sort((a, b) => {
        const x = a.version.split('.').map(Number), y = b.version.split('.').map(Number);
        for (let i = 0; i < 4; i++) if (x[i] !== y[i]) return y[i] - x[i];
        return 0;
    });
    const result = [...catalog];
    const plugin = { ...old, ...incoming, versions };
    if (index < 0) result.push(plugin); else result[index] = plugin;
    return result;
}

export function validatePackage(descriptor, bytes, repository) {
    const plugin = descriptor.plugin;
    if (!plugin || plugin.versions?.length !== 1 || !/^[a-f0-9-]{36}$/i.test(plugin.guid)) throw new Error('Invalid plugin descriptor');
    const version = plugin.versions[0];
    if (!/^\d+\.\d+\.\d+\.\d+$/.test(version.version) || !/^\d+\.\d+\.\d+\.\d+$/.test(version.targetAbi)) throw new Error('Invalid version or ABI');
    if (!/^[a-z0-9-]+-v\d+\.\d+\.\d+\.\d+$/.test(descriptor.tag)) throw new Error('Invalid release tag');
    if (!/^[A-Za-z0-9._-]+\.zip$/.test(descriptor.assetName)) throw new Error('Invalid ZIP asset name');
    const expected = `https://github.com/${repository}/releases/download/${descriptor.tag}/${descriptor.assetName}`;
    if (version.sourceUrl !== expected) throw new Error('Package URL does not match release destination');
    if (bytes.length > 16 * 1024 * 1024) throw new Error('Package exceeds publication size limit');
    if (crypto.createHash('md5').update(bytes).digest('hex') !== version.checksum) throw new Error('MD5 mismatch');
    if (crypto.createHash('sha256').update(bytes).digest('hex') !== descriptor.sha256) throw new Error('SHA256 mismatch');
}

function command(exe, args, allowFailure = false) {
    const result = spawnSync(exe, args, { encoding: 'utf8' });
    if (result.error) throw result.error;
    if (result.status !== 0 && !allowFailure) throw new Error(`${exe} failed: ${result.stderr || result.stdout}`);
    return result;
}

async function publish() {
    const repository = process.env.GITHUB_REPOSITORY;
    if (!repository || !/^[\w.-]+\/[\w.-]+$/.test(repository)) throw new Error('Run inside the distribution repository workflow');
    const repo = JSON.parse(command('gh', ['api', `repos/${repository}`]).stdout);
    if (repo.private) throw new Error('Jellyfin distribution must be publicly accessible');
    const catalogPath = 'manifest.json';
    let catalog = fs.existsSync(catalogPath) ? JSON.parse(fs.readFileSync(catalogPath, 'utf8')) : [];
    if (!Array.isArray(catalog)) throw new Error('Catalog must be an array');
    const files = [];
    for (const plugin of fs.readdirSync('.packages', { withFileTypes: true })) {
        if (!plugin.isDirectory()) continue;
        for (const version of fs.readdirSync(path.join('.packages', plugin.name), { withFileTypes: true })) {
            if (!version.isDirectory()) continue;
            const file = path.join('.packages', plugin.name, version.name, 'release.json');
            if (fs.existsSync(file)) files.push(file);
        }
    }
    for (const file of files.sort()) {
        const descriptor = JSON.parse(fs.readFileSync(file, 'utf8'));
        const bytes = Buffer.from(fs.readFileSync(path.join(path.dirname(file), 'package.zip.b64'), 'utf8').trim(), 'base64');
        validatePackage(descriptor, bytes, repository);
        // Validate immutable catalog history before publishing any asset.
        const updated = mergePlugin(catalog, descriptor.plugin);
        const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'jellyfin-plugin-'));
        const asset = path.join(temp, descriptor.assetName);
        fs.writeFileSync(asset, bytes);
        const release = command('gh', ['api', `repos/${repository}/releases/tags/${descriptor.tag}`], true);
        if (release.status === 0) {
            const existing = JSON.parse(release.stdout);
            if (existing.draft) throw new Error('Existing release is a draft; resolve it before retrying');
            const download = path.join(temp, 'existing');
            fs.mkdirSync(download);
            command('gh', ['release', 'download', descriptor.tag, '--repo', repository, '--pattern', descriptor.assetName, '--dir', download]);
            const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(download, descriptor.assetName))).digest('hex');
            if (hash !== descriptor.sha256) throw new Error('Existing release asset differs; increment the plugin version');
        } else {
            if (!release.stderr.includes('HTTP 404')) throw new Error(release.stderr);
            const notes = path.join(temp, 'notes.md');
            const version = descriptor.plugin.versions[0];
            fs.writeFileSync(notes, `${version.changelog}\n\nJellyfin ${version.targetAbi}; first preview, not yet verified on a running user server.\n\nSHA256: ${descriptor.sha256}\n`);
            const shaFile = `${asset}.sha256`;
            fs.writeFileSync(shaFile, `${descriptor.sha256}  ${descriptor.assetName}\n`);
            const head = command('git', ['rev-parse', 'HEAD']).stdout.trim();
            command('gh', ['release', 'create', descriptor.tag, asset, shaFile, '--repo', repository,
                '--target', head, '--title', `${descriptor.plugin.name} ${version.version}`, '--notes-file', notes]);
        }
        catalog = updated;
        console.log(`Verified release: ${descriptor.tag}`);
    }
    fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
    command('git', ['config', 'user.name', 'github-actions[bot]']);
    command('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
    command('git', ['add', 'manifest.json']);
    const diff = command('git', ['diff', '--cached', '--quiet'], true);
    if (diff.status === 1) {
        command('git', ['commit', '-m', 'Update plugin catalog after verified releases']);
        command('git', ['push', 'origin', 'HEAD:main']);
    } else if (diff.status !== 0) throw new Error(diff.stderr);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    await publish();
}