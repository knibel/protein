# Gerichte zur Auswahl

Sobald Zutaten abgehakt sind, zeigt die App unter dem Auswahlkasten traditionelle Gerichte aus verschiedenen Küchen, die diese Kombination abbilden. Die Gerichte stehen in `js/gerichte.js` (`window.GERICHTE`).

## Zuordnung

- Ein Gericht erscheint, wenn es **alle** gewählten Zutaten enthält.
- Gibt es keins, zeigt die App die Gerichte mit den meisten gewählten Zutaten und sagt das dazu.
- Sortiert wird nach Aminosäure-Score, dann nach Proteinmenge.

## Bewertung

Jedes Gericht hat typische Mengen pro Portion für seine Kernzutaten. Aus diesen Mengen berechnet `Komplement.bewerteGericht()` das Aminosäureprofil: Die Aminosäuren pro g Protein jeder Zutat werden mit deren Proteinmenge gewichtet, dann wie bei Mischungen gegen das FAO-Referenzmuster gestellt (siehe [AMINOSAEUREN.md](AMINOSAEUREN.md)). Gewürze, Gemüse und Öl gehen nicht in die Bewertung ein (`weitere`).

Die Mengen sind Richtwerte aus unserer Einschätzung, keine Rezeptvorgaben und keine Quellenwerte. Sie beziehen sich auf den Zustand in `data.js` (z. B. Linsen trocken).

## Eintrag hinzufügen

```js
{ name: "Beispielgericht", herkunft: "Land oder Region",
  beschreibung: "Ein Satz, was es ist.",
  zutaten: [{ name: "Linsen (braun)", gramm: 60 }, { name: "Reis (Vollkorn)", gramm: 50 }],
  weitere: "Zwiebeln, Gewürze" },
```

Regeln:

- Nur vegetarisch (kein Fleisch, kein Fisch). Traditionelle Gerichte mit Fleisch nur in der vegetarischen Variante aufnehmen und das in `beschreibung` sagen.
- `zutaten[].name` muss exakt einer Zutat in `data.js` entsprechen, und diese Zutat braucht `aminos`. Der Test `node tests/komplement.test.js` prüft das.
- Wo die Liste nur Vollkorn führt (Reis, Brot, Nudeln), ist das Gericht mit Vollkorn gerechnet, auch wenn die Tradition Weißmehl oder weißen Reis kennt. Das steht ggf. in `beschreibung`.
- Herkunft nicht verklären: lieber Region nennen als „traditionell" ohne Beleg.
