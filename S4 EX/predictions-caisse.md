# e1-8 — La caisse du kiosque

| N° | Scénario | Total affiché | Pourquoi |
|----|----------|---------------|----------|
| 1 | Frites | `06 CHF` | `"6"` est entre guillemets → c'est du **texte**. `0 + "6"` colle les deux au lieu d'additionner → `"06"`. |
| 2 | Frites puis Boisson | `064 CHF` | Même piège : `"06" + "4"` → `"064"`. On attendait 10. |
| 3 | Frites + code `PALEO` + Appliquer | Reste `06 CHF`, ne revient **pas** à 0 | Le script compare avec `"paleo"` en minuscules. `"PALEO" === "paleo"` est faux, donc rien ne se passe. L'affiche et le code ne disent pas la même chose. |
| 4 | Frites, Vider, Frites | `066 CHF` | Vider change seulement **la vitrine** (écran → « 0 CHF ») mais pas **la boîte** `total`, qui vaut encore `"06"`. Au clic suivant : `"06" + "6"` → `"066"`. |

## Les trois pièges (avec les mots du cours)
1. **Texte entre guillemets** : `"6"` et `"4"` sont des chaînes, `+` les colle. Fix : `total + 6` (sans guillemets).
2. **Code promo** : comparaison sensible à la casse. Fix : `code.trim().toUpperCase() === "PALEO"`.
3. **Vider** : met à jour la vitrine mais oublie la boîte. Fix : `total = 0;` puis `montrer();`.

Vérif console : `typeof total` donnait `"string"` après un clic → maintenant `"number"`.
