# Essential amino acid profiles of cereals, pseudocereals, vegetables, mushrooms, dairy and eggs

Scope note: Numbers below were computed by me from the USDA FoodData Central SR Legacy bulk CSV (April 2018 release, downloaded from fdc.nal.usda.gov, "FoodData_Central_sr_legacy_food_csv_2018-04.zip"; per-100 g amino acid and protein values for the FDC IDs listed). No Souci-Fachmann-Kraut/BLS, FAO/INFOODS or per-food peer-reviewed tables could be opened (PMC pages sit behind a captcha, the FAO 2013 report contains no per-food annex table, see Gaps). So every row has a single source family (USDA), and the cross-source disagreement analysis is limited to flags on internal USDA inconsistencies and to the Herreman 2020 DIAAS data.

## 1. What are the best-quality published values per food (mg EAA per g protein, N x 6.25 basis)?

### Takeaway
USDA SR Legacy is the only per-food composition source I could fully access; I converted it to mg/g protein on a uniform N x 6.25 basis. Cereal rows (oats, wheat, spelt, rye, millet, rice, wheat germ, amaranth) needed conversion because USDA divides by its own N factor (5.80 to 5.95), and dairy rows (6.38) were converted the other way. Several USDA rows are clearly imputed or implausible and are flagged below.

### Method and conversions
- Per-food value = (amino acid g/100 g x 1000) / (USDA protein g/100 g) x (USDA N factor / 6.25). USDA protein = N x its food-specific factor, so AA/(N x 6.25) = AA x factor / (P x 6.25). The factors were read from the same dataset's food_protein_conversion_factor.csv: oats 5.83, spelt/wheat flour/pasta/rye/millet 5.83, wheat germ 5.80, amaranth 5.85, brown rice 5.95, milk/cheese/yoghurt/whey 6.38, quinoa/buckwheat/corn/vegetables/mushrooms/egg 6.25. For the whole-wheat bread recipe entry no factor is listed, so I left it unconverted (flag).
- SAA = Met + Cys, AAA = Phe + Tyr, both summed in g before division.
- The WHO and FAO patterns are mg per g protein with protein = N x 6.25, so the converted 6.25 basis is the comparable one. The "score" = food mg/g divided by pattern mg/g x 100 for the lowest amino acid. It is a chemical (amino acid) score only, NOT corrected for digestibility, so it is not PDCAAS or DIAAS.
- The mg/g N to mg/g protein factor 0.16 was not needed (USDA reports g per 100 g food, not per g N).
- State of food: raw/dry/as-sold as noted in the Food column; pasta and bread rows are usable only as per-protein ratios.

