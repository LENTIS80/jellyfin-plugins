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
| [Manga](https://github.com/LENTIS80/jellyfin-plugins/releases/tag/manga-v0.7.0.0) | 0.7.0.0 | 10.11.6 | CBZ metadata, AniList, detail série a čtení po stránkách s uloženou pozicí |

Ve verzi 0.2.1.0 stačí v nastavení Manga zaškrtnout existující knihovnu typu Knihy. Cesty se přebírají automaticky z Jellyfinu, včetně více složek a pozdějších změn. Starší ručně zadané cesty zůstávají zachované v pokročilém nastavení; po výběru knihovny je lze vymazat. Bez výběru knihovny i bez ručních cest se soubory nezpracovávají. Po aktualizaci restartujte Jellyfin a obnovte stránku nastavení.

Verze 0.2.1.0 opravuje chybu `toLowerCase is not a function` při načítání knihoven. Po aktualizaci a restartu obnovte nastavení pomocí Ctrl+F5.

Ověřeno 50 testy pluginu a sedmi testy formuláře, výběru rozčteného svazku a skutečného webu na odděleném Jellyfinu 10.11.6. Živé testy zahrnují původní i novou čtečku, pokračování v novém okně, požadavky jen na aktuální a blízké stránky a zachování záložky při chybě. Samostatně ověřeno odmítnutí nepřihlášeného uživatele a uživatele bez přístupu do knihovny i zobrazení na mobilní šířce. Uživatelský server se aktualizuje přes katalog.

Pro knihovnu typu Knihy povolte Manga CBZ, Manga AniList a Manga CBZ cover. Ručně upravená metadata zamkněte v editoru Jellyfinu. Podrobný návod je v README uvnitř instalačního ZIPu.

## Nativní vzhled ve verzi 0.7.0.0

Průběh čtení je tenká čára na spodní hraně obálky, se stejnými styly a barvou motivu jako filmové karty Jellyfinu. Zobrazuje se na detailu svazku, v sérii i na kartách domovské obrazovky. Přesná stránka a procenta jsou dostupné po najetí na čáru a čtečkám obrazovky. Samostatný blok pod detailem a velká modrá tlačítka byly odstraněny.

Čtení spouští nativní **▶**; na sérii otevře poslední rozčtený nebo první nepřečtený svazek. Původní čtečka je dostupná malou ikonou knihy ve stejné řadě ovládání. Ověřeno na desktopu i mobilní šířce v Jellyfinu 10.11.6, včetně zarovnání čáry a pokračování ve čtení. Po aktualizaci restartujte server a obnovte web pomocí Ctrl+F5.

## Čtení po stránkách ve verzi 0.6.0.0

Nová čtečka posílá ze serveru jednotlivé obrázky z CBZ. První stránka se otevře bez stahování a rozbalování celého archivu v prohlížeči. Po jejím zobrazení se připraví dvě následující stránky; mezipaměť drží nejvýše čtyři obrázky. Při skoku se nepotřebné přenosy zruší. Server CBZ nerozbaluje na disk.

Použijte běžné tlačítko **▶** na detailu svazku nebo série; naváže na uloženou stránku. Ovládání nabízí šipky, číslo stránky, gesta, směr zprava doleva a přizpůsobení šířce. Pozice se ukládá až po úspěšném zobrazení stránky. Při chybě lze načtení zopakovat. **Původní čtečka** je nadále dostupná jako alternativa a stahuje celý soubor.

Aktualizujte plugin, **restartujte Jellyfin a načtěte web přes Ctrl+F5**. U svazků, které ještě nemají průběh čtení z verze 0.5, jednou obnovte metadata. Platí pro web poskytovaný serverem Jellyfinu; nativní aplikace mají vlastní čtečky. Každý požadavek vyžaduje přihlášení a oprávnění k danému svazku. Podrobný návod a omezení jsou v README instalačního ZIPu.

## Průběh čtení ve verzi 0.5.0.0

Na kartách svazků a jejich detailu se zobrazuje aktuální stránka, počet stran a procenta. Na detailu série přibylo tlačítko **Pokračovat ve čtení**, které otevře poslední rozčtený svazek na uložené stránce. Pokud není žádný rozčtený, nabídne první nepřečtený svazek. Pozice a čas čtení se ukládají na serveru zvlášť pro každého uživatele.

Po aktualizaci **restartujte Jellyfin**, jednou spusťte **úplnou obnovu metadat knihovny** pro načtení počtu stran a obnovte web pomocí **Ctrl+F5**. Pokud máte vlastní výběr poskytovatelů, povolte **Manga reading progress**. Pro tlačítko pokračování ponechte zapnutý detail série. Stav Přečteno vychází z označení přečtení v Jellyfinu.

Nové ovládání funguje ve **webu poskytovaném serverem Jellyfinu**. Plugin přidává skript do odpovědi stránky bez úprav instalovaných souborů. Samostatně hostovaný web a nativní mobilní/TV aplikace používají vlastní rozhraní.

## Detail série ve verzi 0.4.0.0

V nastavení Manga zapněte **Seskupovat svazky podle složek sérií** a **Zobrazovat detail série s popisem a svazky**, uložte a spusťte **skenování knihovny**. Kliknutí na sérii otevře nativní detail kolekce s velkou obálkou, popisem, autory a pod nimi kartami svazků. Sekce se v Jellyfinu jmenuje **Knihy**.

```text
/media/Manga/Tongari Boushi no Atelier/
  Witch Hat Atelier v02.cbz
```

Tato série obsahuje jen Vol. 2. Další svazky přidejte jako CBZ do stejné složky a znovu skenujte. Karty se řadí číselně (1, 2, 10); označení Vol. je na začátku názvu, aby se neztratilo zkrácením na malé kartě. Svazky mají vlastní obálky; od verze 0.6 lze zvolit čtení po stránkách i původní čtečku.

Zapnutý AniList doplní metadata série pomocí **Manga series AniList** a **Manga series AniList cover**. V běžné knihovně Knihy se použijí výchozí poskytovatelé kolekcí; pokud jste je ručně omezili, povolte tyto dva. Lokální obálku může doplnit **Manga series cover**.

Série se hledá podle názvu složky. Pro ruční přiřazení otevřete na detailu **Identifikovat → AniList Manga ID**, například `98263`. Pravidla v nastavení pro detail používají název složky (`Tongari Boushi no Atelier = 98263`), pro svazky název z ComicInfo nebo souboru (`Witch Hat Atelier = 98263`).

Převod existující složky na kolekci může znovu vytvořit záznamy svazků, proto si nejprve uložte důležitá ruční metadata. Jellyfin pro fyzické kolekce může vedle CBZ uložit `collection.xml` a `folder.jpg`, i s vypnutým obecným ukládáním lokálních metadat. Samotné CBZ se nemění ani nepřesouvají. Běžné procházení složek z verze 0.3 je nadále dostupné při vypnutém detailu; kolekce používá standardní oprávnění a názvy sekcí Jellyfinu.

## Vydávání

Balíčky jsou ke stažení v [Releases](https://github.com/LENTIS80/jellyfin-plugins/releases). Workflow ověřuje MD5 a SHA-256 připraveného balíčku, publikuje ZIP a teprve poté doplní `manifest.json`. Zachovává ostatní pluginy i jejich starší verze. Již vydané verze jsou neměnné.

Adresář `.packages` obsahuje balíčky v Base64 a popisy vydání pro automatické publikování. Není to zdrojový kód pluginu. Jellyfin stahuje běžný ZIP z Releases.
