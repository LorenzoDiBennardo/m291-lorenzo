// MaillotGallery : filtres et recherche de la collection.
// La page reste lisible sans JavaScript : tous les maillots sont visibles par défaut.

(function () {
  "use strict";

  var grille = document.getElementById("grille");
  var cartes = Array.prototype.slice.call(grille.querySelectorAll(".carte-item"));
  var puces = Array.prototype.slice.call(document.querySelectorAll(".puce"));
  var champ = document.getElementById("recherche");
  var compteur = document.getElementById("compteur");
  var vide = document.getElementById("vide");
  var reinit = document.getElementById("reinit");

  function normaliser(texte) {
    return texte.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function actif(nom) {
    return puces.some(function (p) {
      return p.dataset.filtre === nom && p.getAttribute("aria-pressed") === "true";
    });
  }

  function appliquer() {
    var domicile = actif("domicile");
    var exterieur = actif("exterieur");
    var recent = actif("recent");
    var requete = normaliser(champ.value.trim());
    var visibles = 0;

    cartes.forEach(function (c) {
      var type = c.dataset.type;
      var okType = (!domicile && !exterieur) || (domicile && type === "domicile") || (exterieur && type === "exterieur");
      var okAnnee = !recent || Number(c.dataset.annee) >= 2010;
      var okTexte = !requete || normaliser(c.dataset.nom).indexOf(requete) !== -1;
      var montrer = okType && okAnnee && okTexte;
      c.hidden = !montrer;
      if (montrer) visibles += 1;
    });

    compteur.textContent = visibles + (visibles > 1 ? " maillots" : " maillot");
    vide.hidden = visibles !== 0;
  }

  puces.forEach(function (p) {
    p.addEventListener("click", function () {
      var pressed = p.getAttribute("aria-pressed") === "true";
      p.setAttribute("aria-pressed", String(!pressed));
      appliquer();
    });
  });

  champ.addEventListener("input", appliquer);

  champ.form.addEventListener("submit", function (e) {
    e.preventDefault();
  });

  reinit.addEventListener("click", function () {
    puces.forEach(function (p) {
      p.setAttribute("aria-pressed", "false");
    });
    champ.value = "";
    appliquer();
    champ.focus();
  });
})();
