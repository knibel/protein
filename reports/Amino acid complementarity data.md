# Scoring amino acid complements: a hard-codable spec

**Use the FAO 2013 "older child, adolescent, adult" pattern (His 16, Ile 30, Leu 61, Lys 48, SAA 23, AAA 41, Thr 25, Trp 6.6, Val 40 mg/g protein) and score every pairing by pooling amino acids, not scores: mix on a protein-weight basis, divide the pooled mg/g by the pattern, take the minimum.** This is the method TRS 935 and FAO 2013 prescribe ([FAO FNP 92](https://www.fao.org/3/i3124e/i3124e.pdf)). For two foods the mixture score is a concave, piecewise-linear function of the protein share, so the optimal mix has an exact closed form (section 1). The consolidated table in section 2 covers 56 USDA-derived rows. Only about 20 are usable as-is. The rest are proxies, imputed or inconsistent, and one data-handling issue (N-factor basis for legumes and nuts, section 2) must be fixed before any number is hard-coded. Only **pea + rice** has a fully verified result: Herreman 2020 gives a DIAAS of 84 at 59 % pea and 41 % rice protein, and its published per-amino-acid ratios reproduce that optimum exactly by hand ([Herreman 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7590266/)). Every other pairing in the app is "computed", not "published". Complementarity should be framed as a useful aid: DGE and consumer-advice sources say combining over the day is enough, and the one direct human test found no 24-h difference ([Arentson-Lantz 2024](https://researchexperts.utmb.edu/en/publications/meals-containing-equivalent-total-protein-from-foods-providing-co/)). Section 7 lists what remains unverified.

## 1. Reference pattern and the formulas, including the optimal two-food mix

### Pattern choice

FAO 2013 Table 5 (verified against the primary PDF) gives three patterns, in the order His / Ile / Leu / Lys / SAA / AAA / Thr / Trp / Val ([FAO FNP 92](https://www.fao.org/3/i3124e/i3124e.pdf)). Infants 0-6 months: 21/55/96/69/33/94/44/17/55. Children 6 months-3 years: 20/32/66/57/27/52/31/8.5/43. Everyone over 3 years: 16/30/61/48/23/41/25/6.6/40. The strict adult maintenance pattern (>18 y: 15/30/59/45/22/38/23/6.0/39) is identical in WHO TRS 935 and FAO 2013 ([WHO TRS 935](https://lenews.ch/wp-content/uploads/2017/03/WHO_TRS_935_eng_Protein.pdf)). Use the FAO >3 y column as the default because FAO itself recommends it for all ages above 3 years, and it is 3-8 % stricter than the adult column. Where TRS 935 and FAO 2013 differ (SAA 24/23, Ile 31/30 for 3-10 y), FAO 2013 corrects TRS 935 calculation errors, so take the FAO numbers. Offer the 0.5-3 y column as a "Kleinkind" mode. Do not use the 1991 pattern ([Frontiers 2024](https://www.frontiersin.org/articles/10.3389/fnut.2024.1437853/full)). The choice moves absolute scores more than rank order: Lys and SAA are the discriminating amino acids in cereal-legume pairs in either pattern, but lentils fall from 96 % (adult-FAO) to 81 % (child) and the "limiting" amino acid of some foods flips (my recomputation from the section 2 data).

### Single food

Let e_i be mg of amino acid i per g protein (N x 6.25), ref_i the pattern, and r_i = e_i / ref_i. The single-food score is S = 100 x min_i r_i, and the limiting amino acid is the argmin. AAS/DIAAS are defined this way, and FAO says DIAAS above 100 should not be truncated for single foods, so that complementing ability stays visible ([FAO FNP 92](https://www.fao.org/3/i3124e/i3124e.pdf)). SAA means Met+Cys and AAA means Phe+Tyr, summed before dividing.

### Mixture

For protein masses m_f (g protein of each food), pool e_i = sum(m_f e_f,i) / sum(m_f), score S = min(100, 100 x min_i e_i/ref_i), and truncate at 100 only for mixtures. Do not average the component scores. FAO's worked Table 2 example (400 g wheat + 100 g pea + 35 g milk powder) yields DIAAS 82 limited by Lys, with ratios 0.82 / 1.26 / 1.10 / 1.45 for Lys / SAA / Thr / Trp ([FAO FNP 92](https://www.fao.org/3/i3124e/i3124e.pdf)). That is a ready-made unit test, but it needs the digestible-amino-acid inputs from FAO Tables 1-2.

### Optimal two-food mix

For focus food A, candidate B and protein share w of A, r_i(w) = w r_A,i + (1-w) r_B,i is linear in w. The score S(w) = 100 min_i r_i(w) is the lower envelope of nine lines, so its maximum is at w = 0, w = 1, or an intersection of two lines. The intersection of amino acids i and j is

w_ij = (r_B,j - r_B,i) / ((r_A,i - r_B,i) - (r_A,j - r_B,j)), valid if the denominator is nonzero and 0 <= w_ij <= 1.

Evaluate S at all candidates (at most 38 points) and keep the best. For the typical cereal (Lys-limited) plus legume (SAA-limited) pair this reduces to i = Lys, j = SAA, provided no third amino acid becomes limiting once all nine are evaluated. This closed form is derived from the linear-mixing rule Herreman uses (DIAA_y = c_1 R_1 + c_2 (1 - R_1)), not quoted from a source, so the unit tests below matter. To convert to food, grams of A = w x P / p_A and grams of B = (1-w) x P / p_B, where p is protein per gram of food as eaten. Always show the ratio as a protein share plus the converted food weights, because protein density differs roughly tenfold between dry and cooked forms. Because the optimum is a corner of a concave function, report the range of w with S >= 0.95 x S_max rather than a single ratio.

### Digestibility

Chemical (amino acid) scores ignore digestibility, so the app must call them "Aminosäurewert (chemisch)", never PDCAAS or DIAAS, unless a correction is applied. FAO's interim advice is to multiply amino acid contents by faecal crude-protein digestibility when ileal data are missing, and true ileal digestibility is preferred ([FAO FNP 92](https://www.fao.org/3/i3124e/i3124e.pdf)). FAO's own examples of true ileal digestibility show why this matters: pea Lys 0.79 and SAA 0.69, wheat Lys 0.82, milk powder Lys 0.95. Cooked or processed foods should use reactive lysine ([Herreman 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7590266/)). The numeric faecal digestibility list in the notes (egg 97, milk 95, wheat 86-91 and so on) is from memory and not usable.

## 2. Consolidated essential amino acid table (mg/g protein, N x 6.25) with confidence

Every row is derived from one source family, USDA FoodData Central SR Legacy (April 2018 release), recomputed from the bulk CSV ([USDA FDC downloads](https://fdc.nal.usda.gov/download-datasets)). Per-food pages are `https://fdc.nal.usda.gov/fdc-app.html#/food-details/<FDC ID>/nutrients`. The cereal, vegetable, dairy and egg rows were converted to a 6.25 basis using USDA's food-specific N factors. The "Limiting (score %)" column is my recomputation against the FAO >3 y pattern, because the legume notes scored against the WHO adult pattern. Confidence: H = consistent with a second independent source (Herreman DIAAS); M = single source, plausible, no flag; L = proxy, suspect, or single flagged value; X = do not use. Where a "Use" note names another row, that is the recommended value.

| Food | FDC ID | His | Ile | Leu | Lys | SAA | AAA | Thr | Trp | Val | Conf. | Limiting (score %) | Note / use |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Rolled oats | 173904 | 20 | 36 | 70 | 45 | 47 | 75 | 27 | 13 | 49 | M | Lys (94) | Herreman oat DIAAS 57, Lys |
| Quinoa | 168874 | 29 | 36 | 59 | 54 | 36 | 61 | 30 | 12 | 42 | M | Leu (97) | Lys matches literature 55 |
| Amaranth | 170682 | 27 | 40 | 61 | 52 | 29 | 60 | 39 | 12 | 47 | M | Leu (100) | A literature PDCAAS of 24-36 % conflicts; digestibility unknown |
| Buckwheat, roasted | 170685 | 23 | 38 | 63 | 51 | 30 | 57 | 38 | 14 | 51 | M | Leu (103) | Literature Lys 61 (+20 %) |
| Spelt | 169745 | 23 | 35 | 69 | 26 | 38 | 71 | 28 | 8 | 44 | M | Lys (54) | |
| Whole-wheat flour | 168893 | 25 | 31 | 63 | 25 | 36 | 68 | 26 | 12 | 40 | M | Lys (52) | Use for wheat bread and pasta; Herreman wheat DIAAS 48 |
| Whole-wheat pasta, cooked | 168910 | 22 | 36 | 64 | 21 | 35 | 71 | 25 | 12 | 40 | L | Lys (44) | Cross-check only |
| Whole-wheat bread, recipe | 172690 | 23 | 37 | 68 | 29 | 38 | 78 | 30 | 15 | 45 | L | Lys (60) | Cross-check only; the toasted entry 172689 (Lys 11) is excluded |
| Wheat germ | 168892 | 26 | 34 | 63 | 59 | 37 | 65 | 39 | 13 | 48 | M | Leu (103) | |
| Brown rice, raw | 169703 | 26 | 42 | 83 | 38 | 35 | 89 | 37 | 13 | 59 | M | Lys (79) | Herreman rice DIAAS 47, Lys |
| Rye grain | 168884 | 17 | 19 | 51 | 26 | 14 | 57 | 26 | 10 | 29 | L | Lys (54) | Ile, SAA, Val implausibly low; no second source |
| Rye flour, dark | 168885 | 14 | 21 | 50 | 20 | 12 | 54 | 29 | 11 | 29 | L | Lys (42) | As rye grain |
| Corn, yellow | 170288 | 30 | 36 | 123 | 28 | 39 | 90 | 38 | 7 | 51 | M | Lys (58) | Herreman corn DIAAS 36 |
| Millet, raw | 169702 | 20 | 39 | 119 | 18 | 37 | 78 | 30 | 10 | 49 | M | Lys (38) | Cooked-millet Lys digestibility only 70 % |
| Broccoli | 170379 | 21 | 28 | 46 | 48 | 23 | 59 | 31 | 12 | 44 | M | Leu (75) | Below the protein filter |
| Spinach | 168462 | 22 | 51 | 78 | 61 | 31 | 83 | 43 | 14 | 56 | M | Lys (127) | Below the protein filter |
| Kale | 168421 | 59 | 60 | 70 | 60 | 23 | 87 | 45 | 12 | 54 | L | SAA (100) | His 59 unconfirmed |
| Brussels sprouts | 170383 | 22 | 39 | 45 | 46 | 16 | n/a | 36 | 11 | 46 | L | SAA (69) | Tyr missing, so AAA unknown |
| Button mushroom | 169251 | 18 | 25 | 39 | 35 | 14 | 42 | 35 | 11 | 75 | X | SAA (61) | Internally inconsistent; non-protein N inflates N x 6.25 |
| Cremini mushroom | 168434 | 27 | 40 | 61 | 101 | 22 | 60 | 45 | 22 | 46 | X | SAA (96) | Lys 101 implausible |
| Whole milk | 171265 | 31 | 53 | 97 | 86 | 33 | 104 | 43 | 13 | 67 | M | SAA (143) | Use as proxy for yoghurt, quark, skyr (flag as proxy) |
| Cottage cheese 1 % | 173417 | 34 | 60 | 105 | 83 | 40 | 109 | 45 | 11 | 63 | L | Val (158) | Proxy for quark; second entry 172182 agrees within ~5 % except Val |
| Yoghurt, plain low-fat | 170886 | 25 | 56 | 103 | 92 | 39 | 107 | 42 | 6 | 84 | X | Trp (91) | Trp 6 and Val 84 imputed; use the milk row |
| Gouda | 171241 | 42 | 53 | 105 | 109 | 40 | 118 | 38 | 14 | 74 | M | Thr (152) | |
| Parmesan | 170848 | 40 | 54 | 99 | 94 | 34 | 112 | 38 | 14 | 70 | M | SAA (148) | |
| Mozzarella, whole milk | 170845 | 24 | 52 | 84 | 44 | 29 | 95 | 45 | 24 | 61 | X | Lys (92) | Looks copied from cheddar |
| Mozzarella, low moisture | 170846 | 38 | 49 | 100 | 104 | 35 | 112 | 39 | 14 | 64 | M | SAA (152) | Recommended mozzarella row |
| Whole egg, raw | 171287 | 25 | 53 | 86 | 73 | 52 | 94 | 44 | 13 | 68 | H | Leu (141) | Herreman egg DIAAS 101 |
| Sweet whey, dried | 171283 | 19 | 57 | 94 | 81 | 39 | 61 | 65 | 16 | 55 | L | His (119) | Not a whey isolate; His-limiting agrees with Herreman whey DIAAS 85 |
| Soybeans, raw | 174270 | 30 | 54 | 91 | 74 | 33 | 100 | 48 | 16 | 56 | H | Val (140) | Herreman soy DIAAS 91 limited by SAA through digestibility |
| Tofu, firm | 172475 | 25 | 49 | 81 | 51 | 16 | 89 | 45 | 14 | 50 | M | SAA (70) | |
| Tempeh | 174272 | 23 | 43 | 70 | 45 | 18 | 77 | 39 | 10 | 45 | M | SAA (78) | |
| Defatted soy flour | 174275 | 25 | 44 | 74 | 61 | 27 | 82 | 40 | 13 | 46 | L | Val (115) | Proxy for TVP, not TVP-specific |
| Soy protein isolate | 174276 | 26 | 48 | 77 | 60 | 25 | 88 | 36 | 13 | 46 | M | SAA (109) | |
| Lentils, brown/green | 172420 | 28 | 43 | 73 | 70 | 22 | 76 | 36 | 9 | 50 | M | SAA (96) | SAA range in literature 11-22; spot-checked via API |
| Lentils, red | 174284 | 29 | 45 | 76 | 73 | 23 | 79 | 37 | 9 | 52 | M | SAA (100) | |
| Chickpeas | 173756 | 28 | 43 | 72 | 67 | 27 | 79 | 37 | 10 | 42 | M | Val (105) | Literature SAA 17-27 |
| White beans | 175202 | 28 | 44 | 80 | 69 | 26 | 82 | 42 | 12 | 52 | L | SAA (113) | Identical to the kidney row, so imputed; use the kidney row |
| Kidney beans | 175193 | 28 | 44 | 80 | 69 | 26 | 82 | 42 | 12 | 52 | M | SAA (113) | Generic "Bohnen" row |
| Dried split peas | 172428 | 25 | 43 | 73 | 77 | 20 | 72 | 35 | 7 | 45 | M | SAA (87) | Herreman pea DIAAS 70 (SAA); range 6-20 incl. isolate |
| Lupins | 172423 | 28 | 45 | 76 | 53 | 19 | 77 | 37 | 8 | 42 | M | SAA (83) | Herreman lupin DIAAS 68 (SAA) |
| Peanuts | 172430 | 25 | 35 | 65 | 36 | 25 | 94 | 34 | 10 | 42 | M | Lys (75) | PDCAAS ~0.5 (secondary) |
| Peanut butter | 174266 | 25 | 28 | 70 | 31 | 22 | 91 | 24 | 10 | 35 | L | Lys (65) | Processed |
| Edamame, frozen | 168410 | 22 | 25 | 63 | 63 | 22 | 69 | 28 | 11 | 27 | X | Val (68) | Ile and Val implausible; use the soybean row |
| Green peas, fresh | 170419 | 20 | 36 | 60 | 58 | 21 | 58 | 37 | 7 | 43 | M | SAA (91) | Only 5.4 g protein per 100 g |
| Hemp seed, hulled | 170148 | 31 | 41 | 69 | 40 | 51 | 86 | 40 | 12 | 56 | M | Lys (83) | Herreman hemp DIAAS 54 (Lys) |
| Pumpkin seeds | 170556 | 26 | 42 | 80 | 41 | 31 | 93 | 33 | 19 | 52 | M | Lys (85) | |
| Almonds | 170568 | 28 | 33 | 69 | 28 | 22 | 79 | 32 | 9 | 38 | M | Lys (58) | DIAAS ~0.40 (secondary) |
| Sunflower seeds | 170562 | 30 | 55 | 80 | 45 | 45 | 88 | 45 | 17 | 63 | M | Lys (94) | |
| Pistachios | 170184 | 25 | 45 | 80 | 56 | 32 | 79 | 34 | 12 | 62 | M | Lys (117) | |
| Chia seeds | 170554 | 32 | 48 | 83 | 59 | 60 | 95 | 43 | 26 | 57 | M | Lys (123) | |
| Flaxseed | 169414 | 26 | 49 | 68 | 47 | 39 | 79 | 42 | 16 | 59 | M | Lys (98) | |
| Cashews | 170162 | 25 | 43 | 81 | 51 | 41 | 80 | 38 | 16 | 60 | M | Lys (106) | |
| Walnuts | 170187 | 26 | 41 | 77 | 28 | 29 | 73 | 39 | 11 | 49 | M | Lys (58) | |
| Sesame | 170150 | 29 | 43 | 77 | 32 | 53 | 95 | 42 | 22 | 56 | M | Lys (67) | Lys-poor, SAA-rich: complements legumes |
| Spirulina | 170495 | 19 | 56 | 86 | 53 | 32 | 93 | 52 | 16 | 61 | L | Lys (110) | Digestibility and non-protein N unquantified |
| Baker's yeast | 175043 | 23 | 47 | 72 | 81 | 27 | 71 | 49 | 13 | 57 | L | SAA (117) | Proxy for nutritional yeast only |

### Disagreements and the recommended value

Where a second source exists, the picture is consistent. Quinoa and amaranth Lys match a literature table (55 and 54.5 versus USDA 54 and 52), buckwheat is 20 % higher in the literature (61 versus 51) ([PMC7056906](https://pmc.ncbi.nlm.nih.gov/articles/PMC7056906/table/T3), snippet only). For legume SAA the spread is large: six lentil cultivars imply SAA of about 11-14 mg/g against USDA's 22 ([FAO AGRIS record](https://agris.fao.org/search/ar/records/6471bc7277fd37171a6dd9c5), summary only), while chickpea isolate normalizes to about 27 and lentil isolate to about 17 ([PMC4486593](https://pmc.ncbi.nlm.nih.gov/articles/PMC4486593/table/Tab2), snippet only). Recommended policy: keep the USDA value as the single traceable default (lentil 22, pea 20, lupin 19, chickpea 27), store the literature range as an uncertainty field, and treat any pair whose rank depends on lentil or pea SAA as soft. Trp in legumes (7-12) is above the 6.6 requirement in every source seen.

Pea protein isolate has no usable row. The Gorissen 2018 isolate table lacks Trp and shows Met of about 4 mg/g protein (after my division of g per 100 g by 0.80), roughly a third of whole pea, which is suspect ([Gorissen 2018](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6245118/)). Until a second source exists, model "Erbsenprotein" with whole-pea values and mark it as a proxy.

**A data-handling problem that affects the legume and nut rows.** The cereal and dairy rows were converted to an N x 6.25 basis, but the legume/nut rows divide by USDA's own protein value without conversion. USDA uses food-specific N factors for several of these foods. From memory, and unverified here, they are about 5.71 for soy, 5.46 for peanut, 5.18 for almond and around 5.3 for several other nuts and seeds. If so, soy, peanut and nut mg/g values are overstated by roughly 9-17 % relative to the FAO pattern (almond Lys 28 would become roughly 23). This is the single biggest accuracy risk in the table. Read `food_protein_conversion_factor.csv` and apply `x factor / 6.25` to every legume, nut and seed row before using the numbers.

## 3. Limiting amino acids by food group

The table's limiting column shows four regularities that hold in every source consulted. Cereals and corn, millet and rye are **Lys-limited** (scores 38-58 %; brown rice 79 %, oats 94 %). Herreman's digestibility-corrected DIAAS agrees: corn 36, rice 47, wheat 48, oat 57, all Lys ([Herreman 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7590266/)). Pseudocereals and wheat germ sit at about 100 % with Leu nominally lowest, so they need no complement chemically. Legumes are **SAA-limited**: lupin 83 %, split pea 87 %, tofu 70 %, tempeh 78 %, lentils borderline at 96-100 %. Soy, chickpea, kidney and white beans have no deficiency on a chemical basis, and Lys is not limiting in any legume (ratio 1.1-1.7 against the adult pattern). Nuts and seeds are **Lys-limited**: walnut and almond 58 %, sesame 67 %, peanut 75 %, hemp 83 %, pumpkin 85 %, sunflower 94 %. Dairy and egg have no limiting amino acid for adults; whey is His-limited. Mariotti and Gardner support the same picture: lysine is well below optimum in grains, sulfur amino acids only very slightly low in legumes, and Trp is sufficient ([Mariotti & Gardner 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC6893534/)).

Digestibility changes the story for a few foods. Soy is chemically complete but DIAAS-limited by SAA (91). Pea sits at 70 and fava at 55 on SAA, hemp at 54 on Lys. Peanut and almond have published PDCAAS/DIAAS around 0.4-0.5, which fits Lys limitation plus poor digestibility, but those numbers come from a Wikipedia compilation and are unverified ([Wikipedia DIAAS](https://en.wikipedia.org/wiki/Digestible_Indispensable_Amino_Acid_Score)). Because Herreman's child pattern is stricter, do not mix its DIAAS figures into adult-pattern displays.

## 4. Verified versus merely computed pairings, with test cases

### Test case 1: pea + rice (verified)

Herreman 2020 reports a maximum DIAAS of **84 at 59 % pea and 41 % rice protein** on the 0.5-3 y pattern, a calculation from mean literature data and not a feeding trial ([Herreman 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7590266/)). The paper's published ratios (percent of the 0.5-3 y pattern) make a clean unit test: pea Lys 110, SAA 70, Trp 77, Val 83, Leu 87, Thr 94; rice Lys 47, SAA 104, Thr 75, Leu 80, Trp 114. Setting Lys equal to SAA gives 47 + 63w = 104 - 34w, so w = 57/97 = **0.588 pea**, and the score is 47 + 63 x 0.588 = **84.0**. I computed this by hand from the notes' figures. Trp (92) and Thr (86) stay above the crossing, and Leu comes out at 84.1, essentially tied, so the pair is limited jointly by Lys, SAA and Leu at the optimum. The test must feed in DIAA ratios as given, not USDA chemical data. Run on the USDA rows in section 2 (my script, child pattern), the same pair gives about 101 at roughly 51 % pea, with SAA and Lys crossing, and the FAO >3 y pattern gives a mixture above 100. The gap to 84 is the digestibility and data-source difference, not a code error. State this in the test comment, so nobody "fixes" it.

### Test case 2: the other Herreman mixtures

The notes carry these published optima (0.5-3 y pattern, protein-weight shares): pea/wheat 60/40 gives 85; soy/wheat 90/10 gives 90; soy/oat 90/10 gives 92; soy/canola 85/15 gives 92; corn/soy 15/85 gives 88; canola/pea 35/65 gives 84; fava/rapeseed 55/45 gives 82; oat/lupin 7/93 gives 76; fava/corn 75/25 gives only 64; wheat/potato 30/70, corn/potato 25/75 and lupin/potato 30/70 reach 100 ([Herreman 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7590266/)). Only the Lys and SAA ratios of the single foods are in the notes, so partial hand checks are possible. Pea/wheat from Lys alone gives 48 + 62w at w = 0.60, which is 85.2, matching the published 85, but the Lys/SAA crossing for these two foods would sit near 66 % pea with a score near 89. That implies a third amino acid, probably Trp, caps the mix, or that the table's "60/40" is not the optimum. The notes cannot settle which, so do not use pea/wheat as a strict test until Table 3 is read directly. Soy/wheat 90/10 gives Lys 91.2 and SAA 94.6 from the published ratios, a minimum of 91 against the published 90, within rounding. Table 3 values for fava/corn and the potato mixtures need the full per-amino-acid inputs from the supplementary tables, which the notes could not open. Plan the test suite as: the pea+rice case (exact), soy/wheat and pea/wheat (within about 1 point after the full Herreman inputs are loaded), a food paired with itself (gain 0), and the FAO Table 2 wheat+pea+milk mixture (DIAAS 82, Lys-limited).

### Everything else is computed

No source supplies a combined score for rice+beans, hummus, peanut+wheat, corn+beans or soy+rice. Hoffman and Falvo 2004 gives single-food PDCAAS only (black beans 0.75, peanuts 0.52, wheat gluten 0.25) and contains no combinations ([PMC3905294](https://pmc.ncbi.nlm.nih.gov/articles/PMC3905294/)). The only other quantified blends are a pig study of cooked pulses and cereals (Han 2021: mung bean DIAAS 93 and millet 22 give a blend of 66, adzuki 78 and adlay 16 give 51, so complementation is real but incomplete; summary only, [PMC8541063](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8541063/)) and Gorissen's finding that 50/50 blends need roughly 10-90 % more protein, against 2-4 times for single plant sources ([Gorissen 2018](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6245118/)). The German tradition of biological value (beans + corn at 1:1 gives BW 99) is a rat nitrogen-retention measure from a poorly sourced document and should not appear as an amino acid score ([derstandard.at](https://images.derstandard.at/20071115/Protein.pdf)). The app should label its own results "berechnet", not "belegt".

For orientation, my computation on the section 2 rows (FAO >3 y pattern, chemical score, mixture capped at 100) gives these best-mix results. Lentil + rice reaches about 118 uncapped at 59 % lentil protein. Pea + rice reaches about 120 at 50 %. Kidney bean + corn is about 125 at 78 %. Chickpea + sesame is about 116 at 68 %. Lupin + wheat is only about 98 at 79 % lupin, because lupin's Lys is only 53. Tofu + rice is about 97, limited by Lys. Peanut + wheat never improves on peanut alone, since both are Lys-limited. Peanut + soy and almond + soy reach the soy score (soy supplies Lys), which is the "partner is carrying the mix" case. Pea + corn is capped near 106 by Trp. These support the vProtein study's point that many non-classic pairs also work, so the ranking should not hard-code "Getreide + Hülsenfrüchte" ([PMC3081312](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3081312/), summary only). Treat all of these as sanity checks for the code, not as claims.

## 5. Ranking, thresholds and German wording

### Ranking rules (design proposals, not published standards)

Each rule below is my design choice from the notes' suggestions and must be tuned against real output. First, **filter candidates** to foods with at least about 5 g protein per 100 g as eaten, so oils, sugars, most vegetables and drinks drop out. A partner with trivial protein can show a perfect per-gram profile and still contribute nothing at a real portion; Quarks makes the same point about egg + potato (BW 136 but about 2 % protein) ([Quarks](https://www.quarks.de/?p=18763), summary only). Second, **compute S\*(A,B)** with the closed form, capped at 100, together with w\*, the gain G = S\* - S_A, and the partner's ratio on A's limiting amino acid. Third, **rank by G, then S\*, then plausibility of w\***: flag w\* below 10 % or above 90 % as "kaum eine Kombination" and the Lys/SAA "supplier" role (r_B,lim(A) >= 1) as the explanation line. FAO states that a food above 100 can complement lower-quality proteins, which is the basis for this rule ([FAO FNP 92](https://www.fao.org/3/i3124e/i3124e.pdf)). Fourth, **treat score differences under about 5 points as ties**, since TRS 935 notes up to 50 % inter-individual variability in biological value and poor reproducibility.

Suggested tiers: "ergänzt sehr gut" when G >= 15 and S\* >= 90; "ergänzt gut" when G >= 8 and S\* >= 80; below that, no label. If the chosen food already scores >= 100 (soy, egg, dairy, kidney beans), show "braucht keine Ergänzung" and invert the list to what it can complement. Do not use Herreman's DIAAS bands (<75 no claim, 75-99 high, >=100 excellent) for chemical scores ([Herreman 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7590266/)). Show two ratios: the theoretical optimum and the score at a realistic portion ratio, because portion sizes bound w. Mariotti and Gardner model 40 % of protein from legumes, nuts and seeds, and the pea+rice optimum is near 59:41 ([PMC6893534](https://pmc.ncbi.nlm.nih.gov/articles/PMC6893534/)). The score is flat near the optimum, so give the 95 % range.

### German wording and disclaimers

Use "Aminosäurewert (chemisch, pro g Eiweiß, bezogen auf das FAO-Referenzmuster 2013)" as the metric name, "limitierende Aminosäure", "Aminosäuremuster" (pick one spelling; "Aminosäurenmuster" is also in use), "schwefelhaltige Aminosäuren" for Met+Cys, "aromatische Aminosäuren" for Phe+Tyr, "essenzielle Aminosäuren" (DGE usage; "essentielle" is also correct) and "Ergänzungswirkung" for complementarity, the term used in Ernährungs Umschau. Avoid "vollständiges/unvollständiges Protein" as a hard label, "perfekt" and "ersetzt tierisches Eiweiß". Say "ergänzt sich gut" rather than "muss zusammen gegessen werden". Do not call scores PDCAAS or DIAAS unless digestibility is applied. Label each food roh/trocken or gegart: the pattern per gram of protein barely changes with water content, but quantities do.

Proposed disclaimer, German: "Die Werte sind rechnerische Orientierungswerte aus Lebensmitteltabellen (USDA, Stand 2018) und keine individuelle Ernährungsberatung. Es genügt, sich ergänzende Lebensmittel über den Tag zu verteilen; sie müssen nicht in derselben Mahlzeit gegessen werden. Die Bewertung betrifft nur das Aminosäuremuster, nicht Eiweißmenge, Verdaulichkeit, Energie, Mikronährstoffe oder Allergene (Nüsse, Erdnuss, Sesam, Soja, Lupine). Bei Kindern, Schwangeren, Stillenden, älteren Menschen und Erkrankungen (z. B. Nierenerkrankungen) bitte fachliche Beratung einholen. Bei veganer Ernährung ist Vitamin B12 zu ergänzen." The basis is the DGE wording: legumes, nuts, whole grains, oilseeds and potatoes should be "über den Tag verteilt und gezielt kombiniert" ([DGE position 2016](https://www.dge.de/fileadmin/dok/wissenschaft/positionen/EU04_2016_M220-M230_korr.pdf)). The Verbraucherzentrale/Pharmazeutische Zeitung advice that it "reicht, sie über den Tag zu verteilen" ([Pharmazeutische Zeitung](https://www.pharmazeutische-zeitung.de/eiweissbedarf-pflanzlich-decken-darauf-kommt-es-an-162336/)) and the direct crossover trial (n = 9, no difference in muscle protein synthesis between complementary and separate-meal protein; [Arentson-Lantz 2024](https://researchexperts.utmb.edu/en/publications/meals-containing-equivalent-total-protein-from-foods-providing-co/)) support the same line, though the trial is small. The Academy of Nutrition and Dietetics' same-meal statement could not be verified, so do not cite it.

## 6. Recommended build order

Ship version 1 as a chemical score on the FAO >3 y pattern with a "Kleinkind" toggle, using only M/H rows plus clearly labeled proxies. Use the whole-milk row for yoghurt/quark/skyr, the kidney row for all beans, the low-moisture mozzarella, soybean for edamame, and wheat flour for bread and pasta. Exclude mushrooms. Keep a per-food `digestibility` field empty until a verified dataset (for example the Herreman supplementary tables) is loaded, then switch the labels to "DIAAS-Näherung". Store for each food: nine mg/g values, protein g per 100 g as eaten, state (roh/gegart), source ID, confidence, and the literature range for SAA/Lys where the notes give one.

## 7. Unverified items to check before hard-coding

The following list is complete as far as the notes show.

1. **N-factor basis for legume, nut and seed rows** (section 2): the USDA factors quoted here are from memory; the rows must be re-derived on a 6.25 basis.
2. **FAO 2013 patterns:** verified from the primary PDF in the methodology notes. The pairings notes list the same numbers as unverified because the PDF returned HTTP 403 there; the methodology notes win, but re-open the PDF once when writing the constants.
3. **Herreman Table 3 and Table 2:** the pairing optima and per-amino-acid ratios come from the PMC XML via the notes and one search summary. Re-read Tables 2-3 and the supplementary Tables S1-S4 (not accessible so far) before turning any of them into assertions. Pea/wheat 60/40 versus the Lys/SAA crossing is unresolved (section 4).
4. **Which food is first in "pea/wheat 60/40":** assumed to be pea's protein share.
5. **Digestibility data:** the faecal digestibility list (egg 97, wheat 86-91 and so on) is from memory; FAO Tables 1-2 give only wheat, pea and milk powder. A per-food ileal dataset has not been obtained.
6. **Wikipedia-sourced PDCAAS/DIAAS values** (soy 0.98/0.898, pea concentrate 0.893/0.822, chickpea 0.74/0.83, tofu 0.70/0.97 which looks inverted, peanut, almond): secondary and unchecked. The Nutrition & Metabolism 2016 table (pea DIAAS 0.82, rice concentrate 0.37) was seen only in a search summary and conflicts with Herreman's pea 70.
7. **Quinoa/amaranth/buckwheat:** literature Lys figures and the amaranth PDCAAS of 24-36 % (abstract only, conflicts with a chemical score near 100) are unconfirmed; buckwheat differs by 20 %.
8. **Gaps with no source at all:** vital wheat gluten/seitan (USDA has no amino acid data), skyr and quark, whey protein isolate, textured soy protein, nutritional yeast, pea protein isolate Trp and SAA, Brussels sprouts Tyr, and a reliable mushroom profile.
9. **Rye rows** look low in Ile, SAA and Val and have no second source; the kale His 59 and white-bean/edamame rows are flagged; dairy rows are N x 6.38 conversions that should be spot-checked.
10. **Cooked versus raw:** no cooked profiles or reactive-lysine corrections were obtained; the notes' cooked/dry protein-density figures (about 7-9 versus 20-25 g per 100 g) are approximate and from general knowledge.
11. **Guidance sources:** the AND 2016 position wording (paywalled, and a 2015 entry showed a retraction tag that was never resolved), the DGE 2024 reassessment and the Young and Pellett 1994 full text were read only through summaries or not at all. The NCT07151625 claim that 24-hour complementation "has never been tested" is a registry description, not data.
12. **Han 2021, Gorissen 2018 and Mariotti & Gardner 2019 details** were taken from summaries or fetch-tool readings; Gorissen's column units were not confirmed against the original table.
13. **Closed-form w\* and my score recomputations** (section 4 and 5 numbers, the limiting column in section 2) are mine, not published; they need JavaScript unit tests, not a citation.
14. **The app's own food list** was not cross-checked against these rows; every food the app contains but this table lacks (for example, seitan, quark, skyr, protein powders) has no value yet.

## Conclusion

The central insight is that the method is easy and the inputs are the risk. The mixing formula, the pattern and the closed-form optimum are exact and testable, and the pea+rice test reproduces Herreman's published optimum to the decimal, but it only works with digestibility-adjusted ratios. On raw USDA chemistry the same pair scores about 100 at roughly 50:50, so any visible discrepancy with published DIAAS figures is a data-basis difference. The honest label is "chemischer Aminosäurewert", not "Proteinqualität".

For the app this means three decisions up front. First, rank by gain and mixture score while treating differences under about 5 points as ties, because the underlying data are single-source and several rows are proxies. Second, fix the N-factor basis before showing a single legume or nut number. Third, present results as "berechnet" with an over-the-day disclaimer, since neither the official guidance nor the best human trial requires same-meal pairing.
