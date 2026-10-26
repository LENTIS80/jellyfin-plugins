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
| [Manga](https://github.com/LENTIS80/jellyfin-plugins/releases/tag/manga-v0.3.0.0) | 0.3.0.0 | 10.11.6 | CBZ metadata, obálky, AniList a ruční přiřazování sérií |

Ve verzi 0.2.1.0 stačí v nastavení Manga zaškrtnout existující knihovnu typu Knihy. Cesty se přebírají automaticky z Jellyfinu, včetně více složek a pozdějších změn. Starší ručně zadané cesty zůstávají zachované v pokročilém nastavení; po výběru knihovny je lze vymazat. Bez výběru knihovny i bez ručních cest se soubory nezpracovávají. Po aktualizaci restartujte Jellyfin a obnovte stránku nastavení.

Verze 0.2.1.0 opravuje chybu `toLowerCase is not a function` při načítání knihoven. Po aktualizaci a restartu obnovte nastavení pomocí Ctrl+F5.

Ověřeno 38 automatickými testy pluginu a dvěma testy formuláře v Chromiu se stejným polyfillem webcomponents.js 0.7.24 jako v Jellyfin Web 10.11.6 a s testovacími odpověďmi API. Nová verze zatím nebyla ověřena na běžícím uživatelově serveru. Čtení zajišťuje vestavěná čtečka Jellyfinu.

Pro knihovnu typu Knihy povolte Manga CBZ, Manga AniList a Manga CBZ cover. Ručně upravená metadata zamkněte v editoru Jellyfinu. Podrobný návod je v README uvnitř instalačního ZIPu.

## Série a svazky ve verzi 0.3.0.0

V nastavení pluginu zapněte **Seskupovat svazky podle složek sérií**, uložte a spusťte **skenování knihovny**. Jedna podsložka představuje sérii a každý CBZ jeden svazek. Například:

```text
/media/Manga/Tongari Boushi no Atelier/
  Witch Hat Atelier v02.cbz
```

Série zůstane složkou i s jediným svazkem. Po jejím otevření vyberete Vol. 2; další svazky se objeví, až přidáte jejich CBZ do stejné složky a knihovnu znovu naskenujete. Souborům plugin doplní rozlišující označení Vol., pokud mají jen název série, a seřadí je číselně. Vlastní názvy kapitol zachovává.

Pro obálku série povolte **Manga series cover**. Použije obálku nejnižšího dostupného svazku podle čísla v názvu souboru. Jde o běžné procházení složek Jellyfinu, bez nové seriálové obrazovky nebo online metadat na složce.

Seskupení je při aktualizaci vypnuté. Při prvním skenu po zapnutí může Jellyfin znovu vytvořit záznam původní sloučené knihy. Důležité ruční údaje si nejprve uložte a případně potom znovu použijte Identifikovat. CBZ soubory se nepřesouvají ani nemění. Pro budoucí přiřazování lze použít pravidla série v nastavení pluginu.

## Vydávání

Balíčky jsou ke stažení v [Releases](https://github.com/LENTIS80/jellyfin-plugins/releases). Workflow ověřuje MD5 a SHA-256 připraveného balíčku, publikuje ZIP a teprve poté doplní `manifest.json`. Zachovává ostatní pluginy i jejich starší verze. Již vydané verze jsou neměnné.

Adresář `.packages` obsahuje balíčky v Base64 a popisy vydání pro automatické publikování. Není to zdrojový kód pluginu. Jellyfin stahuje běžný ZIP z Releases.
