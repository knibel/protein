# CLAUDE.md

Statische Web-App „Proteinquellen finden" für GitHub Pages. HTML + CSS + Vanilla-JS, **kein Build, keine Abhängigkeiten, kein npm**.

## Regeln

- **Kein Fleisch und kein Fisch/Meeresfrüchte in den Daten** – bewusste Vorgabe des Besitzers. Alle Zutaten sind vegetarisch (inkl. vegan); es gibt bewusst **keinen Ernährungsform-Filter**. Es gibt dafür auch kein Datenfeld und kein Badge. Nicht wieder hinzufügen, auch nicht auf Anfrage nach „Vollständigkeit".
- **Sprache:** Alles Nutzersichtbare (UI-Texte, Daten, Doku) ist auf Deutsch. Code-Bezeichner dürfen deutsch sein und sind es im Bestand (`zutaten`, `rendere`, `filtere`) – diesem Stil folgen. Deutsche Umlaute und „ß" korrekt schreiben.
- **Keine Build-Tools, Frameworks oder CDN-Skripte** einführen. Die Dateien werden unverändert ausgeliefert.
- **Nur relative Pfade** (`css/style.css`, nie `/css/style.css`), weil Pages unter `/<repo>/` läuft.
- **Muss über `file://` laufen:** Daten bleiben in `js/data.js` (`window.ZUTATEN`), kein `fetch` auf lokale JSON-Dateien, keine ES-Module.
- **Kein `innerHTML` mit Daten**; DOM per `createElement` / `textContent` aufbauen.
- Dunkelmodus und Mobilansicht müssen weiter funktionieren (Farben nur über CSS-Variablen in `:root`).
- Keine erfundenen Nährwerte: neue Daten nur mit plausiblen Richtwerten pro 100 g aus BLS/USDA; Regeln in `docs/DATEN.md`.

## Struktur

- `index.html` – Gerüst und Filterelemente
- `js/data.js` – Daten (`window.ZUTATEN`)
- `js/komplement.js` – Aminosäure-Logik ohne DOM (Browser und Node, kein ES-Modul)
- `js/app.js` – Filter, Sortierung, Rendering
- `tests/komplement.test.js` – Node-Test, kein Framework
- `css/style.css` – Gestaltung
- `docs/` – `ARCHITEKTUR.md`, `AMINOSAEUREN.md`, `DATEN.md`, `DEPLOYMENT.md`

## Prüfen

Es gibt kein Test-Framework, nur ein Node-Skript. Nach Änderungen:

1. Ergänzungslogik: `node tests/komplement.test.js`
2. Datensyntax: `node -e "global.window={};require('./js/data.js');console.log(window.ZUTATEN.length)"`
3. `python3 -m http.server 8000` und im Browser prüfen: Suche (auch mit Umlauten), alle Filter, Sortierungen, Portionsrechner, keine `NaN`-Werte, keine Konsolenfehler.

## Aminosäuredaten

- `aminos` immer in mg pro g Protein, N×6,25-Basis, aus nachvollziehbarer Quelle; nichts schätzen. Ersatzwerte mit `aminosHinweis` kennzeichnen. Details und offene Punkte: `docs/AMINOSAEUREN.md`.
- Score heißt „Aminosäure-Score", nicht PDCAAS/DIAAS (keine Verdaulichkeitskorrektur). Paarungen sind „berechnet", nicht „belegt".

## Dokumentation aktuell halten

Ändern sich Datenfelder, Filter oder Dateistruktur, `README.md` und die passende Datei in `docs/` im selben Commit anpassen.
