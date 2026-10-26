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
| [Manga](https://github.com/LENTIS80/jellyfin-plugins/releases/tag/manga-v0.4.0.0) | 0.4.0.0 | 10.11.6 | CBZ metadata, obálky, AniList a ruční přiřazování sérií |

Ve verzi 0.2.1.0 stačí v nastavení Manga zaškrtnout existující knihovnu typu Knihy. Cesty se přebírají automaticky z Jellyfinu, včetně více složek a pozdějších změn. Starší ručně zadané cesty zůstávají zachované v pokročilém nastavení; po výběru knihovny je lze vymazat. Bez výběru knihovny i bez ručních cest se soubory nezpracovávají. Po aktualizaci restartujte Jellyfin a obnovte stránku nastavení.

Verze 0.2.1.0 opravuje chybu `toLowerCase is not a function` při načítání knihoven. Po aktualizaci a restartu obnovte nastavení pomocí Ctrl+F5.

Ověřeno 44 automatickými testy pluginu, dvěma testy formuláře a testem skutečného webového rozhraní na odděleném Jellyfinu 10.11.6: otevření série, pořadí svazků a CBZ čtečka. Ověřen byl i sken série s jediným Vol. 2 a následné přidání dalších svazků. Uživatelský server se aktualizuje přes katalog. Čtení zajišťuje vestavěná čtečka Jellyfinu.

Pro knihovnu typu Knihy povolte Manga CBZ, Manga AniList a Manga CBZ cover. Ručně upravená metadata zamkněte v editoru Jellyfinu. Podrobný návod je v README uvnitř instalačního ZIPu.

## Detail série ve verzi 0.4.0.0

V nastavení Manga zapněte **Seskupovat svazky podle složek sérií** a **Zobrazovat detail série s popisem a svazky**, uložte a spusťte **skenování knihovny**. Kliknutí na sérii otevře nativní detail kolekce s velkou obálkou, popisem, autory a pod nimi kartami svazků. Sekce se v Jellyfinu jmenuje **Knihy**.

```text
/media/Manga/Tongari Boushi no Atelier/
  Witch Hat Atelier v02.cbz
```

Tato série obsahuje jen Vol. 2. Další svazky přidejte jako CBZ do stejné složky a znovu skenujte. Karty se řadí číselně (1, 2, 10); označení Vol. je na začátku názvu, aby se neztratilo zkrácením na malé kartě. Svazky mají vlastní obálky a dál se otevírají ve vestavěné čtečce.

Zapnutý AniList doplní metadata série pomocí **Manga series AniList** a **Manga series AniList cover**. V běžné knihovně Knihy se použijí výchozí poskytovatelé kolekcí; pokud jste je ručně omezili, povolte tyto dva. Lokální obálku může doplnit **Manga series cover**.

Série se hledá podle názvu složky. Pro ruční přiřazení otevřete na detailu **Identifikovat → AniList Manga ID**, například `98263`. Pravidla v nastavení pro detail používají název složky (`Tongari Boushi no Atelier = 98263`), pro svazky název z ComicInfo nebo souboru (`Witch Hat Atelier = 98263`).

Převod existující složky na kolekci může znovu vytvořit záznamy svazků, proto si nejprve uložte důležitá ruční metadata. Jellyfin pro fyzické kolekce může vedle CBZ uložit `collection.xml` a `folder.jpg`, i s vypnutým obecným ukládáním lokálních metadat. Samotné CBZ se nemění ani nepřesouvají. Běžné procházení složek z verze 0.3 je nadále dostupné při vypnutém detailu; kolekce používá standardní oprávnění a názvy sekcí Jellyfinu.

## Vydávání

Balíčky jsou ke stažení v [Releases](https://github.com/LENTIS80/jellyfin-plugins/releases). Workflow ověřuje MD5 a SHA-256 připraveného balíčku, publikuje ZIP a teprve poté doplní `manifest.json`. Zachovává ostatní pluginy i jejich starší verze. Již vydané verze jsou neměnné.

Adresář `.packages` obsahuje balíčky v Base64 a popisy vydání pro automatické publikování. Není to zdrojový kód pluginu. Jellyfin stahuje běžný ZIP z Releases.
