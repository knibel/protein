(function () {
  "use strict";

  var zutaten = window.ZUTATEN || [];
  var K = window.Komplement;
  var MAX_AUSWAHL = 3;
  var el = {
    suche: document.getElementById("suche"),
    kategorie: document.getElementById("kategorie"),
    sortierung: document.getElementById("sortierung"),
    minProtein: document.getElementById("minProtein"),
    minAnzeige: document.getElementById("minProteinAnzeige"),
    portion: document.getElementById("portion"),
    status: document.getElementById("status"),
    liste: document.getElementById("liste"),
    erg: document.getElementById("ergaenzung"),
    ergTitel: document.getElementById("ergaenzungTitel"),
    ergText: document.getElementById("ergaenzungText"),
    zuruecksetzen: document.getElementById("zuruecksetzen"),
    gerichte: document.getElementById("gerichte"),
    gerichteText: document.getElementById("gerichteText"),
    gerichteListe: document.getElementById("gerichteListe")
  };
  var zahl = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });
  var maxProtein = Math.max.apply(null, zutaten.map(function (z) { return z.protein; }));
  var auswahl = []; // gewählte Zutaten (Objekte aus zutaten), in Reihenfolge des Anhakens

  // Anteil der Kalorien aus Protein (4 kcal/g), in Prozent.
  function dichte(z) { return (z.protein * 4) / z.kcal * 100; }

  var PREIS = { 1: "günstig", 2: "mittel", 3: "teuer" };
  var VERFUEGBARKEIT = { 1: "überall erhältlich", 2: "gut erhältlich", 3: "eingeschränkt erhältlich" };

  function normalisiere(s) {
    return s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
  }

  function prozent(x) { return Math.round(x) + " %"; }

  function mengenText(liste, w) {
    return K.mengen(liste, w).map(function (g, i) {
      return zahl.format(Math.round(g)) + " g " + liste[i].name;
    }).join(" + ");
  }

  function anteilText(w) {
    return w.map(function (x) { return Math.round(x * 100); }).join(" : ") + " % Protein";
  }

  function textFilter(z) {
    var q = normalisiere(el.suche.value.trim());
    var kat = el.kategorie.value;
    return (!q || normalisiere(z.name).indexOf(q) !== -1) &&
      (!kat || z.kategorie === kat) &&
      z.protein >= Number(el.minProtein.value);
  }

  function sortiere(liste, sort) {
    liste.sort(function (a, b) {
      if (sort === "name") return a.name.localeCompare(b.name, "de");
      if (sort === "dichte") return dichte(b) - dichte(a);
      // Bei Gleichstand entscheidet der Proteingehalt.
      if (sort === "verfuegbarkeit") return (a.verfuegbarkeit - b.verfuegbarkeit) || (b.protein - a.protein);
      if (sort === "preis") return (a.preis - b.preis) || (b.protein - a.protein);
      return b.protein - a.protein;
    });
  }

  // Liefert die darzustellenden Zeilen: { zutat, treffer? } und Zusatzinfos.
  function bestimme() {
    var sort = el.sortierung.value;
    var gefiltert = zutaten.filter(textFilter);
    if (auswahl.length === 0) {
      sortiere(gefiltert, sort);
      return { zeilen: gefiltert.map(function (z) { return { zutat: z }; }), ausgeblendet: 0 };
    }

    var erg = K.ergaenzungen(auswahl, zutaten);
    var zeilen = auswahl.map(function (z) { return { zutat: z, gewaehlt: true }; });
    var rest;
    var ausgeblendet = 0;
    if (erg.voll) {
      rest = gefiltert.filter(function (z) { return auswahl.indexOf(z) === -1; });
      sortiere(rest, sort === "ergaenzung" ? "protein" : sort);
      rest = rest.map(function (z) { return { zutat: z }; });
    } else {
      var proZutat = new Map(erg.treffer.map(function (t) { return [t.zutat, t]; }));
      var passend = erg.treffer.filter(function (t) { return textFilter(t.zutat); });
      ausgeblendet = zutaten.length - auswahl.length - erg.treffer.length;
      if (sort === "ergaenzung") {
        rest = passend; // schon nach Ergänzungsgüte sortiert
      } else {
        var z2t = passend.map(function (t) { return t.zutat; });
        sortiere(z2t, sort);
        rest = z2t.map(function (z) { return proZutat.get(z); });
      }
      rest = rest.map(function (t) { return { zutat: t.zutat, treffer: t }; });
    }
    return { zeilen: zeilen.concat(rest), ausgeblendet: ausgeblendet, erg: erg };
  }

  function erzeugeZeile(zeile, portion, erg) {
    var z = zeile.zutat;
    var li = document.createElement("li");
    li.className = "eintrag" + (zeile.gewaehlt ? " gewaehlt" : "");

    var balken = document.createElement("div");
    balken.className = "balken";
    balken.style.width = (z.protein / maxProtein * 100) + "%";

    var name = document.createElement("span");
    name.className = "name";
    name.textContent = z.name;

    var protein = document.createElement("span");
    protein.className = "protein";
    protein.textContent = zahl.format(z.protein) + " g / 100 g";

    var meta = document.createElement("span");
    meta.className = "meta";
    meta.textContent = z.kategorie + (z.zustand ? " · " + z.zustand : "") +
      " · " + zahl.format(z.kcal) + " kcal · " + zahl.format(dichte(z)) + " % der Kalorien aus Protein" +
      " · Preis: " + PREIS[z.preis] + " · " + VERFUEGBARKEIT[z.verfuegbarkeit];

    var anteil = document.createElement("span");
    anteil.className = "portion";
    anteil.textContent = portion > 0
      ? zahl.format(z.protein * portion / 100) + " g in " + zahl.format(portion) + " g"
      : "";

    li.append(balken, name, protein, meta, anteil);

    var t = zeile.treffer;
    if (t) {
      var passt = document.createElement("span");
      passt.className = "meta passt";
      var liste = auswahl.concat(z);
      var text = (t.stufe === 2 ? "Ergänzt sehr gut" : "Ergänzt gut") + " – Aminosäure-Score der Mischung " +
        prozent(t.score) + ": " + mengenText(liste, t.w) + " (" + anteilText(t.w) + ")";
      if (t.liefert) text += " · liefert reichlich " + K.NAMEN[erg.mischung.limit];
      passt.textContent = text;
      li.appendChild(passt);
    }
    if (z.aminosHinweis && (zeile.gewaehlt || t)) {
      var hinweis = document.createElement("span");
      hinweis.className = "meta";
      hinweis.textContent = "Aminosäurewerte: " + z.aminosHinweis;
      li.appendChild(hinweis);
    }

    if (z.aminos) {
      var label = document.createElement("label");
      label.className = "waehlen";
      var box = document.createElement("input");
      box.type = "checkbox";
      box.checked = !!zeile.gewaehlt;
      box.disabled = !box.checked && auswahl.length >= MAX_AUSWAHL;
      box.dataset.name = z.name;
      box.addEventListener("change", function () { waehle(z, box.checked); });
      var txt = document.createElement("span");
      txt.textContent = zeile.gewaehlt ? "In der Auswahl" : "Zur Auswahl hinzufügen (Ergänzungen finden)";
      label.append(box, txt);
      li.appendChild(label);
    }
    return li;
  }

  function waehle(z, an) {
    var i = auswahl.indexOf(z);
    if (an && i === -1 && auswahl.length < MAX_AUSWAHL) auswahl.push(z);
    if (!an && i !== -1) auswahl.splice(i, 1);
    // Mit Auswahl ist die Ergänzungssortierung sinnvoll, ohne Auswahl nicht.
    if (an && auswahl.length === 1 && el.sortierung.value === "protein") el.sortierung.value = "ergaenzung";
    if (auswahl.length === 0 && el.sortierung.value === "ergaenzung") el.sortierung.value = "protein";
    rendere();
    var box = el.liste.querySelector('input[data-name="' + z.name.replace(/"/g, '\\"') + '"]');
    if (box) box.focus();
  }

  function rendereAuswahl(info) {
    el.erg.hidden = auswahl.length === 0;
    if (auswahl.length === 0) return;
    var erg = info.erg;
    var m = erg.mischung;
    el.ergTitel.textContent = "Ihre Auswahl: " + auswahl.map(function (z) { return z.name; }).join(" + ");
    var text = auswahl.length === 1
      ? auswahl[0].name + " allein: Aminosäure-Score " + prozent(m.score * 100)
      : "Beste Mischung: " + mengenText(auswahl, m.w) + " (" + anteilText(m.w) + ") – Aminosäure-Score " + prozent(m.score * 100);
    text += erg.voll ? ". Diese Auswahl deckt alle essenziellen Aminosäuren; weitere Zutaten sind frei kombinierbar."
      : ", begrenzt durch " + K.NAMEN[m.limit] + ". Die Liste unten zeigt nur Zutaten, die das verbessern.";
    el.ergText.textContent = text;
  }

  // Gerichte, die alle gewählten Zutaten enthalten; sonst die mit den meisten.
  function rendereGerichte() {
    var gerichte = window.GERICHTE || [];
    el.gerichte.hidden = auswahl.length === 0;
    if (auswahl.length === 0) return;
    var namen = auswahl.map(function (z) { return z.name; });
    var bewertet = gerichte.map(function (g) {
      var posten = g.zutaten.map(function (p) {
        return { zutat: zutaten.find(function (z) { return z.name === p.name; }), gramm: p.gramm };
      });
      var treffer = g.zutaten.filter(function (p) { return namen.indexOf(p.name) !== -1; }).length;
      return { gericht: g, treffer: treffer, wert: K.bewerteGericht(posten) };
    }).filter(function (r) { return r.treffer > 0; });
    var alle = bewertet.filter(function (r) { return r.treffer === auswahl.length; });
    var liste = alle;
    if (alle.length > 0) {
      el.gerichteText.textContent = alle.length + (alle.length === 1 ? " Gericht enthält" : " Gerichte enthalten") +
        " alle gewählten Zutaten.";
    } else {
      var teil = bewertet.reduce(function (m, r) { return Math.max(m, r.treffer); }, 0);
      liste = bewertet.filter(function (r) { return r.treffer === teil; });
      el.gerichteText.textContent = teil === 0 ? "Kein Gericht in der Sammlung enthält eine der gewählten Zutaten."
        : "Kein Gericht enthält alle gewählten Zutaten. Gezeigt werden Gerichte mit " + teil + " von " + auswahl.length + " Zutaten.";
    }
    liste.sort(function (a, b) { return (b.wert.score - a.wert.score) || (b.wert.protein - a.wert.protein); });
    el.gerichteListe.replaceChildren.apply(el.gerichteListe, liste.map(erzeugeGericht));
  }

  function erzeugeGericht(r) {
    var g = r.gericht;
    var li = document.createElement("li");
    li.className = "eintrag";

    var balken = document.createElement("div");
    balken.className = "balken";
    balken.style.width = Math.min(r.wert.score * 100, 100) + "%";

    var name = document.createElement("span");
    name.className = "name";
    name.textContent = g.name + " – " + g.herkunft;

    var wert = document.createElement("span");
    wert.className = "protein";
    wert.textContent = "Score " + prozent(r.wert.score * 100) + " · ca. " + zahl.format(Math.round(r.wert.protein)) + " g Protein";

    var beschr = document.createElement("span");
    beschr.className = "meta zutatenzeile";
    beschr.textContent = g.beschreibung;

    var zut = document.createElement("span");
    zut.className = "meta zutatenzeile";
    zut.textContent = "Pro Portion: " + g.zutaten.map(function (p) {
      return zahl.format(p.gramm) + " g " + p.name;
    }).join(", ") + (g.weitere ? " · außerdem: " + g.weitere : "") +
      (r.wert.score < 1 ? " · begrenzt durch " + K.NAMEN[r.wert.limit] : "");

    li.append(balken, name, wert, beschr, zut);
    return li;
  }

  function rendere() {
    el.minAnzeige.textContent = el.minProtein.value;
    var portion = Number(el.portion.value);
    var info = bestimme();
    el.liste.replaceChildren.apply(el.liste, info.zeilen.map(function (r) { return erzeugeZeile(r, portion, info.erg); }));
    rendereAuswahl(info);
    rendereGerichte();

    if (auswahl.length === 0) {
      el.status.textContent = info.zeilen.length === 0 ? "Keine Treffer."
        : info.zeilen.length + " von " + zutaten.length + " Zutaten";
    } else if (info.erg.voll) {
      el.status.textContent = info.zeilen.length - auswahl.length + " weitere Zutaten (alle kombinierbar)";
    } else {
      var n = info.zeilen.length - auswahl.length;
      el.status.textContent = n + " passende Ergänzungen" +
        (info.ausgeblendet ? " (" + info.ausgeblendet + " Zutaten passen nicht oder haben keine Aminosäuredaten)" : "");
    }
  }

  el.zuruecksetzen.addEventListener("click", function () {
    auswahl = [];
    if (el.sortierung.value === "ergaenzung") el.sortierung.value = "protein";
    rendere();
  });

  Array.from(new Set(zutaten.map(function (z) { return z.kategorie; }))).forEach(function (k) {
    var o = document.createElement("option");
    o.value = k;
    o.textContent = k;
    el.kategorie.appendChild(o);
  });

  ["input", "change"].forEach(function (ev) {
    [el.suche, el.kategorie, el.sortierung, el.minProtein, el.portion]
      .forEach(function (e) { e.addEventListener(ev, rendere); });
  });
  rendere();
})();
