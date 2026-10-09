# e1-6 - Prédis avant de cliquer

| N° | Extrait | Prédiction | Résultat | Pourquoi |
|----|---------|-----------|----------|----------|
| 1 | Afficher | `Bonjour la classe` | BIEN | La machine écrit le texte entre guillemets dans la vitrine `out1`. |
| 2 | Calculer | `7` | BIEN | `a` et `b` sont des **nombres** (pas de guillemets), donc `+` additionne : 4 + 3 = 7. |
| 3 | Compter | `3` | BIEN | `.length` compte les éléments du tableau : pomme, poire, kiwi = 3. |
| 4 | Condition | `suffisant` | BIEN | 5 >= 4 est vrai, donc on passe dans le `if`, pas dans le `else`. |
| 5 | Boucle simple | `1 2 3 ` | BIEN | La boucle tourne 3 fois (i = 1, 2, 3) et colle à chaque fois le nombre + un espace au texte. |
| 6 | Clic | 1, puis 2, puis 3… |  | La boîte `n` est créée **une seule fois** en dehors du clic. Chaque clic fait +1 puis recopie `n` dans la vitrine. |

## À retenir
- Guillemets = texte. Sans guillemets = nombre (ou nom de boîte).
- Une variable déclarée **hors** du `addEventListener` garde sa valeur entre les clics.
