# Aminosäure-Ergänzung

Wer in der Hauptliste eine Zutat abhakt (bis zu drei), sieht nur noch Zutaten, die zusammen mit der Auswahl ein besseres Aminosäureprofil ergeben. Jedes weitere Häkchen filtert weiter: Mit einer Zutat entstehen Zweier-, mit zwei Zutaten Dreier-Kombinationen und so fort. Ein Kasten oberhalb der Liste zeigt die beste Mischung der Auswahl. Erreicht die Auswahl bereits 100 %, sagt die App das und zeigt wieder alle Zutaten. „Auswahl zurücksetzen" hebt den Filter auf. Zutaten ohne Aminosäuredaten sind nicht wählbar und verschwinden, solange eine Auswahl besteht. Die Recherche dazu steht in `reports/Amino acid complementarity data.md`, die Einzelnotizen in `research_notes/Amino acid complementarity data/`.

## Methode

- **Referenzmuster:** FAO 2013 (Food and Nutrition Paper 92), Tabelle 5, „Kinder ab 3 Jahren, Jugendliche, Erwachsene", in mg pro g Protein: His 16, Ile 30, Leu 61, Lys 48, Met+Cys 23, Phe+Tyr 41, Thr 25, Trp 6,6, Val 40. Es steht in `js/komplement.js` (`REFERENZ`).
- **Score einer Zutat:** kleinstes Verhältnis aus Gehalt und Referenz über alle neun essenziellen Aminosäuren, auf 100 % gedeckelt. Die Aminosäure mit dem kleinsten Verhältnis ist die **begrenzende**.
- **Score einer Mischung:** Die Aminosäuren werden nach Proteinanteil gemittelt (`w·A + (1−w)·B`) und erst dann gegen die Referenz gestellt. Der Mittelwert der Einzelscores wäre falsch.
- **Mehrere Zutaten:** Zwei Zutaten werden wie unten beschrieben exakt gelöst. Ab drei Zutaten sucht ein Raster in 5-%-Schritten (jede Zutat mindestens 10 % des Proteins) die beste Verteilung. Bei gleichem Score gewinnt zuerst der kleinste Anteil der zuletzt hinzugefügten Zutat, danach die ausgewogenste Verteilung der übrigen. Das sind Festlegungen, keine Quellenwerte.
- **Optimale Mischung (zwei Zutaten):** Der Score ist das Minimum von neun Geraden in `w` und damit konkav und stückweise linear. Kandidaten sind die Ränder, die Schnittpunkte je zweier Geraden und die Punkte, an denen eine Gerade 100 % erreicht. Liegt der gedeckelte Maximalwert auf einer Spanne, gilt das größte `w`, also so wenig Partnerzutat wie nötig. Die Formel ist eine eigene Herleitung, kein zitierter Wert.
- **Realistische Spanne:** Jede Zutat trägt 10–90 % des Proteins bei. Hinzugefügte Zutaten mit weniger als 10 g oder mehr als 400 g pro 100 g der ersten gewählten Zutat werden verworfen.
- **Partner:** mindestens 5 g Protein pro 100 g, Aminosäuredaten vorhanden.
- **Einstufung:** Gewinn gegenüber der besten Mischung der bisherigen Auswahl. „ergänzt sehr gut" bei Gewinn ≥ 15 Punkten und Endwert ≥ 90 %, „ergänzt gut" bei Gewinn ≥ 8 und Endwert ≥ 80 %. Schwellen sind unsere Festlegung.
- **Reihenfolge:** Einstufung, Endwert (Unterschiede unter 5 Punkten gelten als gleich), plausible Mengen, Verfügbarkeit, Preis.

Wichtig: Der Score ist ein **chemischer** Score ohne Verdaulichkeitskorrektur. Die App nennt ihn deshalb nicht PDCAAS oder DIAAS. Pflanzliche Proteine sind etwas schlechter verdaulich, die tatsächliche Wirkung ist also eher geringer.

## Daten

`aminos` in `js/data.js` (Reihenfolge His, Ile, Leu, Lys, Met+Cys, Phe+Tyr, Thr, Trp, Val), mg pro g Protein auf N×6,25-Basis. Quelle ist die USDA FoodData Central SR Legacy (April 2018), selbst umgerechnet. Bei Soja, Nüssen und Samen wurde von USDAs eigenem Stickstofffaktor (z. B. 5,3 bei den meisten Samen, 5,18 bei Mandeln, 5,46 bei Erdnüssen, 5,71 bei Sojabohnen) auf 6,25 umgerechnet. Der Faktor für Sojabohnen fehlt in der USDA-Faktordatei und stammt aus dem Gedächtnis.

Ohne Aminosäuredaten (nehmen nicht teil): Seitan, Sojamilch, Rosenkohl (Tyrosin fehlt), Champignons (inkonsistente Datenlage).

Ersatzwerte (`aminosHinweis` zeigt sie in der App an): Magerquark und Harzer Käse = Hüttenkäse; Skyr und Griechischer Joghurt = Milch (der USDA-Joghurteintrag gilt als unzuverlässig); Räuchertofu = Tofu; Edamame = reife Sojabohnen; Sojageschnetzeltes = entfettetes Sojamehl; Erbsenproteinpulver = getrocknete Erbsen; Molkenproteinpulver = getrocknete Süßmolke; Nährhefe = Bäckerhefe; Weiße Bohnen = Kidneybohnen; Dinkelmehl = Dinkelkorn; Vollkornbrot = Vollkornweizenbrot.

## Was belegt ist und was nicht

- Belegt: Getreide sind Lysin-limitiert, Hülsenfrüchte durch Methionin + Cystein. Nüsse und Samen sind meist Lysin-limitiert.
- Der einzige veröffentlichte Mischungsoptimum, den wir prüfen konnten: Erbse + Reis, 59 % : 41 % Protein, Score 84 (Herreman et al. 2020, Muster für 0,5–3 Jahre, mit Verdaulichkeit). Mit unseren Rohdaten und dem Erwachsenenmuster ergibt sich etwa 100 % bei ungefähr 50 : 50. Das ist eine andere Datenbasis, kein Rechenfehler; `tests/komplement.test.js` prüft stattdessen, dass das berechnete Optimum tatsächlich maximal ist.
- Für Reis + Bohnen, Hummus, Erdnuss + Weizen, Mais + Bohnen und Soja + Reis gibt es keinen belegten kombinierten Score. Alle Paarungen sind **berechnet**.
- Es gibt keine belegte Pflicht, ergänzende Proteine in derselben Mahlzeit zu essen; die App sagt, dass die Kombination über den Tag genügt.

## Vor dem Verlassen auf einzelne Werte prüfen

- Alle Werte stammen aus nur einer Quelle (USDA); Zweitquellen konnten nicht geöffnet werden.
- Verdaulichkeitswerte fehlen komplett.
- Die Einstufungsschwellen und der Bereich 10–90 % sind Vorschläge und an der Ausgabe zu justieren.
- Mengenangaben beziehen sich auf den Zustand der Liste (trocken, roh, gekocht). Wer trockene Linsen mit gekochtem Reis mischt, muss umrechnen.
- Weitere offene Punkte stehen in Abschnitt 7 des Berichts.

## Prüfen

`node tests/komplement.test.js`
