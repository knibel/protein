/*
 * Aminosäure-Ergänzung: bewertet Zutaten und Zweier-Mischungen nach ihrem
 * Aminosäureprofil. Läuft im Browser (window.Komplement) und in Node (module.exports).
 * Berechnung und Quellen: docs/AMINOSAEUREN.md.
 */
(function (root) {
  "use strict";

  // Reihenfolge wie in data.js (aminos): His, Ile, Leu, Lys, Met+Cys, Phe+Tyr, Thr, Trp, Val.
  var NAMEN = ["Histidin", "Isoleucin", "Leucin", "Lysin", "Methionin + Cystein",
    "Phenylalanin + Tyrosin", "Threonin", "Tryptophan", "Valin"];
  // FAO 2013, Tabelle 5: Kinder ab 3 Jahren, Jugendliche, Erwachsene (mg pro g Protein).
  var REFERENZ = [16, 30, 61, 48, 23, 41, 25, 6.6, 40];

  var MIN_PROTEIN = 1.5;    // g Protein pro 100 g: schwächere Partner liefern praktisch nichts (Kartoffeln: 1,7)
  var W_MIN = 0.1;          // jede Zutat einer Mischung trägt mindestens 10 % des Proteins bei
  var W_MAX = 0.9;
  var MIN_GEWINN = 8;       // Prozentpunkte Verbesserung gegenüber der Zutat allein
  var MIN_ENDWERT = 80;
  var MIN_GRAMM = 10;       // Partnermenge pro 100 g der gewählten Zutat: darunter bzw. darüber
  var MAX_GRAMM = 400;      // ist die Mischung im Alltag nicht sinnvoll

  // Score als Anteil am Referenzmuster (1 = 100 %), auf 1 gedeckelt (FAO: bei Mischkost deckeln).
  function bewerte(aminos) {
    var min = Infinity, idx = 0;
    for (var i = 0; i < REFERENZ.length; i++) {
      var r = aminos[i] / REFERENZ[i];
      if (r < min) { min = r; idx = i; }
    }
    return { score: Math.min(min, 1), roh: min, limit: idx };
  }

  function mische(a, b, w) {
    return a.map(function (x, i) { return w * x + (1 - w) * b[i]; });
  }

  // Bester Proteinanteil w der Zutat a in der Mischung mit b, w in [wMin, wMax].
  // Der Score ist das Minimum von neun Geraden in w (konkav, stückweise linear);
  // das Optimum liegt daher an einem Rand, an einem Schnittpunkt zweier Geraden oder dort,
  // wo eine Gerade die 100-%-Deckelung erreicht. Ist der gedeckelte Score auf einer Spanne
  // maximal, gilt das größte w darin: so wird so wenig Partnerzutat wie nötig empfohlen.
  function besteMischung(a, b, wMin, wMax) {
    wMin = wMin === undefined ? W_MIN : wMin;
    wMax = wMax === undefined ? W_MAX : wMax;
    var kandidaten = [wMin, wMax];
    var steigung = [], achse = [];
    for (var i = 0; i < a.length; i++) {
      steigung[i] = (a[i] - b[i]) / REFERENZ[i];
      achse[i] = b[i] / REFERENZ[i];
      if (steigung[i] !== 0) kandidaten.push((1 - achse[i]) / steigung[i]);
    }
    for (i = 0; i < a.length; i++) {
      for (var j = i + 1; j < a.length; j++) {
        if (steigung[i] !== steigung[j]) kandidaten.push((achse[j] - achse[i]) / (steigung[i] - steigung[j]));
      }
    }
    var best = null;
    kandidaten.forEach(function (w) {
      if (!(w >= wMin && w <= wMax)) return;
      var s = bewerte(mische(a, b, w));
      if (!best || s.score > best.score + 1e-9 || (Math.abs(s.score - best.score) <= 1e-9 && w > best.w)) {
        best = { w: w, score: s.score, roh: s.roh, limit: s.limit };
      }
    });
    return best;
  }

  // Gramm von b pro 100 g a, damit der Proteinanteil von a genau w beträgt.
  function grammPartner(w, proteinA, proteinB) {
    return 100 * (1 - w) / w * proteinA / proteinB;
  }

  // Kleinster Anteil unter den gewählten Zutaten (ohne die zuletzt genannte): ausgewogene Auswahl bevorzugen.
  function kleinster(w) { return Math.min.apply(null, w.slice(0, -1)); }

  // Beste Mischung aus mehreren Zutaten (Objekte mit aminos), jede mit mindestens W_MIN Proteinanteil.
  // Zwei Zutaten exakt (besteMischung), ab drei Zutaten per Raster in 5-%-Schritten.
  // Bei gleichem Score gewinnt der kleinste Anteil der zuletzt genannten Zutat (so wenig Partner wie nötig),
  // danach die ausgewogenste Verteilung auf die übrigen.
  // Ergebnis: { w: [Proteinanteile], score, roh, limit }.
  function kombiniere(zutaten) {
    var n = zutaten.length;
    if (n === 1) {
      var e = bewerte(zutaten[0].aminos);
      return { w: [1], score: e.score, roh: e.roh, limit: e.limit };
    }
    if (n === 2) {
      var m = besteMischung(zutaten[0].aminos, zutaten[1].aminos);
      return { w: [m.w, 1 - m.w], score: m.score, roh: m.roh, limit: m.limit };
    }
    var EINHEITEN = 20, MIN = Math.round(W_MIN * EINHEITEN);
    var best = null, teile = [];
    (function rekursiv(i, rest) {
      if (i === n - 1) {
        if (rest < MIN) return;
        teile[i] = rest;
        var w = teile.map(function (t) { return t / EINHEITEN; });
        var mix = zutaten[0].aminos.map(function (_, k) {
          return zutaten.reduce(function (sum, z, j) { return sum + w[j] * z.aminos[k]; }, 0);
        });
        var sc = bewerte(mix);
        var gleich = best && Math.abs(sc.score - best.score) <= 1e-9;
        if (!best || sc.score > best.score + 1e-9 ||
            (gleich && (w[n - 1] < best.w[n - 1] - 1e-9 ||
              (Math.abs(w[n - 1] - best.w[n - 1]) <= 1e-9 && kleinster(w) > kleinster(best.w) + 1e-9)))) {
          best = { w: w, score: sc.score, roh: sc.roh, limit: sc.limit };
        }
        return;
      }
      for (var t = MIN; rest - t >= MIN * (n - 1 - i); t++) {
        teile[i] = t;
        rekursiv(i + 1, rest - t);
      }
    })(0, EINHEITEN);
    return best;
  }

  // Gramm jeder Zutat pro 100 g der ersten Zutat bei den Proteinanteilen w.
  function mengen(zutaten, w) {
    var basis = w[0] / zutaten[0].protein;
    return zutaten.map(function (z, i) { return 100 * (w[i] / z.protein) / basis; });
  }

  // Grobe Stufe der Abweichung von einer gleich großen Partnermenge (Faktor ca. 1,6 je Stufe).
  function mengenStufe(t) { return Math.round(Math.abs(Math.log(t.gramm / 100)) / 0.5); }

  // Welche Zutaten verbessern die Mischung aus der Auswahl (Zutaten mit aminos) spürbar?
  // Ergebnis: { basis: Score der besten Mischung der Auswahl, voll: Auswahl deckt schon alles, treffer }.
  function ergaenzungen(auswahl, alle) {
    var s0 = kombiniere(auswahl);
    var ergebnis = { basis: s0, mischung: s0, voll: s0.score >= 1, treffer: [] };
    if (ergebnis.voll) return ergebnis;
    alle.forEach(function (z) {
      if (auswahl.indexOf(z) !== -1 || !z.aminos || z.protein < MIN_PROTEIN) return;
      var liste = auswahl.concat(z);
      var m = kombiniere(liste);
      var gewinn = (m.score - s0.score) * 100;
      var end = m.score * 100;
      var stufe = gewinn >= 15 && end >= 90 ? 2 : (gewinn >= MIN_GEWINN && end >= MIN_ENDWERT ? 1 : 0);
      var g = mengen(liste, m.w);
      var gramm = g[g.length - 1];
      if (!stufe || gramm < MIN_GRAMM || gramm > MAX_GRAMM) return;
      ergebnis.treffer.push({
        zutat: z, stufe: stufe, score: end, gewinn: gewinn, w: m.w, mengen: g, gramm: gramm,
        // Hilft die Partnerzutat gerade bei der begrenzenden Aminosäure der Auswahl?
        liefert: z.aminos[s0.limit] >= REFERENZ[s0.limit]
      });
    });
    // Unterschiede unter 5 Punkten gelten als Gleichstand (Daten sind Richtwerte).
    ergebnis.treffer.sort(function (x, y) {
      return (y.stufe - x.stufe) ||
        (Math.round(y.score / 5) - Math.round(x.score / 5)) ||
        (mengenStufe(x) - mengenStufe(y)) ||
        (x.zutat.verfuegbarkeit - y.zutat.verfuegbarkeit) ||
        (x.zutat.preis - y.zutat.preis) ||
        (y.score - x.score);
    });
    return ergebnis;
  }

  // Bewertet ein Gericht: posten = [{ zutat, gramm }] (Zutaten mit aminos).
  // Aminosäuren werden nach der Proteinmenge der Posten gewichtet.
  function bewerteGericht(posten) {
    var protein = 0, summe = REFERENZ.map(function () { return 0; });
    posten.forEach(function (p) {
      var g = p.gramm * p.zutat.protein / 100;
      protein += g;
      p.zutat.aminos.forEach(function (a, i) { summe[i] += g * a; });
    });
    var aminos = summe.map(function (x) { return x / protein; });
    var b = bewerte(aminos);
    return { protein: protein, aminos: aminos, score: b.score, roh: b.roh, limit: b.limit };
  }

  var api = {
    NAMEN: NAMEN, REFERENZ: REFERENZ, MIN_PROTEIN: MIN_PROTEIN,
    bewerte: bewerte, mische: mische, besteMischung: besteMischung,
    grammPartner: grammPartner, kombiniere: kombiniere, bewerteGericht: bewerteGericht, mengen: mengen, ergaenzungen: ergaenzungen
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Komplement = api;
})(typeof window !== "undefined" ? window : this);
