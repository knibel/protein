/*
 * Zutatendaten. Alle Werte pro 100 g essbarem Anteil, gerundete Richtwerte
 * (angelehnt an gängige Nährwerttabellen, z. B. BLS / USDA). Siehe docs/DATEN.md.
 *
 * Felder: name, kategorie, protein (g), kcal, preis, verfuegbarkeit, zustand
 * preis (Erschwinglichkeit, keine Eurobeträge): 1 = günstig, 2 = mittel, 3 = teuer
 * verfuegbarkeit (in deutschen Supermärkten): 1 = überall (auch Discounter),
 *   2 = gut (größere Supermärkte, Drogerie, Bio-Supermarkt), 3 = eingeschränkt (Reformhaus, Fachhandel, online)
 *
 * aminos: essenzielle Aminosäuren in mg pro g Protein, Reihenfolge
 *   [His, Ile, Leu, Lys, Met+Cys, Phe+Tyr, Thr, Trp, Val]. Fehlt das Feld, gibt es keine verlässlichen Daten
 *   (Seitan, Sojamilch, Rosenkohl, Champignons); die Zutat nimmt dann nicht an der Ergänzungsfunktion teil.
 * aminosHinweis: optional, nennt Ersatzwerte (Proxy) oder unsichere Daten.
 * Alle Werte auf N×6,25-Basis; bei Soja, Nüssen und Samen von USDAs eigenem Stickstofffaktor umgerechnet.
 * Quelle: USDA FoodData Central SR Legacy, selbst auf mg/g Protein umgerechnet; siehe docs/AMINOSAEUREN.md.
 */
