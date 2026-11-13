// MaillotGallery : rendu dynamique de la collection (atelier e3-3).
// 1. index.html contient la liaison : <script src="js/app.js"></script> avant </body>
// 2. Ce code pilote les 4 états de l'interface : Chargement, Succès, Vide, Erreur.
// 3. Pas de framework : DOM pur et asynchrone.

const URL_DONNEES = "./data.json";

// Photos réellement présentes dans le dossier images/.
// Quand tu ajoutes une photo, ajoute son nom ici : sinon la carte affiche un dessin de secours
// (et le navigateur ne cherche pas un fichier qui n'existe pas, donc pas d'erreur 404 en console).
const PHOTOS_PRESENTES = new Set([
  "images/real-madrid-2023-24.jpg",
  "images/fc-barcelone-2014-15.jpg",
  "images/manchester-united-1998-99.jpg",
  "images/psg-2010-11.jpg",
  "images/juventus-2017-18.jpg",
  "images/bresil-1970.jpg",
  "images/argentine-2022.jpg",
  "images/suisse-2022.jpg"
]);

const conteneur = document.getElementById("liste-cartes");
const compteur = document.getElementById("compteur");
const videFiltres = document.getElementById("vide");
const champRecherche = document.getElementById("recherche");
const puces = Array.prototype.slice.call(document.querySelectorAll(".puce"));

let maillots = [];

/* ---------- Outils ---------- */

