/* ============================================================
   GestiEcole v1.0.0 — site officiel
   JavaScript natif · aucune dépendance
   - Menu mobile accessible (aria-expanded, Escape, fermeture au clic externe)
   - Année courante dans le pied de page
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Menu mobile ---------- */
  var btn = document.getElementById("btn-menu");
  var nav = document.querySelector(".nav");

  if (btn && nav) {
    var fermer = function () {
      nav.classList.remove("nav-ouverte");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Ouvrir le menu de navigation");
    };

    var ouvrir = function () {
      nav.classList.add("nav-ouverte");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Fermer le menu de navigation");
    };

    btn.addEventListener("click", function () {
      var ouvert = btn.getAttribute("aria-expanded") === "true";
      if (ouvert) {
        fermer();
      } else {
        ouvrir();
      }
    });

    /* Escape ferme le menu et rend le focus au bouton */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
        fermer();
        btn.focus();
      }
    });

    /* Clic en dehors du menu */
    document.addEventListener("click", function (e) {
      if (
        btn.getAttribute("aria-expanded") === "true" &&
        !nav.contains(e.target) &&
        !btn.contains(e.target)
      ) {
        fermer();
      }
    });

    /* Un clic sur un lien referme le menu (navigation par ancre) */
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        fermer();
      }
    });

    /* Retour en grand écran : on repasse en état fermé */
    var mq = window.matchMedia("(min-width: 901px)");
    var onResize = function () {
      if (mq.matches) {
        fermer();
      }
    };
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onResize);
    } else if (typeof mq.addListener === "function") {
      mq.addListener(onResize); /* ancien navigateur */
    }
  }

  /* ---------- Année courante (pied de page) ---------- */
  var annee = document.getElementById("annee");
  if (annee) {
    annee.textContent = String(new Date().getFullYear());
  }
})();