window.ZUTATEN = [
  // Milchprodukte & Eier
  { name: "Magerquark", kategorie: "Milchprodukte & Eier", protein: 12, kcal: 67, preis: 1, verfuegbarkeit: 1, aminos: [34, 60, 105, 83, 40, 109, 45, 11, 63], aminosHinweis: "Ersatzwert: Hüttenkäse", zustand: "" },
  { name: "Skyr", kategorie: "Milchprodukte & Eier", protein: 11, kcal: 63, preis: 2, verfuegbarkeit: 1, aminos: [31, 53, 97, 86, 33, 104, 43, 13, 67], aminosHinweis: "Ersatzwert: Milch", zustand: "" },
  { name: "Körniger Frischkäse", kategorie: "Milchprodukte & Eier", protein: 12, kcal: 95, preis: 2, verfuegbarkeit: 1, aminos: [34, 60, 105, 83, 40, 109, 45, 11, 63], zustand: "" },
  { name: "Griechischer Joghurt (10 % Fett)", kategorie: "Milchprodukte & Eier", protein: 6, kcal: 130, preis: 2, verfuegbarkeit: 1, aminos: [31, 53, 97, 86, 33, 104, 43, 13, 67], aminosHinweis: "Ersatzwert: Milch", zustand: "" },
  { name: "Parmesan", kategorie: "Milchprodukte & Eier", protein: 36, kcal: 400, preis: 3, verfuegbarkeit: 1, aminos: [40, 54, 99, 94, 34, 112, 38, 14, 70], zustand: "" },
  { name: "Harzer Käse", kategorie: "Milchprodukte & Eier", protein: 30, kcal: 130, preis: 1, verfuegbarkeit: 2, aminos: [34, 60, 105, 83, 40, 109, 45, 11, 63], aminosHinweis: "Ersatzwert: Hüttenkäse", zustand: "" },
  { name: "Gouda", kategorie: "Milchprodukte & Eier", protein: 25, kcal: 355, preis: 2, verfuegbarkeit: 1, aminos: [42, 53, 105, 109, 40, 118, 38, 14, 74], zustand: "" },
  { name: "Mozzarella", kategorie: "Milchprodukte & Eier", protein: 18, kcal: 240, preis: 1, verfuegbarkeit: 1, aminos: [38, 49, 100, 104, 35, 112, 39, 14, 64], zustand: "" },
  { name: "Hühnerei", kategorie: "Milchprodukte & Eier", protein: 13, kcal: 145, preis: 1, verfuegbarkeit: 1, aminos: [25, 53, 86, 73, 52, 94, 44, 13, 68], zustand: "ganz" },
  { name: "Milch (1,5 %)", kategorie: "Milchprodukte & Eier", protein: 3.4, kcal: 47, preis: 1, verfuegbarkeit: 1, aminos: [31, 53, 97, 86, 33, 104, 43, 13, 67], zustand: "" },

  // Hülsenfrüchte
  { name: "Sojabohnen", kategorie: "Hülsenfrüchte", protein: 36, kcal: 410, preis: 2, verfuegbarkeit: 3, aminos: [27, 49, 83, 68, 30, 91, 44, 15, 51], zustand: "trocken" },
  { name: "Linsen (rot)", kategorie: "Hülsenfrüchte", protein: 25, kcal: 340, preis: 1, verfuegbarkeit: 1, aminos: [29, 45, 76, 73, 23, 79, 37, 9, 52], zustand: "trocken" },
  { name: "Linsen (braun)", kategorie: "Hülsenfrüchte", protein: 24, kcal: 330, preis: 1, verfuegbarkeit: 1, aminos: [28, 43, 73, 70, 22, 76, 36, 9, 50], zustand: "trocken" },
  { name: "Kichererbsen", kategorie: "Hülsenfrüchte", protein: 20, kcal: 350, preis: 1, verfuegbarkeit: 1, aminos: [28, 43, 72, 67, 27, 79, 37, 10, 42], zustand: "trocken" },
  { name: "Weiße Bohnen", kategorie: "Hülsenfrüchte", protein: 21, kcal: 300, preis: 1, verfuegbarkeit: 1, aminos: [28, 44, 80, 69, 26, 82, 42, 12, 52], aminosHinweis: "Ersatzwert: Kidneybohnen", zustand: "trocken" },
  { name: "Kidneybohnen", kategorie: "Hülsenfrüchte", protein: 22, kcal: 310, preis: 1, verfuegbarkeit: 1, aminos: [28, 44, 80, 69, 26, 82, 42, 12, 52], zustand: "trocken" },
  { name: "Erbsen (getrocknet)", kategorie: "Hülsenfrüchte", protein: 23, kcal: 320, preis: 1, verfuegbarkeit: 1, aminos: [25, 43, 73, 77, 20, 72, 35, 7, 45], zustand: "trocken" },
  { name: "Lupinen", kategorie: "Hülsenfrüchte", protein: 36, kcal: 370, preis: 2, verfuegbarkeit: 3, aminos: [28, 45, 76, 53, 19, 77, 37, 8, 42], zustand: "trocken" },
  { name: "Erdnüsse", kategorie: "Hülsenfrüchte", protein: 26, kcal: 600, preis: 1, verfuegbarkeit: 1, aminos: [22, 31, 57, 31, 22, 82, 30, 9, 37], zustand: "geröstet" },
  { name: "Kichererbsen (Dose)", kategorie: "Hülsenfrüchte", protein: 7, kcal: 120, preis: 1, verfuegbarkeit: 1, aminos: [28, 43, 72, 67, 27, 79, 37, 10, 42], zustand: "Konserve" },
  { name: "Edamame", kategorie: "Hülsenfrüchte", protein: 12, kcal: 125, preis: 2, verfuegbarkeit: 2, aminos: [27, 49, 83, 68, 30, 91, 44, 15, 51], aminosHinweis: "Ersatzwert: reife Sojabohnen", zustand: "gekocht" },

  // Soja & Fleischersatz
  { name: "Tofu (natur)", kategorie: "Soja & Fleischersatz", protein: 14, kcal: 125, preis: 2, verfuegbarkeit: 1, aminos: [25, 49, 81, 51, 16, 89, 45, 14, 50], zustand: "" },
  { name: "Räuchertofu", kategorie: "Soja & Fleischersatz", protein: 17, kcal: 160, preis: 2, verfuegbarkeit: 1, aminos: [25, 49, 81, 51, 16, 89, 45, 14, 50], aminosHinweis: "Ersatzwert: Tofu natur", zustand: "" },
  { name: "Tempeh", kategorie: "Soja & Fleischersatz", protein: 19, kcal: 190, preis: 3, verfuegbarkeit: 2, aminos: [23, 43, 70, 45, 18, 77, 39, 10, 45], zustand: "" },
  { name: "Seitan", kategorie: "Soja & Fleischersatz", protein: 25, kcal: 140, preis: 3, verfuegbarkeit: 2, zustand: "" },
  { name: "Sojageschnetzeltes (texturiert)", kategorie: "Soja & Fleischersatz", protein: 50, kcal: 330, preis: 2, verfuegbarkeit: 2, aminos: [25, 44, 74, 61, 27, 82, 40, 13, 46], aminosHinweis: "Ersatzwert: entfettetes Sojamehl", zustand: "trocken" },
  { name: "Sojamilch (ungesüßt)", kategorie: "Soja & Fleischersatz", protein: 3.3, kcal: 40, preis: 1, verfuegbarkeit: 1, zustand: "" },

  // Nüsse & Samen
  { name: "Hanfsamen (geschält)", kategorie: "Nüsse & Samen", protein: 32, kcal: 550, preis: 3, verfuegbarkeit: 2, aminos: [26, 35, 59, 34, 43, 73, 34, 10, 47], zustand: "" },
  { name: "Kürbiskerne", kategorie: "Nüsse & Samen", protein: 30, kcal: 560, preis: 2, verfuegbarkeit: 1, aminos: [22, 36, 68, 35, 26, 79, 28, 16, 44], zustand: "" },
  { name: "Erdnussmus", kategorie: "Nüsse & Samen", protein: 25, kcal: 600, preis: 2, verfuegbarkeit: 1, aminos: [22, 24, 61, 27, 19, 79, 21, 9, 31], zustand: "" },
  { name: "Mandeln", kategorie: "Nüsse & Samen", protein: 21, kcal: 580, preis: 3, verfuegbarkeit: 1, aminos: [23, 27, 57, 23, 18, 65, 27, 7, 31], zustand: "" },
  { name: "Sonnenblumenkerne", kategorie: "Nüsse & Samen", protein: 21, kcal: 580, preis: 1, verfuegbarkeit: 1, aminos: [25, 47, 68, 38, 38, 75, 38, 14, 53], zustand: "" },
  { name: "Pistazien", kategorie: "Nüsse & Samen", protein: 20, kcal: 570, preis: 3, verfuegbarkeit: 1, aminos: [21, 38, 68, 47, 27, 67, 29, 10, 53], zustand: "" },
  { name: "Chiasamen", kategorie: "Nüsse & Samen", protein: 17, kcal: 485, preis: 3, verfuegbarkeit: 2, aminos: [27, 41, 70, 50, 51, 81, 36, 22, 48], zustand: "" },
  { name: "Leinsamen", kategorie: "Nüsse & Samen", protein: 18, kcal: 500, preis: 1, verfuegbarkeit: 1, aminos: [22, 42, 58, 40, 33, 67, 36, 14, 50], zustand: "" },
  { name: "Cashewkerne", kategorie: "Nüsse & Samen", protein: 18, kcal: 580, preis: 3, verfuegbarkeit: 1, aminos: [21, 36, 69, 43, 35, 68, 32, 14, 51], zustand: "" },
  { name: "Walnüsse", kategorie: "Nüsse & Samen", protein: 15, kcal: 690, preis: 3, verfuegbarkeit: 1, aminos: [22, 35, 65, 24, 25, 62, 33, 9, 42], zustand: "" },
  { name: "Sesam", kategorie: "Nüsse & Samen", protein: 18, kcal: 590, preis: 2, verfuegbarkeit: 1, aminos: [25, 36, 65, 27, 45, 81, 36, 19, 47], zustand: "" },

  // Getreide & Pseudogetreide
  { name: "Haferflocken", kategorie: "Getreide & Pseudogetreide", protein: 13, kcal: 370, preis: 1, verfuegbarkeit: 1, aminos: [20, 36, 70, 45, 47, 75, 27, 13, 49], zustand: "trocken" },
  { name: "Quinoa", kategorie: "Getreide & Pseudogetreide", protein: 14, kcal: 360, preis: 3, verfuegbarkeit: 1, aminos: [29, 36, 59, 54, 36, 61, 30, 12, 42], zustand: "trocken" },
  { name: "Amaranth", kategorie: "Getreide & Pseudogetreide", protein: 14, kcal: 370, preis: 3, verfuegbarkeit: 2, aminos: [27, 40, 61, 52, 29, 60, 39, 12, 47], zustand: "trocken" },
  { name: "Dinkelvollkornmehl", kategorie: "Getreide & Pseudogetreide", protein: 14, kcal: 335, preis: 2, verfuegbarkeit: 1, aminos: [23, 35, 69, 26, 38, 71, 28, 8, 44], aminosHinweis: "Ersatzwert: Dinkelkorn", zustand: "" },
  { name: "Vollkornnudeln", kategorie: "Getreide & Pseudogetreide", protein: 13, kcal: 350, preis: 1, verfuegbarkeit: 1, aminos: [22, 36, 64, 21, 35, 71, 25, 12, 40], zustand: "trocken" },
  { name: "Buchweizen", kategorie: "Getreide & Pseudogetreide", protein: 13, kcal: 340, preis: 2, verfuegbarkeit: 2, aminos: [23, 38, 63, 51, 30, 57, 38, 14, 51], zustand: "trocken" },
  { name: "Weizenkeime", kategorie: "Getreide & Pseudogetreide", protein: 27, kcal: 360, preis: 2, verfuegbarkeit: 2, aminos: [26, 34, 63, 59, 37, 65, 39, 13, 48], zustand: "" },
  { name: "Vollkornbrot", kategorie: "Getreide & Pseudogetreide", protein: 8, kcal: 230, preis: 1, verfuegbarkeit: 1, aminos: [23, 37, 68, 29, 38, 78, 30, 15, 45], aminosHinweis: "Ersatzwert: Vollkornweizenbrot", zustand: "" },
  { name: "Reis (Vollkorn)", kategorie: "Getreide & Pseudogetreide", protein: 7, kcal: 350, preis: 1, verfuegbarkeit: 1, aminos: [26, 42, 83, 38, 35, 89, 37, 13, 59], zustand: "trocken" },

  // Gemüse & Pilze
  { name: "Spirulina", kategorie: "Gemüse & Pilze", protein: 57, kcal: 290, preis: 3, verfuegbarkeit: 2, aminos: [19, 56, 86, 53, 32, 93, 52, 16, 61], zustand: "getrocknet" },
  { name: "Nährhefeflocken", kategorie: "Gemüse & Pilze", protein: 50, kcal: 350, preis: 3, verfuegbarkeit: 2, aminos: [23, 47, 72, 81, 27, 71, 49, 13, 57], aminosHinweis: "Ersatzwert: Bäckerhefe", zustand: "" },
  { name: "Grüne Erbsen", kategorie: "Gemüse & Pilze", protein: 6, kcal: 80, preis: 1, verfuegbarkeit: 1, aminos: [20, 36, 60, 58, 21, 58, 37, 7, 43], zustand: "gekocht" },
  { name: "Grünkohl", kategorie: "Gemüse & Pilze", protein: 4.3, kcal: 37, preis: 1, verfuegbarkeit: 1, aminos: [59, 60, 70, 60, 23, 87, 45, 12, 54], zustand: "roh" },
  { name: "Brokkoli", kategorie: "Gemüse & Pilze", protein: 3.7, kcal: 34, preis: 1, verfuegbarkeit: 1, aminos: [21, 28, 46, 48, 23, 59, 31, 12, 44], zustand: "roh" },
  { name: "Spinat", kategorie: "Gemüse & Pilze", protein: 2.7, kcal: 23, preis: 1, verfuegbarkeit: 1, aminos: [22, 51, 78, 61, 31, 83, 43, 14, 56], zustand: "roh" },
  { name: "Champignons", kategorie: "Gemüse & Pilze", protein: 2.7, kcal: 22, preis: 1, verfuegbarkeit: 1,  zustand: "roh" },
  { name: "Rosenkohl", kategorie: "Gemüse & Pilze", protein: 4.5, kcal: 36, preis: 1, verfuegbarkeit: 1, zustand: "roh" },
];
