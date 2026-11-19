/* Turbo Track Tactics – Interaktionen
   - Menü auf dem Handy
   - Parallax im Startbereich
   - Schaltleuchten als Scrollfortschritt
   - aktiver Menüpunkt
   - E-Mail-Adresse erst im Browser zusammensetzen (Schutz vor Spam-Bots)
   - Auto fährt auf der Beispielstrecke
   Alles Bewegte wird abgeschaltet, wenn „Bewegung reduzieren“ aktiv ist. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Menü ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    var label = toggle.querySelector(".visually-hidden");
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      if (label) label.textContent = open ? "Menü schließen" : "Menü öffnen";
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Parallax und Schaltleuchten ---------- */
  var layers = Array.prototype.slice.call(document.querySelectorAll(".hero [data-speed]"));
  var hero = document.querySelector(".hero");
  var lights = Array.prototype.slice.call(document.querySelectorAll("[data-shift-lights] span"));
  var ticking = false;

  function update() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;

    if (!reduceMotion.matches && hero && y < hero.offsetHeight * 1.2) {
      for (var i = 0; i < layers.length; i++) {
        var speed = parseFloat(layers[i].getAttribute("data-speed")) || 0;
        layers[i].style.transform = "translate3d(0," + (y * speed).toFixed(1) + "px,0)";
      }
    }

    var max = document.documentElement.scrollHeight - window.innerHeight;
    var progress = max > 0 ? Math.min(1, y / max) : 0;
    var lit = Math.round(progress * lights.length);
    for (var j = 0; j < lights.length; j++) {
      lights[j].classList.toggle("is-lit", j < lit);
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  reduceMotion.addEventListener("change", function () {
    if (reduceMotion.matches) layers.forEach(function (l) { l.style.transform = ""; });
    update();
  });
  update();

  /* ---------- Aktiver Menüpunkt ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav a[href^='#']"));
  if ("IntersectionObserver" in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute("aria-current"); });
        var link = byId[entry.target.id];
        if (link) link.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- E-Mail-Adresse ---------- */
  document.querySelectorAll("[data-mail]").forEach(function (el) {
    var address = el.getAttribute("data-user") + "@" + el.getAttribute("data-domain");
    el.setAttribute("href", "mailto:" + address);
    var text = el.parentElement && el.parentElement.querySelector("[data-mail-text]");
    if (text) text.textContent = address;
  });
  document.querySelectorAll("[data-mail-inline]").forEach(function (el) {
    var address = el.getAttribute("data-user") + "@" + el.getAttribute("data-domain");
    var a = document.createElement("a");
    a.href = "mailto:" + address;
    a.textContent = address;
    el.replaceWith(a);
  });

  /* ---------- Auto auf der Beispielstrecke ---------- */
  var track = document.querySelector("[data-track]");
  var car = document.querySelector("[data-track-car]");
  var path = document.getElementById("streckenpfad");
  if (track && car && path && path.getTotalLength) {
    var length = path.getTotalLength();
    var placeCar = function (t) {
      var p = path.getPointAtLength(t * length);
      car.setAttribute("transform", "translate(" + p.x.toFixed(1) + " " + p.y.toFixed(1) + ")");
    };
    // Startposition: auf der Start-Ziel-Geraden
    var startShare = 278 / length;
    placeCar(startShare);

    var running = false;
    var startTime = null;
    var lapMs = 14000;
    var frame = function (now) {
      if (!running) return;
      if (startTime === null) startTime = now;
      var t = (startShare + (now - startTime) / lapMs) % 1;
      placeCar(t);
      window.requestAnimationFrame(frame);
    };

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !running && !reduceMotion.matches) {
          running = true;
          startTime = null;
          window.requestAnimationFrame(frame);
        } else if (!visible) {
          running = false;
        }
      }, { threshold: 0.3 }).observe(track);
    }
  }
})();
