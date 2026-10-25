# Architektur

## Leitgedanken

- **Kein Build, keine Abhängigkeiten.** Die Dateien werden genau so ausgeliefert, wie sie im Repository liegen.
- **Funktioniert über `file://`.** Daten liegen deshalb in einer JS-Datei (`window.ZUTATEN`) statt in einer JSON-Datei, die per `fetch` geladen werden müsste.
- **Alle relativen Pfade.** GitHub Pages liefert Projekt-Seiten unter `/<repo>/` aus; absolute Pfade wie `/css/style.css` würden brechen.
- **Kein `innerHTML` mit Daten.** Inhalte werden per `textContent` gesetzt.

## Komponenten

| Datei | Aufgabe |
|---|---|
| `index.html` | Formularelemente für die Filter, leere Liste `#liste`, lädt die Skripte |
| `js/data.js` | Setzt `window.ZUTATEN` (Array von Objekten) |
| `js/gerichte.js` | Setzt `window.GERICHTE`: Gerichte mit Kernzutaten und Mengen (siehe [GERICHTE.md](GERICHTE.md)) |
| `js/komplement.js` | Reine Rechenlogik für Aminosäure-Scores und Ergänzungen, ohne DOM; gleiche Datei im Browser (`window.Komplement`) und in Node (`module.exports`) |
| `js/app.js` | Liest die Filter, filtert und sortiert, erzeugt die Listeneinträge neu |
| `css/style.css` | Layout, Farben über CSS-Variablen, Dunkelmodus per `prefers-color-scheme` |

## Ablauf

1. `data.js` stellt die Daten bereit.
2. `app.js` füllt das Kategorie-Dropdown aus den vorhandenen Kategorien.
3. Jede Änderung an einem Filterelement oder einem Auswahl-Häkchen ruft `rendere()` auf: `bestimme()` filtert, ruft bei bestehender Auswahl `Komplement.ergaenzungen()` auf und sortiert; danach wird das DOM neu aufgebaut. Der Auswahlzustand (`auswahl`, max. 3 Zutaten) liegt nur im Speicher.

## Berechnete Größen

- **Proteinanteil an den Kalorien** = `protein × 4 / kcal × 100` (4 kcal pro g Protein).
- **Portion** = `protein × Gramm / 100`.
- Die Balkenbreite ist relativ zum höchsten Proteinwert im Datensatz.

## Erweiterungsideen

- Filter und Sortierung in der URL (`location.hash`) speichern, damit sich Ergebnisse teilen lassen
- Weitere Nährwerte (Fett, Kohlenhydrate, Ballaststoffe)
- Einkaufsliste / Tagesbilanz mit `localStorage`