function echapper(texte) {
  return String(texte)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normaliser(texte) {
  return String(texte).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Couleurs du dessin de secours, déduites du premier tag (la couleur du maillot).
const COULEURS = {
  "blanc": { base: "#ffffff", trim: "#222222" },
  "rouge": { base: "#d32f2f", trim: "#ffffff" },
  "bleu": { base: "#1e4fa3", trim: "#ffffff" },
  "bleu-marine": { base: "#00235a", trim: "#e30613" },
  "bleu-ciel": { base: "#6cabdd", trim: "#ffffff" },
  "jaune": { base: "#f7d117", trim: "#1a1a1a" },
  "orange": { base: "#f28c28", trim: "#1a1a1a" },
  "gris": { base: "#9aa0a6", trim: "#1a1a1a" },
  "blaugrana": { base: "#a50044", trim: "#f2c200", rayures: "#004d98" },
  "rayures": { base: "#ffffff", trim: "#111111", rayures: "#111111" },
  "ciel-et-blanc": { base: "#ffffff", trim: "#111111", rayures: "#75aadb" },
  "bleu-et-noir": { base: "#0a3a82", trim: "#111111", rayures: "#111111" },
  "rouge-et-noir": { base: "#d32f2f", trim: "#111111", rayures: "#111111" },
  "blanc-et-rouge": { base: "#ffffff", trim: "#d32f2f" }
};
const COULEUR_DEFAUT = { base: "#e5e5e5", trim: "#222222" };
const CONTOUR_MAILLOT = "M62 18 L22 42 L6 86 L40 100 L46 84 L46 186 L154 186 L154 84 L160 100 L194 86 L178 42 L138 18 Q100 46 62 18 Z";

function dessinMaillot(m) {
  const c = COULEURS[(m.tags && m.tags[0]) || ""] || COULEUR_DEFAUT;
  let rayures = "";
  if (c.rayures) {
    [24, 68, 112, 156].forEach(function (x) {
      rayures += '<rect x="' + x + '" y="0" width="22" height="200" fill="' + c.rayures + '"/>';
    });
  }
  const id = "d" + m.id;
  return '<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">' +
    '<defs><clipPath id="' + id + '"><path d="' + CONTOUR_MAILLOT + '"/></clipPath></defs>' +
    '<g clip-path="url(#' + id + ')"><rect width="200" height="200" fill="' + c.base + '"/>' + rayures +
    '<path d="M6 86 L40 100" stroke="' + c.trim + '" stroke-width="8"/>' +
    '<path d="M194 86 L160 100" stroke="' + c.trim + '" stroke-width="8"/>' +
    '<path d="M62 18 Q100 46 138 18" fill="none" stroke="' + c.trim + '" stroke-width="8" stroke-linecap="round"/></g>' +
    '<path d="' + CONTOUR_MAILLOT + '" fill="none" stroke="#000" stroke-width="4" stroke-linejoin="round"/></svg>';
}

/* ---------- Affichage des cartes (état Succès) ---------- */

function creerCarte(m) {
  const club = m.club || m.titre;
  const typeTexte = m.type === "exterieur" ? "Extérieur" : "Domicile";
  const saison = m.saison ? "Saison " + m.saison : m.commune;
  const detail = m.sponsor && m.sponsor !== "Aucun"
    ? "Sponsor : " + m.sponsor
    : (m.equipementier ? "Équipementier : " + m.equipementier : m.commune);
  const alt = "Maillot " + typeTexte.toLowerCase() + " de " + club + (m.saison ? ", saison " + m.saison : "");
  const photo = m.image && PHOTOS_PRESENTES.has(m.image)
    ? '<img src="' + echapper(m.image) + '" alt="' + echapper(alt) + '" loading="lazy" onerror="this.remove()">'
    : "";
  const badge = m.estOuvert === false ? '<span class="badge">Fiche en préparation</span>' : "";

  return '<article class="carte">' +
    '<a class="carte-lien" href="#">' +
      '<div class="photo-cadre">' +
        '<span class="tag">' + typeTexte + '</span>' + badge +
        '<div class="photo">' + photo + dessinMaillot(m) + '</div>' +
      '</div>' +
      '<div class="infos">' +
        '<h3>' + echapper(club) + '</h3>' +
        '<p class="saison">' + echapper(saison) + '</p>' +
        '<p class="detail">' + echapper(detail) + '</p>' +
      '</div>' +
    '</a>' +
  '</article>';
}

function afficherMaillots(liste) {
  conteneur.setAttribute("aria-busy", "false");
  conteneur.innerHTML = liste.map(creerCarte).join("");
  compteur.textContent = liste.length + (liste.length > 1 ? " maillots" : " maillot");
  videFiltres.hidden = liste.length !== 0;
}

/* ---------- Filtres et recherche ---------- */

function filtreActif(nom) {
  return puces.some(function (p) {
    return p.dataset.filtre === nom && p.getAttribute("aria-pressed") === "true";
  });
}

function appliquerFiltres() {
  const domicile = filtreActif("domicile");
  const exterieur = filtreActif("exterieur");
  const recent = filtreActif("recent");
  const requete = normaliser(champRecherche.value.trim());

  const liste = maillots.filter(function (m) {
    const okType = (!domicile && !exterieur) || (domicile && m.type === "domicile") || (exterieur && m.type === "exterieur");
    const okAnnee = !recent || Number(m.annee) >= 2010;
    const texte = normaliser([m.titre, m.club, m.commune, m.saison, m.sponsor, m.equipementier, (m.tags || []).join(" ")].join(" "));
    const okTexte = !requete || texte.indexOf(requete) !== -1;
    return okType && okAnnee && okTexte;
  });
  afficherMaillots(liste);
}

function brancherFiltres() {
  puces.forEach(function (p) {
    p.addEventListener("click", function () {
      p.setAttribute("aria-pressed", String(p.getAttribute("aria-pressed") !== "true"));
      appliquerFiltres();
    });
  });
  champRecherche.addEventListener("input", appliquerFiltres);
  champRecherche.form.addEventListener("submit", function (e) { e.preventDefault(); });
  document.getElementById("reinit").addEventListener("click", function () {
    puces.forEach(function (p) { p.setAttribute("aria-pressed", "false"); });
    champRecherche.value = "";
    appliquerFiltres();
    champRecherche.focus();
  });
}

/* ---------- Chargement avec les 4 états ---------- */

async function chargerMaillots() {
  // État 1 : Chargement (Loading)
  conteneur.setAttribute("aria-busy", "true");
  videFiltres.hidden = true;
  compteur.textContent = "";
  conteneur.innerHTML = "<p class='etat-chargement' role='status'>Chargement des données en cours...</p>";

  try {
    const reponse = await fetch(URL_DONNEES);
    if (!reponse.ok) {
      throw new Error("Erreur de chargement : code HTTP " + reponse.status);
    }
    const donnees = await reponse.json();

    // État 3 : Vide (Empty)
    if (!Array.isArray(donnees) || donnees.length === 0) {
      conteneur.setAttribute("aria-busy", "false");
      conteneur.innerHTML = "<p class='etat-vide' role='status'>Aucun maillot enregistré pour le moment.</p>";
      return;
    }

    // État 2 : Succès (Success)
    maillots = donnees;
    appliquerFiltres();
  } catch (erreur) {
    // État 4 : Erreur (Error)
    console.error("Détail technique :", erreur);
    conteneur.setAttribute("aria-busy", "false");
    conteneur.innerHTML =
      "<div class='etat-erreur' role='alert'>" +
        "<p>Impossible de charger les données.</p>" +
        "<p>Vérifie ta connexion, puis réessaie. Si tu travailles en local, ouvre la page avec Live Server (adresse en http://127.0.0.1).</p>" +
        "<button class='bouton' type='button' id='reessayer'>Réessayer</button>" +
      "</div>";
    document.getElementById("reessayer").addEventListener("click", chargerMaillots);
  }
}

// Lancement automatique au chargement du script
brancherFiltres();
chargerMaillots();
