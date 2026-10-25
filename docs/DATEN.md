# Daten pflegen

Die Zutaten stehen in `js/data.js` im Array `window.ZUTATEN`.

## Felder

| Feld | Typ | Bedeutung |
|---|---|---|
| `name` | String | Deutscher Name, ggf. mit Klammerzusatz (`"Thunfisch (Dose, im eigenen Saft)"`) |
| `kategorie` | String | Gruppierung; neue Kategorien erscheinen automatisch im Filter |
| `protein` | Zahl | Gramm Protein pro 100 g |
| `kcal` | Zahl | Kilokalorien pro 100 g (muss > 0 sein, wird geteilt) |
| `preis` | 1–3 | Erschwinglichkeit pro Portion im Vergleich: `1` günstig, `2` mittel, `3` teuer. Bewusst keine Eurobeträge |
| `verfuegbarkeit` | 1–3 | Verfügbarkeit in deutschen Supermärkten: `1` überall (auch Discounter), `2` gut (größere Supermärkte, Drogerie, Bio-Supermarkt), `3` eingeschränkt (Reformhaus, Fachhandel, online) |
| `aminos` | Array aus 9 Zahlen | Essenzielle Aminosäuren in mg pro g Protein: His, Ile, Leu, Lys, Met+Cys, Phe+Tyr, Thr, Trp, Val (N×6,25-Basis). Optional; ohne Feld nimmt die Zutat nicht an der Ergänzung teil. Herkunft: [AMINOSAEUREN.md](AMINOSAEUREN.md) |
| `aminosHinweis` | String | Optional, nennt Ersatzwerte oder Unsicherheit; wird in der App angezeigt |
| `zustand` | String | z. B. `roh`, `gekocht`, `trocken`, `Konserve`, `Pulver`; darf leer sein |

## Regeln

- **Kein Fleisch und kein Fisch (auch keine Meeresfrüchte).** Das ist eine bewusste Entscheidung; die Liste ist rein vegetarisch/vegan.
- Alle Werte beziehen sich auf **100 g** im angegebenen `zustand`. Trockene Hülsenfrüchte haben deutlich mehr Protein als gekochte – im Zweifel beide Einträge anlegen und den Zustand angeben.
- Dezimaltrennzeichen im Code ist der Punkt (`3.4`), die Anzeige formatiert deutsch.
- Werte sind gerundet. Quellen für Richtwerte: Bundeslebensmittelschlüssel (BLS), USDA FoodData Central, Herstellerangaben bei Produkten.
- Eier und Milchprodukte sind erlaubt (vegetarisch); Details wie Lab oder Gelatine werden nicht berücksichtigt.
- Keine Duplikate: vor dem Hinzufügen nach dem Namen suchen.

## Preis und Verfügbarkeit

Beides sind grobe Einschätzungen für Deutschland, keine Messwerte. Preis bezieht sich auf die Kosten pro Portion bzw. pro Gramm Protein im Vergleich zu den anderen Zutaten, nicht auf den Packungspreis. Beim Sortieren entscheidet bei Gleichstand der Proteingehalt. Einschätzungen bei Bedarf anpassen, wenn sich der Markt ändert.

## Neuen Eintrag hinzufügen

```js
{ name: "Beispiel", kategorie: "Hülsenfrüchte", protein: 20, kcal: 340, preis: 1, verfuegbarkeit: 1, zustand: "trocken" },
```

Danach `index.html` im Browser neu laden und prüfen, dass der Eintrag erscheint und die Zeile nicht `NaN` zeigt.
