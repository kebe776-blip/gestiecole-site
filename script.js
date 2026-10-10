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

  /* ---------- Carrousel de captures (hero, fondu) ---------- */
  var carrousel = document.querySelector("[data-carrousel]");
  if (carrousel) {
    var imgs = carrousel.querySelectorAll(".carrousel-img");
    var puces = carrousel.querySelectorAll(".puce");
    var texteLegende = carrousel.querySelector("[data-legende-texte]");
    var compteur = carrousel.querySelector(".carrousel-compteur");
    var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var idx = 0;
    var timer = null;

    var afficher = function (i) {
      idx = (i + imgs.length) % imgs.length;
      imgs.forEach(function (img, k) {
        img.classList.toggle("carrousel-actif", k === idx);
      });
      puces.forEach(function (p, k) {
        var actif = k === idx;
        p.classList.toggle("carrousel-actif", actif);
        if (actif) {
          p.setAttribute("aria-current", "true");
        } else {
          p.removeAttribute("aria-current");
        }
      });
      if (texteLegende) {
        texteLegende.textContent = imgs[idx].getAttribute("data-legende") || "";
      }
      if (compteur) {
        compteur.textContent = (idx + 1) + " / " + imgs.length;
      }
    };

    var demarrer = function () {
      if (reduit || timer) { return; }
      timer = setInterval(function () { afficher(idx + 1); }, 4500);
    };
    var arreter = function () {
      if (timer) { clearInterval(timer); timer = null; }
    };

    puces.forEach(function (p) {
      p.addEventListener("click", function () {
        afficher(parseInt(p.getAttribute("data-index"), 10));
      });
    });

    carrousel.addEventListener("mouseenter", arreter);
    carrousel.addEventListener("mouseleave", demarrer);
    carrousel.addEventListener("focusin", arreter);
    carrousel.addEventListener("focusout", function (e) {
      if (!carrousel.contains(e.relatedTarget)) { demarrer(); }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { arreter(); } else { demarrer(); }
    });

    afficher(0);
    demarrer();
  }
})();
