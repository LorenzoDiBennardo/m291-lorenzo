# Données de MaillotGallery : documentation

Ce dossier regroupe la base de données de la vitrine et les outils qui garantissent qu'elle reste correcte.

| Fichier | Rôle |
|---|---|
| `../data.json` | La base : 32 fiches de maillots (atelier e3-2) |
| `schema.json` | Le schéma JSON Schema draft-07 qui valide la base (atelier S10-AV1) |
| `data-avance.json` | Un échantillon de 5 fiches avec coordonnées GPS et horaires (atelier S10-AV2) |
| `../.vscode/settings.json` | Branche le schéma sur les fichiers JSON dans VS Code |

## 1. Le modèle de données

Chaque fiche est un objet avec les clés ci-dessous. Les quatre premières sont obligatoires, les autres sont facultatives. Toute clé qui n'est pas dans cette liste est refusée.

| Clé | Type | Obligatoire | Règle |
|---|---|---|---|
| `id` | nombre entier | oui | 1 ou plus, unique |
| `titre` | texte | oui | de 3 à 80 caractères |
| `commune` | texte | oui | ville du club (capitale pour une sélection) |
| `prixMoyen` | nombre | oui | 0 ou plus, en CHF, indicatif |
| `description` | texte | non | de 10 à 300 caractères |
| `estOuvert` | booléen | non | true si la fiche est publiée, false si elle est en préparation |
| `tags` | tableau de textes | non | au moins 1, sans doublon |
| `image` | texte | non | chemin du type `images/nom-du-fichier.jpg` |
| `club` | texte | non | nom du club ou de la sélection |
| `saison` | texte | non | `2023/24` ou `2022` |
| `annee` | nombre entier | non | première année de la saison, pour le filtre « depuis 2010 » |
| `type` | texte | non | `domicile` ou `exterieur` |
| `sponsor` | texte | non | sponsor principal, ou `Aucun` |
| `equipementier` | texte | non | marque du maillot |
| `lieu` | texte | non | lieu auquel se rapportent coordonnées et horaires |
| `coordonnees` | objet | non | `{ "lat": ..., "lng": ... }` |
| `horaires` | objet | non | un tableau de plages pour chacun des 7 jours |

Les huit premières clés (`id` à `image`) suivent la structure de l'exemple du cours. Les six suivantes (`club` à `equipementier`) sont propres à la vitrine de maillots et servent aux filtres.

## 2. Pourquoi ce schéma attrape les fautes

Le schéma interdit les clés inconnues avec `additionalProperties: false`. Si quelqu'un écrit `prix` au lieu de `prixMoyen`, deux choses se passent : `prix` est refusée comme clé inconnue, et `prixMoyen` est signalée comme manquante. L'erreur est donc visible tout de suite, au lieu de faire planter l'application plus tard sans message clair.

## 3. Comment valider

Dans VS Code, c'est automatique. Le fichier `.vscode/settings.json` relie `data.json` et `data/data-avance.json` au schéma. Ouvre le dossier du projet dans VS Code : une faute de clé, de type ou de valeur est soulignée en rouge, avec le message d'erreur au survol. Aucune extension à installer.

En ligne, tu peux aussi copier le contenu de `schema.json` et celui de `data.json` dans un validateur JSON Schema en ligne (par exemple jsonschemavalidator.net), en choisissant la spécification draft-07.

Pour vérifier que `data.json` se charge dans le navigateur (contre-épreuve de l'atelier e3-2), ouvre la page avec Live Server, appuie sur F12, puis colle dans la console :

```js
fetch("data.json").then(r => r.json()).then(d => console.log(d.length + " fiches", d[0]));
```

Si le JSON est correct, la console affiche `32 fiches` et la première fiche. En cas d'erreur de syntaxe, elle affiche `Unexpected token` avec la position du problème.

## 4. Tests réalisés

J'ai validé les deux fichiers de données avec un validateur JSON Schema draft-07 : `data.json` (32 fiches) et `data/data-avance.json` (5 fiches) ont zéro erreur.

Contre-épreuve : voici des fiches volontairement fausses et ce que le schéma répond.

| Faute introduite | Résultat | Message |
|---|---|---|
| `prix` au lieu de `prixMoyen` | refusée | `prixMoyen` is a required property |
| `prixMoyen` écrit en texte (`"12"`) | refusée | is not of type number |
| `prixMoyen` négatif | refusée | is less than the minimum of 0 |
| `titre` manquant | refusée | `titre` is a required property |
| `id` égal à 0 | refusée | is less than the minimum of 1 |
| `id` écrit en texte | refusée | is not of type integer |
| deux tags identiques | refusée | has non-unique elements |
| `estOuvert` écrit `"oui"` | refusée | is not of type boolean |
| image hors du dossier `images/` | refusée | does not match the pattern |
| `type` inconnu | refusée | is not one of domicile, exterieur |
| coordonnées à Paris | refusée | is greater than the maximum of 47.5 |
| coordonnées sans `lng` | refusée | `lng` is a required property |
| heure `25:00` | refusée | does not match the pattern |
| jour manquant dans `horaires` | refusée | `mardi` is a required property |
| tableau vide | refusée | too short |

## 5. Ce que le schéma ne peut pas vérifier

Certaines règles sortent du cadre de JSON Schema. Je les ai contrôlées à part sur `data.json` :

- les `id` sont uniques et vont de 1 à 32 sans trou,
- les `titre` sont tous différents,
- chaque fiche a une image différente,
- dans `data-avance.json`, chaque heure d'ouverture est avant l'heure de fermeture et les plages d'un même jour ne se chevauchent pas.

Quand tu ajoutes des fiches, vérifie ces points à la main : le schéma ne te préviendra pas si deux fiches ont le même `id`.

## 6. Le fichier avancé : coordonnées et horaires

`data-avance.json` reprend le même modèle et ajoute deux sous-objets.

`coordonnees` donne la position GPS pour une future carte interactive :

```json
"coordonnees": { "lat": 46.5197, "lng": 6.6323 }
```

Le schéma n'accepte que des valeurs dans une boîte qui couvre la Suisse romande (latitude de 45,8 à 47,5 et longitude de 5,9 à 8,5). Les points de l'échantillon sont les centres de Genève, Lausanne, Sion, Neuchâtel et Yverdon-les-Bains, donnés de façon approximative.

`horaires` décrit l'ouverture de chaque jour par plages. Un jour avec une liste vide est fermé, et un jour avec deux plages a une pause de midi :

```json
"horaires": {
  "lundi": [],
  "mardi": [
    { "ouverture": "09:00", "fermeture": "12:00" },
    { "ouverture": "13:30", "fermeture": "18:00" }
  ]
}
```

Les horaires de l'échantillon sont des exemples inventés pour l'exercice, pas les vrais horaires des boutiques.

## 7. Ce qui reste à faire pour la suite

- Ajouter les photos manquantes dans `images/` : 31 fiches sur 32 ont leur photo. Il manque France 2018 (`images/france-2018.jpg`), qui affiche le dessin de secours.
- Si tu ajoutes des fiches, garde les `id` uniques et relance la validation dans VS Code.
