# Tests utilisateurs et audit d'accessibilité - MaillotGallery

Maquette testée : piste C retenue (`design/propositions/piste-c-moderne.png` et `sources/piste-c-moderne.html`), en 3 écrans : accueil, filtres actifs, fiche détaillée.

> Note : les observations de la section 2 sont simulées pour l'exercice. Les mesures de contraste et de clavier de la section 3 sont réelles.

## 1. Scénario de test (1 phrase)

« Trouvez un maillot de domicile récent et consultez sa fiche détaillée pour savoir quel était son sponsor. »

Utilisateur testé : Andry (camarade en binôme croisé)
Observateur·trice : Lorenzo
Appareil utilisé : téléphone
Durée maximale : 5 minutes, chronomètre lancé à la lecture du scénario, observation en silence.

## 2. Observations

### Hésitations observées (regard perdu, clics infructueux)

| Moment | Ce qui s'est passé | Combien de fois |
|---|---|---|
| Accueil, filtres | Andry reste environ 8 secondes sur les trois puces (Domicile, Extérieur, Depuis 2010) avant de toucher « Domicile ». Il a d'abord fait défiler la liste pour chercher un maillot de domicile à la main. | 1 |
| Accueil, liste | Il rapproche le téléphone de son visage pour lire le sponsor sur la vignette du maillot, trop petite à son goût. | 2 |
| Fiche détaillée | Il touche l'image du maillot pour l'agrandir, sans résultat. | 1 |
| Fiche détaillée | Il cherche un moment comment revenir à la liste avant de voir « Retour » dans la barre noire. | 1 |

### Remarques spontanées à voix haute (Think Aloud)

- « Ok, je cherche un maillot de domicile… »
- « Ah, les boutons en haut, c'est des filtres. »
- « Depuis 2010, c'est depuis la saison 2010 ou depuis l'année 2010 ? »
- « Ah, c'est Emirates le sponsor. »
- « Je sais pas trop quoi dire, c'est assez clair. »

Constat : Andry parle peu (5 remarques en tout), ce qui limite ce qu'on apprend sur ses réflexions. Les relances neutres (« Que cherchez-vous en ce moment ? ») ont donné peu de réponses. Les hésitations observées comptent donc plus que ses paroles.

### Temps pour accomplir la tâche

- Temps mesuré : **2 min 40 s** (limite : 5 min)
- Tâche réussie : oui, avec hésitations (sponsor trouvé : Emirates)

## 3. Audit d'accessibilité

### Contraste du bouton principal (WCAG AA : au moins 4,5:1)

| Élément | Couleur du texte | Couleur du fond | Ratio mesuré | Verdict |
|---|---|---|---|---|
| Bouton « Ajouter aux favoris » | #FFFFFF | #1E40FF | **6,5:1** |  conforme AA |

Calcul avec la formule de luminance relative WCAG 2.x. Pour contrôler : un outil de contraste en ligne, ou les couleurs dans `sources/piste-c-moderne.html`.

Autres contrastes de la piste C : texte noir sur blanc 21:1, texte secondaire #333 sur blanc 12,6:1, puce active blanc sur noir 21:1. Tous sont conformes.

### Navigation au clavier (Tab / Entrée), sans souris

Test fait par script sur `piste-c-moderne.html` : 9 éléments atteignables avec Tab.

| Ordre Tab | Élément | Hauteur |
|---|---|---|
| 1 | Champ de recherche | 52 px |
| 2 à 4 | Puces de filtre : Domicile, Extérieur, Depuis 2010 | 48 px |
| 5 à 9 | Les 5 cartes de maillots, dans l'ordre de la liste | 108 px |

-  L'ordre de tabulation suit l'ordre visuel (haut vers bas).
-  Le focus est visible sur chaque élément (contour du navigateur, 1 px).
- Toutes les cibles font au moins 48 px de haut.
-  Le contour de focus est très fin (1 px) sur des cartes déjà bordées de noir. Il se voit peu.
-  La maquette est statique : les cartes ne mènent pas vraiment à la fiche (lien `#`). La navigation complète liste → fiche → retour sera à vérifier sur la vraie version codée.

## 4. Deux correctifs ergonomiques prioritaires

1. **Agrandir les vignettes de maillots de la liste** (de 80 px à environ 110 px) et afficher le sponsor en texte à côté. *Friction observée : Andry a rapproché le téléphone de son visage à deux reprises pour lire le sponsor sur la vignette. Karim, qui regarde surtout sur téléphone, aurait le même problème.*
2. **Clarifier les puces de filtre** : remplacer « Depuis 2010 » par « Saisons 2010 et après » et ajouter un intitulé « Filtrer » devant la rangée. *Friction observée : 8 secondes d'hésitation devant les puces et la question à voix haute « depuis la saison 2010 ou l'année 2010 ? ».*

Amélioration secondaire tirée de l'audit : épaissir le contour de focus clavier à 3 px (bleu #1E40FF, décalage de 2 px).

## 5. Contre-épreuve : les frictions débouchent-elles sur des actions concrètes ?

| Friction observée | Correctif décidé | Fait ? |
|---|---|---|
| Lecture du sponsor difficile sur les petites vignettes | Vignettes à 110 px et sponsor écrit à côté | ☐ à coder |
| Puces de filtre peu claires (8 s d'hésitation) | Libellé « Saisons 2010 et après » et intitulé « Filtrer » | ☐ à coder |
| Image de la fiche touchée sans effet | Pas de correctif prioritaire : à surveiller au prochain test | — |
| Retour à la liste cherché un moment | Pas de correctif prioritaire : la barre noire est déjà visible | — |
