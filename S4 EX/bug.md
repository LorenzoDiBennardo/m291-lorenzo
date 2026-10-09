# Bug du compteur

Ce que je vois : je clique sur +1, le chiffre à l'écran reste à 0. Dans la console (F12), « n vaut maintenant 1, 2, 3… » s'affiche bien.
Ce que j'attendais : le chiffre à l'écran augmente à chaque clic.
La boîte qui change : `n` (la variable en mémoire), elle passe bien de 0 à 1, 2, 3…
Ce qui ne se met pas à jour : la vitrine, l'élément `<p id="affiche">`. Personne ne recopie `n` vers l'écran.

## Correction
Ajouter **une ligne** dans le clic, juste après `n = n + 1;` :

```js
document.getElementById("affiche").textContent = n;
```

## Explication (comme à un camarade)
La mémoire et l'écran sont deux mondes séparés. L'IA changeait bien la boîte `n`, mais elle oubliait de recopier sa valeur dans la vitrine. C'est comme changer le prix dans la caisse sans changer l'ardoise : le client voit toujours l'ancien prix. La ligne ajoutée fait cette recopie à chaque clic.

## Pour les rapides — Reset
Bouton Reset : il faut remettre **la boîte ET l'écran** à 0. Si on fait seulement `n = 0`, l'écran reste par ex. à 3. Si on change seulement l'écran, au prochain +1 on repart de 4.
