/* =========================================================
   Site icon set. The drawings are shared; STYLE decides how
   they render, so each storefront gets its own icon family.
   Usage in HTML: <i data-icon="bag"></i>   In JS: icon("bag")
   ========================================================= */
(() => {
  /* ---- per-site style ---- */
  const STYLE = {
    stroke: 1.8,
    cap: "round",
    join: "round",
    fill: "#FF9F8F",
    fillOpacity: 0.95,
    fillOffset: [2, 1.7],
    wobble: 2,
    overrides: {
      bag: `<path class="f" d="M5 8.5h14l-.8 12.5H5.8z"/><path d="M5 8.5 6.5 4h11L19 8.5M9.5 11.5a2.5 2.5 0 0 0 5 0"/>`,
      menu: `<path d="M4 7.2c5-.6 11 .4 16-.2M4 12.3c3.5.4 7-.3 10 .1M4 17c5.5-.4 10.5.5 16 0"/>`,
      search: `<path class="f" d="M10.6 4.3c3.5-.3 6.3 2.4 6.1 5.9-.2 3.4-3 5.9-6.3 5.7C7.1 15.7 4.6 13 4.9 9.7c.3-3 2.6-5.2 5.7-5.4"/><path d="M15.3 15.1c1.8 1.6 3.4 3.4 5.1 5.3"/>`,
      close: `<path d="M6.3 5.8c4 3.8 7.8 8 11.6 12.4M17.8 6.1C13.6 9.9 10 14 6 18.2"/>`,
    },
  };

  /* ---- drawings (24×24). class="f" marks the shape that receives the fill ---- */
  const D = {
    search: `<circle class="f" cx="10.8" cy="10.8" r="6.3"/><path d="m15.6 15.6 4.9 4.9"/>`,
    heart: `<path class="f" d="M12 20s-7.5-4.6-9-9.5C2 7 4.6 4.5 7.4 4.5c2 0 3.6 1.2 4.6 2.8 1-1.6 2.6-2.8 4.6-2.8 2.8 0 5.4 2.5 4.4 6-1.5 4.9-9 9.5-9 9.5z"/>`,
    bag: `<path class="f" d="M5 8h14l-1.2 12.5H6.2z"/><path d="M9 8V6.6a3 3 0 0 1 6 0V8"/>`,
    menu: `<path d="M4 7h16M4 12h16M4 17h11"/>`,
    close: `<path d="M6 6l12 12M18 6 6 18"/>`,
    recycle: `<path d="M19.5 12a7.5 7.5 0 0 1-13.1 5M4.5 12a7.5 7.5 0 0 1 13.1-5"/><path d="M17.9 3.3v3.9H14M6.1 20.7v-3.9H10"/><circle class="f" cx="12" cy="12" r="2.4"/>`,
    truck: `<path class="f" d="M2.5 6.5h11v9.5h-11z"/><path d="M13.5 9.5h4l3 3.2V16h-7"/><circle cx="6.5" cy="17.5" r="1.9"/><circle cx="16.8" cy="17.5" r="1.9"/>`,
    box: `<path class="f" d="M4 8l8-4 8 4-8 4z"/><path d="M4 8v8.5l8 4 8-4V8M12 12v8.5"/>`,
    hand: `<path class="f" d="M12 11.5s-4-2.4-4-5.1a2.1 2.1 0 0 1 4-.9 2.1 2.1 0 0 1 4 .9c0 2.7-4 5.1-4 5.1z"/><path d="M2.5 15.5H6l3.5 2.5h7l4-3.2a1.4 1.4 0 0 0-1.8-2.1L15.5 15H11"/>`,
    returns: `<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H10"/>`,
    tree: `<path class="f" d="M12 2.8c-3.5 0-6 3-6 6.3 0 3 2.5 5.4 6 5.4s6-2.4 6-5.4c0-3.3-2.5-6.3-6-6.3z"/><path d="M12 21v-9M12 15.5l-2.5-2M12 13l2.3-2"/>`,
    gift: `<path class="f" d="M4 11h16v9.5H4z"/><path d="M3 7h18v4H3zM12 7v13.5M12 7C10 4 6 4 6.5 6.5c.3 1.2 3 .5 5.5.5zM12 7c2-3 6-3 5.5-.5-.3 1.2-3 .5-5.5.5z"/>`,
    lock: `<rect class="f" x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2"/>`,
    upi: `<path class="f" d="M13 2.5 4.5 13.5H11l-1 8 9.5-12H13z"/>`,
    card: `<rect class="f" x="2.5" y="5.5" width="19" height="13" rx="2"/><path d="M2.5 10h19M6.5 14.5h4"/>`,
    bank: `<path class="f" d="M3 9.5 12 4l9 5.5z"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20.5h18"/>`,
    cash: `<rect class="f" x="2.5" y="6.5" width="19" height="11" rx="1.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5h.01M18 14.5h.01"/>`,
    party: `<path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4M5.3 5.3l2.8 2.8M15.9 15.9l2.8 2.8M5.3 18.7l2.8-2.8M15.9 8.1l2.8-2.8"/><circle class="f" cx="12" cy="12" r="2.2"/>`,
    eye: `<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle class="f" cx="12" cy="12" r="3"/>`,
    fire: `<path class="f" d="M12 21.5c-4 0-7-2.8-7-6.6C5 10.5 9.5 8.5 9 3c3 1.5 6 5 6 8 1-.6 1.6-1.8 1.8-3 1.4 1.5 2.2 3.6 2.2 6 0 4.4-3 7.5-7 7.5z"/>`,
    check: `<path d="M5 12.5l4.5 4.5L19 7.5"/>`,
    star: `<path class="f" d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6L12 16.7l-5.4 2.9 1.1-6-4.5-4.2 6.1-.8z"/>`,
    collect: `<path class="f" d="M3.5 10h17l-2.2 10.5H5.7z"/><path d="M7.5 10 10 4.5M16.5 10 14 4.5M3 10h18M8.5 13.5v4M12 13.5v4M15.5 13.5v4"/>`,
    clean: `<path class="f" d="M11 5c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9z"/><path d="M19 3v4M17 5h4M18.5 12.5v2.5M17.2 13.8h2.6"/>`,
    home: `<path class="f" d="M5.5 9.5V20.5h13V9.5L12 4.5z"/><path d="M3 11 12 4l9 7M10 20.5v-5h4v5"/>`,
    bottle: `<path class="f" d="M10.5 6.5c0 1-2.5 2-2.5 4.5v9a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-9c0-2.5-2.5-3.5-2.5-4.5z"/><path d="M10 2.5h4M10.5 2.5v4M13.5 2.5v4M8 13.5h8"/>`,
    jeans: `<path class="f" d="M6 3h12l1 18h-5.2L12 10l-1.8 11H5z"/><path d="M6 6.5h12M9 6.5c0 1.5-1 2.5-2.6 2.6M15 6.5c0 1.5 1 2.5 2.6 2.6"/>`,
    tyre: `<circle class="f" cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.2"/><path d="M12 3v4.8M12 16.2V21M3 12h4.8M16.2 12H21"/>`,
    spool: `<path class="f" d="M8 5h8v14H8z"/><path d="M5.5 4.5h13M5.5 19.5h13M8 8.5l8 2.5M8 12l8 2.5M8 15.5l8 1.5M16 13c2 0 3 1.5 3 3.5s-1 4-3 4"/>`,
    log: `<path class="f" d="M17 5H7c-2.2 0-4 3.1-4 7s1.8 7 4 7h10"/><ellipse cx="17" cy="12" rx="4" ry="7"/><ellipse cx="17" cy="12" rx="1.6" ry="3"/>`,
    can: `<path class="f" d="M6 5v14c0 1.1 2.7 2 6 2s6-.9 6-2V5"/><ellipse cx="12" cy="5" rx="6" ry="2"/><path d="M6 9.5c0 1.1 2.7 2 6 2s6-.9 6-2M6 14.5c0 1.1 2.7 2 6 2s6-.9 6-2"/>`,
    dice: `<rect class="f" x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.5" cy="8.5" r="1.1"/><circle cx="12" cy="12" r="1.1"/><circle cx="15.5" cy="15.5" r="1.1"/>`,
    pin: `<path class="f" d="M9 3h6l-1 6 3.5 3.5h-11L10 9z"/><path d="M12 12.5V21"/>`,
    scissors: `<circle class="f" cx="6" cy="6.5" r="2.8"/><circle class="f" cx="6" cy="17.5" r="2.8"/><path d="M8.3 8.2 20 18M8.3 15.8 20 6"/>`,
    mail: `<rect class="f" x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6.5L20.5 7"/>`,
  };
  Object.assign(D, STYLE.overrides);

  const hasFill = STYLE.fill != null;
  const [dx, dy] = STYLE.fillOffset;
  const filter = STYLE.wobble ? ` filter="url(#ico-wobble)"` : "";

  function build(body) {
    // Duplicate each ".f" shape as a fill-only layer underneath the line drawing.
    if (hasFill) {
      const under = [];
      body.replace(/<(path|circle|rect|ellipse)\b([^>]*?)class="f"([^>]*?)\/>/g, (m, tag, a, b) => {
        under.push(`<${tag}${a}${b} fill="${STYLE.fill}" fill-opacity="${STYLE.fillOpacity}" stroke="none"${dx || dy ? ` transform="translate(${dx} ${dy})"` : ""}/>`);
      });
      body = under.join("") + body;
    }
    return `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${STYLE.stroke}" stroke-linecap="${STYLE.cap}" stroke-linejoin="${STYLE.join}" aria-hidden="true"${filter}>${body}</svg>`;
  }

  const cache = {};
  window.icon = (name) => (cache[name] ??= D[name] ? build(D[name]) : "");

  function paint(root = document) {
    root.querySelectorAll("[data-icon]:not([data-painted])").forEach((el) => {
      el.innerHTML = window.icon(el.dataset.icon);
      el.setAttribute("data-painted", "");
    });
  }
  window.paintIcons = paint;

  // One shared jitter filter for hand-drawn sites
  if (STYLE.wobble) {
    const defs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="ico-wobble"><feTurbulence type="fractalNoise" baseFrequency="0.16" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="${STYLE.wobble}"/></filter></svg>`;
    document.addEventListener("DOMContentLoaded", () => document.body.insertAdjacentHTML("afterbegin", defs));
  }
  document.addEventListener("DOMContentLoaded", () => paint());
})();
