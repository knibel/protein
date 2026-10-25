# Proteinquellen finden

Statische Web-App (HTML, CSS, JavaScript ohne Build-Schritt und ohne Abhängigkeiten), mit der sich eiweißreiche Zutaten finden und vergleichen lassen. Oberfläche und Daten sind auf Deutsch. Gedacht für den Betrieb auf GitHub Pages.

## Funktionen

- Suche nach Namen (umlautunabhängig: „kase" findet „Käse")
- Ausschließlich vegetarische und vegane Zutaten (bewusst ohne Fleisch und Fisch), daher kein Ernährungsfilter
- Filter nach Kategorie und Mindest-Proteingehalt
- Sortierung nach Protein pro 100 g, Proteinanteil an den Kalorien, Verfügbarkeit in deutschen Supermärkten, Erschwinglichkeit oder Name
- Pro Zutat grobe Einstufung von Preis (günstig/mittel/teuer) und Verfügbarkeit, ohne konkrete Eurobeträge
- Aminosäure-Ergänzung: bis zu drei Zutaten abhaken, die Liste zeigt dann nur noch Zutaten, die sich mit der Auswahl zu einem guten Aminosäureprofil ergänzen (samt Mengenverhältnis) (Details: [docs/AMINOSAEUREN.md](docs/AMINOSAEUREN.md))
- Gerichtvorschläge: zur abgehakten Auswahl erscheinen traditionelle vegetarische Gerichte aus verschiedenen Küchen mit berechnetem Aminosäure-Score (Details: [docs/GERICHTE.md](docs/GERICHTE.md))
- Portionsrechner: Protein in einer frei wählbaren Grammzahl
- Hell- und Dunkelmodus (folgt dem System)

## Lokal ausprobieren

Es genügt, `index.html` im Browser zu öffnen. Alternativ ein lokaler Server:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Veröffentlichen

Siehe [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) (GitHub Pages, Branch `main`, Ordner `/`).

## Projektstruktur

```
index.html        Seitengerüst
css/style.css     Gestaltung
js/data.js        Zutatendaten (window.ZUTATEN)
js/gerichte.js      Traditionelle Gerichte (window.GERICHTE)
js/komplement.js   Aminosäure-Score und Ergänzungslogik (auch in Node nutzbar)
js/app.js         Filter, Sortierung, Darstellung
tests/            Node-Test für die Ergänzungslogik
reports/, research_notes/  Recherche hinter den Aminosäuredaten
docs/             Architektur, Datenpflege, Deployment
CLAUDE.md         Hinweise für Claude Code
```

## Dokumentation

- [Architektur](docs/ARCHITEKTUR.md)
- [Aminosäure-Ergänzung](docs/AMINOSAEUREN.md)
- [Gerichte](docs/GERICHTE.md)
- [Daten pflegen](docs/DATEN.md)
- [Deployment](docs/DEPLOYMENT.md)

## Hinweis

Alle Werte sind gerundete Richtwerte und ersetzen keine Ernährungsberatung.
