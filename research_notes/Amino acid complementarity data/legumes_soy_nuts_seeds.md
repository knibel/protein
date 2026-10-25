# EAA profiles of legumes, soy products, nuts and seeds (mg/g protein), limiting AA vs WHO/FAO/UNU 2007, PDCAAS/DIAAS

## 1. Best-quality published EAA values per food (mg/g protein), with sources and conversions

### Takeaway
One internally consistent source (USDA FoodData Central, SR Legacy, April 2018 release) covers 24 of the 27 requested foods in the raw/dry or as-sold state. I recomputed every row myself from the downloaded USDA CSV. Textured soy protein, pea protein isolate and nutritional yeast have no matching USDA entry and are handled separately below (proxies or not available). Several USDA rows are flagged as probably imputed (white bean, edamame, others).

### Method and conversions (all stated explicitly)
- Source file: [USDA FDC SR Legacy CSV 2018-04](https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip) (food.csv, food_nutrient.csv), downloaded and parsed locally. Per-food pages: `https://fdc.nal.usda.gov/fdc-app.html#/food-details/<fdcId>/nutrients` (fdcId in table).
- USDA gives g amino acid per 100 g edible food and g protein per 100 g food (nutrient 1003, N x factor used by USDA, mostly 6.25 or food-specific factors; USDA protein = N x its own factor, not always 6.25).
- mg/g protein = (g AA per 100 g food x 1000) / (g protein per 100 g food). Example: lentils Trp 0.221 g/100 g, protein 24.63 g/100 g -> 9.0 mg/g.
- SAA = Met + Cys; AAA = Phe + Tyr. Values rounded to integer mg/g.
- mg/g N -> mg/g protein: multiply by 0.16 (N x 6.25). Not needed for the USDA rows (already per protein basis computed above), but needed if comparing to FAO/INFOODS or SFK tables expressed per g N.
- Reference: WHO/FAO/UNU 2007 adult pattern (WHO TRS 935, Table 23, mg/g protein): His 15, Ile 30, Leu 59, Lys 45, SAA 22 (Met 16 + Cys 6), AAA 38, Thr 23, Trp 6, Val 39 — verified from the report text: [WHO TRS 935 PDF](https://lenews.ch/wp-content/uploads/2017/03/WHO_TRS_935_eng_Protein.pdf) (mirror of iris.who.int/handle/10665/43411).
- Ratio = food value / adult reference; limiting AA = lowest ratio. Ratio < 1 means deficiency; if all >= 1, "none" and the lowest AA is given in brackets. This is an uncorrected chemical score, NOT digestibility-corrected.

### Cited Findings (USDA SR Legacy, raw/dry unless noted; protein in g/100 g)

| Food (USDA description, fdcId) | Prot | His | Ile | Leu | Lys | SAA | AAA | Thr | Trp | Val | Limiting AA (ratio to WHO 2007 adult) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Soybeans, mature seeds, raw (174270) | 36.5 | 30 | 54 | 91 | 74 | 33 | 100 | 48 | 16 | 56 | none (lowest Val 1.43) |
| Tofu, raw, firm, CaSO4 (172475) | 17.3 | 25 | 49 | 81 | 51 | 16 | 89 | 45 | 14 | 50 | SAA 0.71 |
| Tempeh, raw (174272) | 20.3 | 23 | 43 | 70 | 45 | 18 | 77 | 39 | 10 | 45 | SAA 0.82 (Lys 0.99) |
| Textured soy protein: PROXY soy flour, defatted (174275) | 51.5 | 25 | 44 | 74 | 61 | 27 | 82 | 40 | 13 | 46 | none (lowest Val 1.17, SAA 1.23); PROXY, not TVP-specific |
| Soy protein isolate (174276), for reference | 88.3 | 26 | 48 | 77 | 60 | 25 | 88 | 36 | 13 | 46 | none (SAA 1.12) |
| Lentils, raw (brown/green type) (172420) | 24.6 | 28 | 43 | 73 | 70 | 22 | 76 | 36 | 9 | 50 | SAA 0.98 (borderline) |
| Lentils, pink or red, raw (174284) | 23.9 | 29 | 45 | 76 | 73 | 23 | 79 | 37 | 9 | 52 | none (SAA 1.02, borderline) |
| Chickpeas, mature, raw (173756) | 20.5 | 28 | 43 | 72 | 67 | 27 | 79 | 37 | 10 | 42 | none (Val 1.08) |
| Beans, white, mature, raw (175202) | 23.4 | 28 | 44 | 80 | 69 | 26 | 82 | 42 | 12 | 52 | none (SAA 1.18) — FLAG: identical to kidney bean row |
| Beans, kidney, all types, raw (175193) | 23.6 | 28 | 44 | 80 | 69 | 26 | 82 | 42 | 12 | 52 | none (SAA 1.18) |
| Peas, green, split, mature, raw (172428) = dried peas | 23.1 | 25 | 43 | 73 | 77 | 20 | 72 | 35 | 7 | 45 | SAA 0.92 |
| Lupins, mature seeds, raw (172423) | 36.2 | 28 | 45 | 76 | 53 | 19 | 77 | 37 | 8 | 42 | SAA 0.88 |
| Peanuts, all types, raw (172430) | 25.8 | 25 | 35 | 65 | 36 | 25 | 94 | 34 | 10 | 42 | Lys 0.80 |
| Peanut butter, smooth, with salt (174266) | 22.2 | 25 | 28 | 70 | 31 | 22 | 91 | 24 | 10 | 35 | Lys 0.68 (also Val 0.90) |
| Edamame, frozen, unprepared (168410) | 11.2 | 22 | 25 | 63 | 63 | 22 | 69 | 28 | 11 | 27 | Val 0.70, Ile 0.84 — FLAG: implausibly low Ile/Val vs soybeans (54/56); likely imputed or analytic artefact, do not trust |
| Peas, green (garden), raw (170419) | 5.4 | 20 | 36 | 60 | 58 | 21 | 58 | 37 | 7 | 43 | SAA 0.96 (Leu 1.01) |
| Seeds, hemp seed, hulled (170148) | 31.6 | 31 | 41 | 69 | 40 | 51 | 86 | 40 | 12 | 56 | Lys 0.90 |
| Pumpkin seed kernels, dried (170556) | 30.2 | 26 | 42 | 80 | 41 | 31 | 93 | 33 | 19 | 52 | Lys 0.91 |
| Almonds, blanched (170568) | 21.4 | 28 | 33 | 69 | 28 | 22 | 79 | 32 | 9 | 38 | Lys 0.63 |
| Sunflower seed kernels, dried (170562) | 20.8 | 30 | 55 | 80 | 45 | 45 | 88 | 45 | 17 | 63 | Lys 1.00 (borderline) |
| Pistachios, raw (170184) | 20.2 | 25 | 45 | 80 | 56 | 32 | 79 | 34 | 12 | 62 | none (Lys 1.25) |
| Chia seeds, dried (170554) | 16.5 | 32 | 48 | 83 | 59 | 60 | 95 | 43 | 26 | 57 | none (Lys 1.30) |
| Flaxseed (169414) | 18.3 | 26 | 49 | 68 | 47 | 39 | 79 | 42 | 16 | 59 | none (Lys 1.05, borderline) |
| Cashews, raw (170162) | 18.2 | 25 | 43 | 81 | 51 | 41 | 80 | 38 | 16 | 60 | none (Lys 1.13) |
| Walnuts, English (170187) | 15.2 | 26 | 41 | 77 | 28 | 29 | 73 | 39 | 11 | 49 | Lys 0.62 |
| Sesame seeds, whole, dried (170150) | 17.7 | 29 | 43 | 77 | 32 | 53 | 95 | 42 | 22 | 56 | Lys 0.71 |
| Spirulina, dried (170495) | 57.5 | 19 | 56 | 86 | 53 | 32 | 93 | 52 | 16 | 61 | none (Lys 1.17) |
| Yeast, baker's, active dry (175043) — PROXY for nutritional yeast | 40.4 | 23 | 47 | 72 | 81 | 27 | 71 | 49 | 13 | 57 | none (Leu 1.22, SAA 1.23); PROXY only |

- Method/data: [USDA FDC SR Legacy 2018-04](https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip); lentil spot-check via API: Trp 0.221, Thr 0.882, Ile 1.06, Leu 1.79, Lys 1.72, Met 0.21, Cys 0.322, Phe 1.22, Tyr 0.658, Val 1.22, His 0.693 g/100 g, protein 24.6 g/100 g (matches CSV) — [USDA FDC API, fdcId 172420](https://api.nal.usda.gov/fdc/v1/foods/search?query=lentils%20raw&dataType=SR%20Legacy&api_key=DEMO_KEY&pageSize=1).
- WHO 2007 adult pattern (mg/g protein): His 15, Ile 30, Leu 59, Lys 45, SAA 22, AAA 38, Thr 23, Trp 6, Val 39 — [WHO TRS 935, Table 23](https://lenews.ch/wp-content/uploads/2017/03/WHO_TRS_935_eng_Protein.pdf).
- Pea isolate (Gorissen et al. 2018, Table 1, values are g per 100 g raw material, Trp NOT measured; protein 80%): His 1.6, Ile 2.3, Leu 5.7, Lys 4.7, Met 0.3, Phe 3.7, Thr 2.5, Val 2.7, Cys 0.2, Tyr 2.6. Dividing by 0.80 gives approx mg/g protein: His 20, Ile 29, Leu 71, Lys 59, Met 4, Cys 2.5, Phe 46, Tyr 32, Thr 31, Val 34 (my conversion, from the fetch tool's reading of the table) — [Gorissen 2018, PMC6245118](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6245118/). Met 0.3 g/100 g (4 mg/g protein) looks implausibly low versus whole pea (~10 mg/g); treat Met/SAA from this table as suspect, and I did not open the original table myself to confirm column units.
- Same paper, lupin isolate (protein 61%): His 20, Ile 25, Leu 52, Lys 34, Met 3, Phe 30, Thr 26, Val 23 mg/g protein (derived, same caveats). Hemp isolate (protein 51%): His 22, Ile 20, Leu 51, Lys 27, Met 20, Phe 35, Thr 25, Val 25 (derived). Soy isolate: protein content range 61-91%, no single value, not converted — [PMC6245118](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6245118/). These are protein isolates and are lower in Lys than the USDA whole-seed values for hemp (40) — an isolate vs whole-seed difference, not a conflict.

### Inferences
- Pea protein isolate: only Gorissen (without Trp) retrieved. For a Trp value, the closest I have is whole split peas from USDA (7 mg/g); not isolate-specific. Recommended: use Gorissen-type values for His/Ile/Leu/Lys/Phe/Thr/Val, USDA split-pea for Trp, and mark SAA as unverified (needs another source, e.g. Herreman Table S or a manufacturer's analysis).
- Isolates such as soy isolate (USDA 174276) are consistent with Herreman soy DIAA ratios (soy limiting Met+Cys, Trp ratio high).

### Gaps
- Textured soy protein (TVP): no USDA SR Legacy entry; only the defatted soy flour proxy (same starting material, 51-52% protein) is reported. A TVP-specific analysis was not found.
- Pea protein isolate: no full EAA profile incl. Trp and a reliable SAA found within budget.
- Nutritional yeast (deactivated Saccharomyces): no source retrieved; baker's yeast is a proxy only (likely close but not verified; fortified products and different strains vary).
- Not consulted (time/tool limits): FAO 2013 FNP 92 Annex tables, FAO/INFOODS, SFK/BLS, Hughes 2011 — their absence means the USDA values are single-source for most foods except where noted below.
- Nuts/seeds: USDA values for several are older and some may be calculated from similar foods; I could not check the derivation codes (food_nutrient_derivation.csv was available but not examined).

## 2. Where sources disagree (Trp, SAA in legumes) — range and recommended value

### Takeaway
Legume SAA and Trp differ across sources by roughly a factor of 2 (cultivar, hydrolysis/oxidation method for Met+Cys, and Trp alkaline hydrolysis). I recommend the USDA SR value as the default (a single, traceable dataset), reporting the ranges below as uncertainty.

### Cited Findings
- Lentil cultivars (six Indian cultivars, 1985): per 100 g protein, cystine 0.62-0.70 g, methionine 0.47-0.70 g, tryptophan 0.82-0.90 g; sulphur amino acid chemical scores about 19-25 — [FAO AGRIS record on lentil varieties](https://agris.fao.org/search/ar/records/6471bc7277fd37171a6dd9c5) (as reported in a search summary; I did not open the paper). Implied SAA about 11-14 mg/g protein and Trp 8.2-9.0 mg/g. USDA lentils: Met 8.5 + Cys 13.1 = 21.6 mg/g SAA, Trp 9.0 mg/g. So USDA SAA is nearly double the cultivar study (Cys especially).
- Protein isolates, normalized profile (percent of protein): chickpea Met 1.50 + Cys 1.17 (about 27 mg/g SAA), lentil Met 0.95 + Cys 0.77 (about 17 mg/g), Trp about 0.83 (8.3 mg/g) for both — [PMC4486593 Table 2](https://pmc.ncbi.nlm.nih.gov/articles/PMC4486593/table/Tab2) (from search snippet; I did not open the table, isolates not whole seeds).
- Trp in legume flours (Comai et al. 2007, Food Chem): soybean 502 mg/100 g flour vs pea 192 mg/100 g; chickpea has high protein-bound Trp — [Search result summary, Food Chemistry 2007](https://research.unipd.it/handle/11577/2441960). Per g protein this is roughly soy 13 and pea 8-9 mg/g if protein is about 38 and 22 g/100 g (my inference); USDA gives soy 16 and split pea 7.
- USDA-based SAA and Trp (mg/g protein): lentils 22/9, chickpeas 27/10, kidney bean 26/12, split pea 20/7, lupin 19/8, soybean 33/16. Herreman 2020 DIAA ratios (0.5-3 y pattern) agree on the qualitative picture: soy Trp ratio 132 vs pea 77, SAA soy 91 vs pea 70 — [Herreman et al. 2020, PMC7590266](https://pmc.ncbi.nlm.nih.gov/articles/PMC7590266/).
- A 2024 MDPI study reported chickpea and several other legumes with no limiting AA, whereas some lentil samples had only moderate quality (qualitative only) — [Foods 13:3528](https://mdpi-res.com/d_attachment/foods/foods-13-03528/article_deploy/foods-13-03528.pdf) (search snippet).

### Inferences
- Recommended single values: lentil SAA 22 (range about 11-22; likely 15-22), lupin SAA 19, pea SAA 20 (range about 6-20 incl. Gorissen), chickpea SAA 27 (range about 17-27), Trp legumes 7-12 (all above the 6 mg/g adult requirement in every source seen, so Trp is not limiting in legumes under the WHO 2007 adult pattern).
- SAA is the practical limiting AA for legumes in all sources (lentils borderline, peas/lupin/tofu below 1). Lys is not limiting in legumes (ratio 1.1-1.7).

### Gaps
- I could not open FAO 2013 / INFOODS / SFK / BLS tables, so no independent whole-food replication of USDA values for nuts and seeds was obtained.
- The lentil and isolate ranges above come from search summaries, not from my reading of the original tables.

## 3. Limiting amino acids and PDCAAS/DIAAS

### Takeaway
Against the WHO 2007 adult pattern the limiting AA is: Lys for nuts and most seeds (almond 0.63, walnut 0.62, sesame 0.71, peanut 0.80, peanut butter 0.68, pumpkin 0.91, hemp 0.90, sunflower about 1.0), SAA for lupins, split peas, tofu, tempeh and borderline in lentils; no limiting AA (chemical score >= 1) in soybeans, chickpeas, kidney/white beans, pistachio, chia, cashew, spirulina, nutritional-yeast proxy. Published PDCAAS/DIAAS values exist only for some foods and use mostly child (0.5-3 y or 2-5 y) patterns, so they are not comparable with my adult ratios.

### Cited Findings (PDCAAS/DIAAS as published)
- Herreman 2020 DIAAS (0.5-3 y pattern, mean of datasets): soy 91 (limiting Met+Cys), pea 70 (Met+Cys), lupin 68 (Met+Cys), fava bean 55 (Met+Cys), hemp 54 (Lys), potato 100 — [Herreman et al. 2020, PMC7590266](https://pmc.ncbi.nlm.nih.gov/articles/PMC7590266/). Soy DIAA ratios: His 119, Ile 124, Leu 102, Lys 96, SAA 91, AAA 147, Thr 105, Trp 132, Val 95; pea: His 99, Ile 101, Leu 87, Lys 110, SAA 70, AAA 116, Thr 94, Trp 77, Val 83.
- Compilation (secondary: Wikipedia citing Phillips 2017, Rutherfurd 2015, Ertl 2016, Mathai 2017, Boye 2012, Suarez Lopez 2006) — [Wikipedia DIAAS](https://en.wikipedia.org/wiki/Digestible_Indispensable_Amino_Acid_Score), [Wikipedia PDCAAS](https://en.wikipedia.org/wiki/Protein_digestibility_corrected_amino_acid_score):
  - Soy protein isolate PDCAAS 0.98 / DIAAS 0.898 (limiting SAA); soybean 1.000 / 0.996 (Ertl 2016); soya flour 1.00 / 1.05 (Mathai 2017); tofu PDCAAS 0.70 / DIAAS 0.97 (Phillips 2017; the PDCAAS/DIAAS inversion looks odd, treat with caution).
  - Pea protein concentrate PDCAAS 0.893 / DIAAS 0.822 (limiting SAA); cooked peas 0.597 / 0.579; peas 0.782 / 0.647 (Ertl 2016).
  - Chickpeas PDCAAS 0.74 / DIAAS 0.83 (SAA); chickpeas and edamame PDCAAS 0.78 (Suarez Lopez 2006, via Wikipedia); black beans 0.75; cooked kidney beans 0.648 / 0.588; fava 0.55 (Herreman).
  - Roasted peanuts PDCAAS 0.509 / DIAAS 0.434; peanuts PDCAAS 0.52 (older); almonds 0.39 / 0.40 (Lys).
- WHO 2007 adult chemical scores computed by me from USDA data (see section 1 table). Note child patterns (e.g. 0.5-3 y: His 20, Ile 32, Leu 66, Lys 57, SAA 27, AAA 52, Thr 31, Trp 8.5, Val 43 mg/g) are stricter, which is why Lys/SAA/Trp appear more limiting in Herreman than in my adult ratios.

### Inferences
- Peanut/almond DIAAS 0.40-0.43 fits Lys as limiting plus low digestibility; adult chemical score for peanut Lys 0.80 and almond 0.63 is consistent in direction.
- Soy products: SAA limiting is consistent across USDA (tofu 0.71, tempeh 0.82) and Herreman/Phillips.

### Gaps
- No PDCAAS/DIAAS found for: lentils, white beans, lupins (apart from Herreman DIAAS 68), seeds (hemp apart), pistachio, cashew, walnut, sesame, chia, flax, pumpkin, sunflower, spirulina, nutritional yeast, tempeh, textured soy protein (soya flour used as closest). Not estimated.
- Wikipedia is a secondary compilation; primary papers (Rutherfurd 2015 J Nutr 145:372, Phillips 2017, Ertl 2016, Mathai 2017) were not opened.
- Digestibility-adjusted scores for the foods in this list were not computed or estimated by me.
