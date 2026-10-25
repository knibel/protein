// Aufruf: node tests/komplement.test.js
global.window = {};
require("../js/data.js");
const K = require("../js/komplement.js");
const assert = require("assert");
const z = (n) => window.ZUTATEN.find((x) => x.name === n);

// Grundregeln: Getreide Lysin-limitiert, Hülsenfrüchte Methionin+Cystein-limitiert.
assert.strictEqual(K.bewerte(z("Reis (Vollkorn)").aminos).limit, 3);
assert.strictEqual(K.bewerte(z("Erbsen (getrocknet)").aminos).limit, 4);
assert.strictEqual(K.bewerte(z("Hühnerei").aminos).score, 1);

// Reis + Erbse: das Optimum liegt dort, wo die Lysin- und die SAA-Gerade sich schneiden.
const reis = z("Reis (Vollkorn)").aminos, erbse = z("Erbsen (getrocknet)").aminos;
const m = K.besteMischung(erbse, reis, 0, 1);
const lys = (w) => (w * erbse[3] + (1 - w) * reis[3]) / K.REFERENZ[3];
const saa = (w) => (w * erbse[4] + (1 - w) * reis[4]) / K.REFERENZ[4];
assert.ok(m.score >= Math.min(lys(0.5), saa(0.5), 1) - 1e-9);
for (let w = 0; w <= 1; w += 0.01) {
  assert.ok(K.bewerte(K.mische(erbse, reis, w)).score <= m.score + 1e-9, "Optimum nicht maximal bei w=" + w);
}
// Anmerkung: Herreman et al. 2020 nennt 59 % Erbse / 41 % Reis, Score 84. Das gilt für das
// 0,5–3-Jahre-Muster mit Verdaulichkeitskorrektur und weicht von diesen Rohdaten ab.

// Ergänzungsliste: Reis wird von Hülsenfrüchten ergänzt, nicht von Walnüssen.
const l = K.ergaenzungen([z("Reis (Vollkorn)")], window.ZUTATEN);
const namen = l.treffer.map((t) => t.zutat.name);
assert.ok(namen.includes("Kichererbsen") || namen.includes("Linsen (rot)"), namen.join());
assert.ok(!namen.includes("Walnüsse"));

// Mehrere Zutaten: Anteile ergeben 1, Score nie schlechter als bei der besten Einzelzutat.
const dreier = [z("Reis (Vollkorn)"), z("Mandeln"), z("Linsen (rot)")];
const k = K.kombiniere(dreier);
assert.ok(Math.abs(k.w.reduce((a, b) => a + b) - 1) < 1e-9);
assert.ok(k.w.every((w) => w >= 0.1 - 1e-9));
assert.ok(k.score >= Math.max(...dreier.map((d) => K.bewerte(d.aminos).score)) - 1e-9);
// Zwei vs. drei Zutaten: eine dritte Zutat darf das Optimum nicht verschlechtern, wenn ihr Anteil klein sein darf.
assert.ok(K.kombiniere([z("Reis (Vollkorn)"), z("Linsen (rot)")]).score >= K.bewerte(z("Reis (Vollkorn)").aminos).score);
// Mengen: erste Zutat immer 100 g.
assert.ok(Math.abs(K.mengen(dreier, k.w)[0] - 100) < 1e-9);

// Bereits vollwertige Auswahl braucht keine Ergänzung; zweistufige Auswahl liefert eine Liste.
assert.strictEqual(K.ergaenzungen([z("Hühnerei")], window.ZUTATEN).voll, true);
const zwei = K.ergaenzungen([z("Reis (Vollkorn)"), z("Mandeln")], window.ZUTATEN);
assert.ok(zwei.voll || zwei.treffer.length > 0);

// Zutaten ohne Aminosäuredaten nehmen nicht teil.
assert.ok(!z("Seitan").aminos);
console.log("Alle Tests bestanden.");