### Reference patterns (verified against primary text)
- WHO/FAO/UNU 2007 adult (mg/g protein, Table 23 of TRS 935): His 15, Ile 30, Leu 59, Lys 45, Met+Cys 22, Phe+Tyr 38, Thr 23, Trp 6, Val 39 — [WHO TRS 935 PDF copy](https://lenews.ch/wp-content/uploads/2017/03/WHO_TRS_935_eng_Protein.pdf) (Table 23, "Present estimates"). The same report's PDCAAS example table gives adult Lys 45, SAA 22, Thr 23, Trp 6.0.
- FAO 2013 (FNP 92) Table 5 scoring patterns, mg/g protein. Child (0.5-3 y): His 20, Ile 32, Leu 66, Lys 57, SAA 27, AAA 52, Thr 31, Trp 8.5, Val 43. Older child/adolescent/adult: His 16, Ile 30, Leu 61, Lys 48, SAA 23, AAA 41, Thr 25, Trp 6.6, Val 40. Infant: 21, 55, 96, 69, 33, 94, 44, 17, 55 — [FAO 2013 report](https://www.fao.org/3/i3124e/i3124e.pdf) (text read from the FAO-hosted copy of FNP 92).

### Cited Findings (computed table; source for every row = USDA FDC SR Legacy entry given, [USDA FoodData Central download](https://fdc.nal.usda.gov/download-datasets))
Columns are mg/g protein (N x 6.25 basis). Score in % is lowest amino acid vs. pattern, undigestibility-uncorrected.

| Food (USDA SR Legacy entry) | N-factor used by USDA | His | Ile | Leu | Lys | SAA | AAA | Thr | Trp | Val | Limiting vs WHO 2007 adult (score %) | Limiting vs FAO 2013 >3 y (score %) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Rolled oats (regular/quick, dry) (FDC 173904) | 5.83 | 20 | 36 | 70 | 45 | 47 | 75 | 27 | 13 | 49 | Lys (100) | Lys (94) |
| Quinoa, uncooked (FDC 168874) | 6.25 | 29 | 36 | 59 | 54 | 36 | 61 | 30 | 12 | 42 | Leu (101) | Leu (98) |
| Amaranth grain, uncooked (FDC 170682) | 5.85 | 27 | 40 | 61 | 52 | 29 | 60 | 39 | 12 | 47 | Leu (103) | Leu (99) |
| Buckwheat groats, roasted, dry (FDC 170685) | 6.25 | 23 | 38 | 63 | 51 | 30 | 57 | 38 | 14 | 51 | Leu (106) | Leu (103) |
| Spelt, uncooked (grain; proxy for whole-grain spelt flour) (FDC 169745) | 5.83 | 23 | 35 | 69 | 26 | 38 | 71 | 28 | 8 | 44 | Lys (58) | Lys (55) |
| Whole-grain wheat flour (proxy for whole-wheat bread/pasta) (FDC 168893) | 5.83 | 25 | 31 | 63 | 25 | 36 | 68 | 26 | 12 | 40 | Lys (56) | Lys (53) |
| Whole-wheat pasta (cooked entry; per-protein ratios) (FDC 168910) | 5.83 | 22 | 36 | 64 | 21 | 35 | 71 | 25 | 12 | 40 | Lys (46) | Lys (43) |
| Whole-wheat bread (home recipe entry) (FDC 172690) | unknown (recipe) | 23 | 37 | 68 | 29 | 38 | 78 | 30 | 15 | 45 | Lys (65) | Lys (61) |
| Wheat germ, crude (FDC 168892) | 5.8 | 26 | 34 | 63 | 59 | 37 | 65 | 39 | 13 | 48 | Leu (107) | Leu (103) |
| Brown rice, long-grain, raw (FDC 169703) | 5.95 | 26 | 42 | 83 | 38 | 35 | 89 | 37 | 13 | 59 | Lys (85) | Lys (80) |
| Rye grain (FDC 168884) | 5.83 | 17 | 19 | 51 | 26 | 14 | 57 | 26 | 10 | 29 | Lys (57) | Lys (54) |
| Rye flour, dark (FDC 168885) | 5.83 | 14 | 21 | 50 | 20 | 12 | 54 | 29 | 11 | 29 | Lys (44) | Lys (41) |
| Corn grain, yellow (FDC 170288) | 6.25 | 30 | 36 | 123 | 28 | 39 | 90 | 38 | 7 | 51 | Lys (63) | Lys (59) |
| Millet, raw (FDC 169702) | 5.83 | 20 | 39 | 119 | 18 | 37 | 78 | 30 | 10 | 49 | Lys (40) | Lys (37) |
| Broccoli, raw (FDC 170379) | 6.25 | 21 | 28 | 46 | 48 | 23 | 59 | 31 | 12 | 44 | Leu (78) | Leu (75) |
| Spinach, raw (FDC 168462) | 6.25 | 22 | 51 | 78 | 61 | 31 | 83 | 43 | 14 | 56 | Leu (132) | Lys (127) |
| Kale, raw (FDC 168421) | 6.25 | 59 | 60 | 70 | 60 | 23 | 87 | 45 | 12 | 54 | SAA (104) | SAA (100) |
| Brussels sprouts, raw (Tyr missing in USDA) (FDC 170383) | 6.25 | 22 | 39 | 45 | 46 | 16 | n/a | 36 | 11 | 46 | SAA (73) | SAA (69) |
| Mushrooms, white (champignon), raw (FDC 169251) | 6.25 | 18 | 25 | 39 | 35 | 14 | 42 | 35 | 11 | 75 | SAA (63) | SAA (61) |
| Mushrooms, crimini, raw (FDC 168434) | 6.25 | 27 | 40 | 61 | 101 | 22 | 60 | 45 | 22 | 46 | SAA (98) | SAA (94) |
| Cow milk, whole 3.25% (FDC 171265) | 6.38 | 31 | 53 | 97 | 86 | 33 | 104 | 43 | 13 | 67 | SAA (150) | SAA (144) |
| Cottage cheese 1% (proxy for quark/curd) (FDC 173417) | 6.38 | 34 | 60 | 105 | 83 | 40 | 109 | 45 | 11 | 63 | Val (162) | Val (158) |
| Yoghurt, plain low-fat (proxy for skyr) (FDC 170886) | 6.38 | 25 | 56 | 103 | 92 | 39 | 107 | 42 | 6 | 84 | Trp (97) | Trp (88) |
| Gouda (FDC 171241) | 6.38 | 42 | 53 | 105 | 109 | 40 | 118 | 38 | 14 | 74 | Thr (166) | Thr (152) |
| Parmesan, hard (FDC 170848) | 6.38 | 40 | 54 | 99 | 94 | 34 | 112 | 38 | 14 | 70 | SAA (155) | SAA (148) |
| Mozzarella, whole milk (FDC 170845) | 6.38 | 24 | 52 | 84 | 44 | 29 | 95 | 45 | 24 | 61 | Lys (99) | Lys (93) |
| Mozzarella, whole milk, low moisture (FDC 170846) | 6.38 | 38 | 49 | 100 | 104 | 35 | 112 | 39 | 14 | 64 | SAA (157) | SAA (150) |
| Egg, whole, raw (FDC 171287) | 6.25 | 25 | 53 | 86 | 73 | 52 | 94 | 44 | 13 | 68 | Leu (147) | Leu (142) |
| Whey, sweet, dried (proxy for whey protein; not an isolate) (FDC 171283) | 6.38 | 19 | 57 | 94 | 81 | 39 | 61 | 65 | 16 | 55 | His (125) | His (117) |

### Inferences (reading the table)
- Lysine is limiting in wheat products, spelt, rye, corn, millet and brown rice (scores about 40-65% for most, 80-85% for brown rice; oats about 94-100%). This is the classic cereal lysine limit and fits the WHO table 24 "Lys % of requirement" (rice 86, maize 58, wheat 57) in the [WHO TRS 935 PDF](https://lenews.ch/wp-content/uploads/2017/03/WHO_TRS_935_eng_Protein.pdf).
- Quinoa, amaranth, buckwheat and wheat germ come out around 100% or higher with Leu as the nominal lowest amino acid, i.e. essentially no strongly limiting amino acid on a chemical-score basis (scores 98-110%). Digestibility (not in these rows) lowers real quality.
- Leafy/cruciferous vegetables: broccoli ~75-78% (Leu), Brussels sprouts ~70% (SAA; Tyr missing, so AAA unknown), kale ~100% (SAA, borderline), spinach >125% (but in absolute terms very little protein per 100 g, 2.9 g).
- Milk, cheeses and egg: all >=100% in adult patterns once the questionable rows are excluded; for infants/children SAA, Trp, Val or Leu can come lowest.
- Whey (dried sweet whey proxy) lowest = His (117-125%), consistent with Herreman's finding that whey is His-limited (DIAAS 85).

## 2. Where do sources disagree, and which value do I recommend?

### Takeaway
Only one composition source was fully accessible, so disagreement shows up mainly as internal USDA inconsistencies (imputed values) and as digestibility-corrected vs uncorrected quality. Recommended picks are in the table at the end of this section.

### Cited Findings (flags)
- Mozzarella: USDA lists two very different entries; "whole milk" FDC 170845 gives Lys 44, Trp 24 mg/g, whereas "whole milk, low moisture" FDC 170846 gives Lys 104, Trp 14. The 170845 values look derived from the cheddar entry (FDC 173414: Lys 45, Trp 24, near-identical pattern), so treat them as imputed. Recommend 170846 (Lys ~104, Trp ~14), consistent with Gouda/Parmesan/Swiss within about 10%.
- Yoghurt (FDC 170886): Trp 6 mg/g and Val 84 look implausible against milk (Trp 13, Val 67); the entry's whole-milk/skim variants carry identical values, suggesting an imputed profile. Recommend using the milk row (FDC 171265) as the proxy for yoghurt/skyr/quark, with dairy as casein+whey mix.
- Cottage cheese rows differ (FDC 173417 vs 172182: Lys 83 vs 84, Val 63 vs 67 after conversion), so within about 5% except Val. No USDA entry exists for quark or skyr in SR Legacy (searched food.csv); cottage cheese/yoghurt are proxies, not measured quark or skyr.
- Mushrooms: white (FDC 169251) shows Val 75 and SAA 14, but crimini (FDC 168434) shows Lys 101, SAA 22, Val 46; portabella entries vary even more (Lys 34 to 119 per UV treatment entry). These are internally inconsistent, likely partly imputed; I do not recommend a single USDA mushroom profile. Literature search found only free amino acid data on a mixed fresh/dry basis, not a total-AA mg/g protein profile ([Atlantis Press PDF](https://download.atlantis-press.com/article/25860285.pdf), [agrojournal Bulgaria](https://www.agrojournal.org/26/01s-24.html)); I did not retrieve numbers from them. One review notes non-protein N (free amino acids, urea) makes N x 6.25 overstate mushroom protein, which depresses mg/g protein values when computed on that basis.
- Whole-wheat bread: USDA "commercially prepared, toasted" (FDC 172689) gives absurd values (Lys 11 mg/g) so I excluded it; the recipe entry (FDC 172690) is plausible (Lys 29 mg/g) and close to the wheat flour entry (25).
- Pasta: whole-wheat cooked (FDC 168910) Lys 21 vs flour 25 mg/g; the difference is small but within rounding of imputed values, and wheat gluten-rich products have lower lysine/protein than whole grain.
- Vegetables: kale His 59 mg/g is high against all others (21-22); possible but unconfirmed.
- Quinoa/amaranth/buckwheat: a separate literature table lists lysine 5.55 / 5.45 / 6.10 g per 100 g protein for quinoa / amaranth / buckwheat ([PMC7056906 Table 3](https://pmc.ncbi.nlm.nih.gov/articles/PMC7056906/table/T3), snippet only, table not opened), i.e. 55 / 54.5 / 61 mg/g, versus USDA 54 / 52 / 51. Agreement for quinoa and amaranth; buckwheat literature is about 20% higher than USDA.
- Protein quality of amaranth flour varieties: PDCAAS reported as about 24-36% with valine limiting ([CONICET record](https://ri.conicet.gov.ar/handle/11336/19162)), abstract only, flagged as low and unverified; it conflicts with the ~100% chemical score here, which shows digestibility/ANF effects or different reference pattern.

### Recommended value per food (for the downstream calculator)
Use the USDA row listed in the table, converted to the N x 6.25 basis, except:
- Mozzarella: use FDC 170846.
- Yoghurt, skyr, quark: use milk FDC 171265 as proxy (flag as proxy). Do not use USDA yoghurt Trp 6.
- Whey protein: dried sweet whey is not a whey protein isolate/concentrate; the table row is only a proxy. For a more reliable pattern, use the published Herreman 2020 supplementary data (not accessible to me).
- Mushrooms: low confidence; do not rely on a single USDA row.
- Brussels sprouts: AAA not available in USDA (no Tyrosine).
- Whole-wheat bread/pasta: use wheat flour (FDC 168893) as primary; the bread recipe/pasta cooked entries as cross-checks.
- Vital wheat gluten and rye: see Gaps for gluten. Rye grain/flour rows (Ile 19-21, SAA 12-14, Val 29) look low relative to wheat and other rye literature I know of, so flag them as low confidence; I could not verify against a second source.

## 3. Which amino acid is limiting, and what are PDCAAS/DIAAS where published?

### Takeaway
Lysine limits wheat/spelt/rye/corn/millet/rice/oats; Leu (borderline, ~100%) in pseudocereals; SAA in Brussels sprouts/kale/mushrooms and sometimes broccoli (Leu); His limits whey; dairy and egg are non-limiting for adults. Published digestibility-corrected scores come from Herreman et al. 2020 (pig ileal digestibility, 0.5-3 y pattern) and the FAO 2013 example table.

### Cited Findings
- DIAAS with 0.5-3 y (child) pattern, means, from [Herreman et al. 2020, Food Sci Nutr 8:5379](https://pmc.ncbi.nlm.nih.gov/articles/PMC7590266/) Table 2: corn 36 (Lys), rice 47 (Lys), wheat 48 (Lys), oat 57 (Lys), whey 85 (His), egg 101 (no limiting AA; His 101 lowest), casein 117, pork 117; rapeseed 67, pea 70, soy 91, potato 100, fava 55. Herreman's categories: <75 no claim, 75-99 high, >=100 excellent.
- Herreman individual DIAA ratios (child pattern): corn Lys 36, Trp 52; rice Lys 47; wheat Lys 48; oat Lys 57; egg all >=101; whey His 85 (others 101-180).
- FAO 2013 Table 6 worked example (child pattern): wheat 100 g, 11 g protein, DIAAS 40 (low); whole milk powder 28 g protein, DIAAS 122 (high); peas 64 — [FAO 2013](https://www.fao.org/3/i3124e/i3124e.pdf).
- A forum/label-guide summary lists PDCAAS wheat 0.45 and corn 0.41 — [foodlabelmaker.com](https://foodlabelmaker.com/blog/label-guide/pdcaas-protein-digestibility-diaas-of-common-foods/) — secondary source, not verified against the primary paper; treat as unverified.
- A table listed whey protein isolate at DIAAS 1.00 and PDCAAS 0.99 — [PMC7760812 Table 2](https://pmc.ncbi.nlm.nih.gov/articles/PMC7760812/table/nutrients-12-03704-t002) — seen only in a search summary; I could not open the table. Unverified.
- Wheat has lower pig SID of indispensable amino acids than the other ingredients tested (except Thr) — [Br J Nutr 117:490, Illinois](https://origin.nutrition.ansci.illinois.edu/sites/default/files/BritJNutr117.490-499.pdf), summary only.
- Quinoa/buckwheat/amaranth wholegrain: protein digestibility about 79-85% in a 2019 study ([DOAJ record](https://doaj.org/article/f9bd6a7c4c51435ea312e7739b9cae7c)); no DIAAS found for these three.

### Inferences
- If quinoa chemical score is ~100% and in vitro digestibility ~80%, a digestibility-corrected score would be ~80% for the adult pattern (my arithmetic, not a published DIAAS).
- Using Herreman's child-pattern DIAAS for adult calculations will understate adult quality; the adult pattern is less demanding (Lys 45 vs 57 mg/g child pattern). I did not recompute DIAAS because per-amino-acid SID was not accessible.

## Gaps
- Vital wheat gluten / seitan: USDA SR Legacy entry (FDC 168147) has no amino acid data and no source with a verified profile was found. Lysine is qualitatively the limiting amino acid (general sources only, no numbers). Needs a primary reference (e.g. FAO/INFOODS or a gluten composition paper) before use.
- Skyr and quark (Magerquark): no composition source found; proxies only.
- Whey protein isolate/concentrate: no accessible primary table; Herreman supplementary data and manufacturer specs not retrieved.
- Mushrooms: no total-amino-acid mg/g-protein dataset found; USDA rows inconsistent.
- Brussels sprouts Phe+Tyr: Tyr missing in USDA.
- Souci-Fachmann-Kraut/BLS, FAO/INFOODS, Herreman supplementary tables S1-S4 (not accessible: PMC captcha / not in main text). The FAO 2013 report has no per-food annex amino acid table (only worked examples in Chapter 1/Tables 1-2, 6).
- Rye: USDA grain and flour rows look low in several amino acids; no second source.
- DIAAS/PDCAAS for rolled oats under adult pattern, quinoa, amaranth, buckwheat, spelt, rye, millet, vegetables, mushrooms, cheeses: not found; only the Herreman set above.
- Dairy/eggs: Herreman gives DIAAS only for whey, casein, egg (no milk, yoghurt or cheese rows).
- USDA yoghurt Trp 6 mg/g and mozzarella (170845) Lys 44 mg/g are suspected imputed values; no independent confirmation obtained.
