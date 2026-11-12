/* ============================================================================
   GATI LABOUR MARKET INTELLIGENCE TOOLS - page behaviour
   Builds the pathway strip, tool rows and footer links from tools.js, runs
   the splash loader, the mobile menu, scroll reveals and back-to-top.
   ============================================================================ */
(function () {
  var TOOLS = window.GATI_TOOLS || [];

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  var ICONS = {
    bars:  '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9M12 3c-2.6 2.6-3.8 5.6-3.8 9s1.2 6.4 3.8 9"/>',
    pin:   '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.6"/>',
    news:  '<path d="M4 5h13v14H6a2 2 0 0 1-2-2V5z"/><path d="M17 9h3v8a2 2 0 0 1-2 2"/><path d="M7.5 9h6M7.5 12.5h6M7.5 16h4"/>'
  };
  var STATUS = {
    live:     ["status-live", "Updated every weekday"],
    snapshot: ["status-snapshot", "Dated snapshot"],
    official: ["status-official", "Official and published sources"]
  };
  var EXT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';

  /* ---- pathway strip ---- */
  var pw = document.getElementById("pathway");
  if (pw) pw.innerHTML = TOOLS.map(function (t, i) {
    return '<a href="#tool-' + esc(t.id) + '">' +
      '<span class="pw-n">0' + (i + 1) + '</span>' +
      '<span class="pw-l">' + esc(t.lens) + '</span>' +
      '<span class="pw-q">' + esc(t.question) + '</span></a>';
  }).join("");

  /* ---- tool rows ---- */
  var list = document.getElementById("tool-list");
  if (list) list.innerHTML = TOOLS.map(function (t, i) {
    var st = STATUS[t.status] || STATUS.official;
    var facts = (t.facts || []).map(function (f) {
      return '<div><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>';
    }).join("");
    return '<li class="tool reveal" id="tool-' + esc(t.id) + '">' +
      '<div class="tool-ic"><svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[t.icon] || ICONS.bars) + '</svg></div>' +
      '<div>' +
        '<div class="tool-lens">0' + (i + 1) + ' ' + esc(t.lens) + ' <span>' + esc(t.question) + '</span></div>' +
        '<h3><a href="' + esc(t.url) + '" target="_blank" rel="noopener">' + esc(t.title) + '</a></h3>' +
        '<p>' + esc(t.summary) + '</p>' +
      '</div>' +
      '<dl class="facts">' + facts +
        '<div><dt>Status</dt><dd><span class="status ' + st[0] + '">' + st[1] + '</span></dd></div>' +
      '</dl>' +
      '<a class="btn btn-teal tool-go" href="' + esc(t.url) + '" target="_blank" rel="noopener" ' +
        'aria-label="Open ' + esc(t.title) + ' in a new tab">Open tool ' + EXT + '</a>' +
    '</li>';
  }).join("");

  /* ---- footer tool links ---- */
  var ft = document.getElementById("foot-tools");
  if (ft) ft.innerHTML = TOOLS.map(function (t) {
    return '<li><a href="' + esc(t.url) + '" target="_blank" rel="noopener">' + esc(t.title) + '</a></li>';
  }).join("");

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- splash loader ---- */
  var splash = document.getElementById("splash");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var seen = document.documentElement.classList.contains("no-splash");
  if (splash && !seen) {
    var LINES = [
      "Mapping where the world needs skilled workers.",
      "Tracking where Indian talent already works.",
      "Locating the training infrastructure at home.",
      "Following the policy signals that shape mobility."
    ];
    var DURATION = reduce ? 600 : 2600;
    splash.style.setProperty("--splash-ms", DURATION + "ms");
    var lineEl = document.getElementById("sp-line"), li = 0;
    var rot = reduce ? null : setInterval(function () {
      li = (li + 1) % LINES.length;
      lineEl.classList.add("fade");
      setTimeout(function () { lineEl.textContent = LINES[li]; lineEl.classList.remove("fade"); }, 300);
    }, 800);
    var done = false;
    function hide() {
      if (done) return; done = true;
      if (rot) clearInterval(rot);
      splash.classList.add("gone");
      try { sessionStorage.setItem("gati-hub-splash", "1"); } catch (e) {}
      setTimeout(function () { splash.remove(); }, 700);
    }
    var timer = setTimeout(hide, DURATION);
    splash.addEventListener("click", function () { clearTimeout(timer); hide(); });
    document.addEventListener("keydown", function onKey(e) {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") { clearTimeout(timer); hide(); document.removeEventListener("keydown", onKey); }
    });
  } else if (splash) {
    splash.remove();
  }

  /* ---- mobile menu ---- */
  var toggle = document.querySelector(".nav-toggle"), nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ---- reveal on scroll ---- */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- back to top ---- */
  var top = document.getElementById("to-top");
  if (top) {
    window.addEventListener("scroll", function () { top.classList.toggle("show", window.scrollY > 600); }, { passive: true });
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
  }
})();
