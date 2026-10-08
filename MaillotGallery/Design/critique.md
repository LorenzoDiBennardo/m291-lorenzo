# Critique comparative et arbitrage - MaillotGallery

Persona : Karim, 24 ans, étudiant, fan de foot et collectionneur. Il utilise l'app surtout sur téléphone, le soir ou en pause. Il compare plusieurs maillots d'affilée, veut revenir vite à la liste et ferme l'onglet si les fiches sont pauvres ou la liste trop longue sans filtre.

Tâche principale : parcourir la liste, filtrer, ouvrir la fiche d'un maillot et lire ses infos (club, saison, sponsor, anecdote).

Pistes comparées (`design/propositions/`) :
- Piste A : éditoriale et sobre
- Piste B : chaleureuse et terroir
- Piste C : moderne et pragmatique

## 1. Matrice d'évaluation (de 1 à 5)

| Critère | Piste A | Piste B | Piste C |
|---|:---:|:---:|:---:|
| Lisibilité | 4 | 4 | 5 |
| Navigation | 3 | 4 | 5 |
| Feedback | 4 | 3 | 5 |
| Cohérence | 5 | 4 | 4 |
| Accessibilité | 4 | 3 | 5 |
| **Total (/25)** | **20** | **18** | **24** |

## 2. Preuves vérifiables

Les ratios de contraste sont calculés avec la formule WCAG 2.x (AA : 4,5 minimum pour le texte courant).

| Critère | Piste A | Piste B | Piste C |
|---|---|---|---|
| Lisibilité | Texte 14,1:1. Infos secondaires en italique gris à 5,7:1, plus discrètes. | Texte 10,9:1. Infos secondaires à 5,6:1. | Texte 21:1, secondaire 12,6:1. Le nom du club fait 56 px en gras sur la fiche. |
| Navigation | Les cartes sont séparées par de simples filets. Rien n'indique qu'elles sont cliquables. Le « Retour » est un texte discret. | Cartes arrondies avec ombre, donc cliquables. Le « Retour » est un texte discret. | Cartes encadrées avec ombre dure. Le « Retour » est dans une barre noire pleine largeur, bien repérable. |
| Feedback | Puce active en bleu nuit plein avec ✕ (15,9:1). Compteur « 2 maillots » et « Réinitialiser les filtres ». | Puce active passant de sauge à terracotta (4,9:1, juste au-dessus du seuil AA). Même compteur et même bouton. | Puce active inversée en noir plein avec ✕ (21:1). Seul bouton d'action en bleu vif, 6,5:1. Même compteur et même bouton. |
| Cohérence | Un seul registre (serif, filets, angles droits) partout. Fidèle à l'ambiance « vitrine sobre » du brief. | Vignettes rondes, cartes arrondies et boutons en pilule : cohérent en interne, mais plus ludique que le brief. | Bordures noires et ombres dures partout : très cohérent en interne, mais plus brut que le brief « sobre ». |
| Accessibilité | Boutons à 15,9:1. Le maillot blanc sur gris perle ne fait que 1,2:1, avec un contour fin. | Bouton blanc sur terracotta à 4,9:1, marge faible. Maillot blanc sur sauge clair à 1,3:1, contour clair. | Tous les contrastes sont au-dessus de 6,5:1. Le maillot blanc (1,2:1 sur gris) est détouré en noir sur 4 px, donc lisible. |

Points communs aux trois pistes : puces et boutons à 48 px de haut minimum (cible tactile confortable sur mobile) et texte courant de 15 px minimum.

## 3. Arbitrage

Nous retenons la Piste C pour son score le plus élevé (24/25) et son adéquation avec les besoins de Karim. Il navigue sur téléphone et compare plusieurs maillots d'affilée. Il lui faut donc des cartes clairement cliquables, un retour à la liste repérable, des filtres actifs impossibles à rater et des maillots bien détourés, même quand ils sont blancs. La Piste C est la seule dont tous les contrastes dépassent 6,5:1.

Nous lui intégrons la sobriété de la Piste A, pour rester fidèles à l'ambiance « vitrine » du brief : fond blanc chaud à la place du blanc pur, et ombres dures remplacées par de simples filets sur les cartes de la liste. Nous agrandissons aussi les vignettes de l'accueil, aujourd'hui trop petites pour des maillots lisibles sur téléphone.

Nous écartons la Piste B : son état actif repose sur la couleur seule, avec un contraste de 4,9:1, et son ambiance « terroir » s'éloigne du brief et de l'usage de Karim.

## 4. Vérification

L'arbitrage repose sur les mesures de la section 2 (ratios de contraste calculés, tailles de cibles tactiles, tailles de texte, états visibles dans les captures). Ces valeurs se contrôlent dans les fichiers de `design/propositions/sources/` ou avec un outil de contraste.
