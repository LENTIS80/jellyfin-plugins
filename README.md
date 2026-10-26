# LENTIS80 Jellyfin Plugins

Veřejný katalog pluginů pro Jellyfin. Jeden katalog může obsahovat více pluginů a jejich verzí. Zdrojový kód pluginů zde není publikován.

## Přidání do Jellyfinu

**Dashboard → Pluginy → Spravovat repozitáře → Nový repozitář**

- Název: `LENTIS80 Plugins`
- URL: `https://raw.githubusercontent.com/LENTIS80/jellyfin-plugins/main/manifest.json`

Po přidání přepněte filtr pluginů z „Nainstalováno“ na „Dostupné“ nebo „Vše“. V kategorii „Knihy“ vyberte Manga, nainstalujte kompatibilní verzi a restartujte Jellyfin.

## Pluginy

| Plugin | Verze | Jellyfin | Popis |
| --- | --- | --- | --- |
| [Manga](https://github.com/LENTIS80/jellyfin-plugins/releases/tag/manga-v0.2.0.0) | 0.2.0.0 | 10.11.6 | CBZ metadata, obálky, AniList a ruční přiřazování sérií |

Ve verzi 0.2.0.0 stačí v nastavení Manga zaškrtnout existující knihovnu typu Knihy. Cesty se přebírají automaticky z Jellyfinu, včetně více složek a pozdějších změn. Starší ručně zadané cesty zůstávají zachované v pokročilém nastavení; po výběru knihovny je lze vymazat. Bez výběru knihovny i bez ručních cest se soubory nezpracovávají. Po aktualizaci restartujte Jellyfin a obnovte stránku nastavení.

Ověřeno 32 automatickými testy pluginu a testem formuláře v prohlížeči s testovacími odpověďmi API. Nová verze zatím nebyla ověřena na běžícím uživatelově serveru. Čtení zajišťuje vestavěná čtečka Jellyfinu.

Pro knihovnu typu Knihy povolte Manga CBZ, Manga AniList a Manga CBZ cover. Ručně upravená metadata zamkněte v editoru Jellyfinu. Podrobný návod je v README uvnitř instalačního ZIPu.

## Vydávání

Balíčky jsou ke stažení v [Releases](https://github.com/LENTIS80/jellyfin-plugins/releases). Workflow ověřuje MD5 a SHA-256 připraveného balíčku, publikuje ZIP a teprve poté doplní `manifest.json`. Zachovává ostatní pluginy i jejich starší verze. Již vydané verze jsou neměnné.

Adresář `.packages` obsahuje balíčky v Base64 a popisy vydání pro automatické publikování. Není to zdrojový kód pluginu. Jellyfin stahuje běžný ZIP z Releases.
