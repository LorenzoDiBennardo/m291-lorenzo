// S12-AV1 : anti-rebond (debounce) pour le champ de recherche.
//
// Problème : l'événement "input" part à chaque touche. Taper 10 lettres en 2 secondes
// relance 10 fois le filtre et le re-rendu du DOM, ce qui peut saccader l'interface sur smartphone.
//
// Principe : à chaque appel, on annule le minuteur précédent (clearTimeout) puis on en relance
// un nouveau (setTimeout). L'action ne s'exécute que si plus rien n'arrive pendant attenteMs.

function debounce(action, attenteMs) {
  let minuteur = null;

  return function () {
    const contexte = this;
    const args = arguments;

    clearTimeout(minuteur);                      // on annule l'attente en cours
    minuteur = setTimeout(function () {          // on relance une attente de attenteMs
      action.apply(contexte, args);
    }, attenteMs);
  };
}

// Utilisation dans app.js :
//   champRecherche.addEventListener("input", debounce(appliquerFiltres, 300));

// Permet de tester le fichier avec Node (sans effet dans le navigateur).
if (typeof module !== "undefined" && module.exports) {
  module.exports = debounce;
}
