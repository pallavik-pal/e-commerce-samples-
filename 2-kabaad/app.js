/* =========================================================
   ReNest storefront logic (vanilla JS, no build step)
   ========================================================= */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const money = (n) => STORE.currency + Math.round(n).toLocaleString(STORE.locale);

  /* ---------- Persistent state (localStorage, fail-safe) ---------- */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem("renest:" + key); return v ? JSON.parse(v) : fallback; }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("renest:" + key, JSON.stringify(value)); } catch { /* ignore */ }
    },
  };

  const state = {
    cart: store.get("cart", {}),          // { productId: qty }
    wish: new Set(store.get("wish", [])),
    promo: store.get("promo", null),
    giftWrap: false,
    filter: "all",
    sort: "featured",
    search: "",
  };
  const save = () => {
    store.set("cart", state.cart);
    store.set("wish", [...state.wish]);
    store.set("promo", state.promo);
  };

  /* ---------- Media helper: real photo if provided, else illustration ---------- */
  const photo = (src, alt = "") => `<img class="photo" src="${src}" alt="${alt}" loading="lazy" />`;
  const media = (p) => (p.image ? photo(p.image, p.name) : `<div class="art">${productArt(p.art, p.c1, p.c2)}</div>`);
  const thumb = (p) => (p.image ? photo(p.image) : productArt(p.art, p.c1, p.c2));
  window.productThumb = (id) => { const p = byId(id); return p ? thumb(p) : ""; };

  /* =========================================================
     Categories & chips
     ========================================================= */
  function renderCategories() {
    $("#cats").innerHTML = CATEGORIES.map((c) => `
      <button class="cat reveal" data-jump-cat="${c.id}">
        <div class="cat__art art-bg" style="background-color:${c.bg}">${c.image ? photo(c.image) : productArt(c.art)}</div>
        <h3>${c.name}</h3>
        <p>${c.blurb}</p>
      </button>`).join("");

    const chips = [{ id: "all", name: "All" }, ...CATEGORIES, { id: "sale", name: `On sale ${icon("fire")}` }];
    $("#chips").innerHTML = chips.map((c) =>
      `<button class="chip${c.id === state.filter ? " active" : ""}" data-filter="${c.id}" role="tab">${c.name}</button>`
    ).join("");
  }

  /* =========================================================
     Product grid
     ========================================================= */
  function filteredProducts() {
    const q = state.search.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (state.filter === "sale" && !p.mrp) return false;
      if (!["all", "sale"].includes(state.filter) && p.cat !== state.filter) return false;
      if (q && !`${p.name} ${p.made} ${p.maker} ${p.cat}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const sorters = {
      featured: (a, b) => (b.tag ? 1 : 0) - (a.tag ? 1 : 0) || b.reviews - a.reviews,
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      new: (a, b) => a.added - b.added,
    };
    return list.sort(sorters[state.sort]);
  }

  function cardHTML(p, i) {
    const off = p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0;
    const inCart = state.cart[p.id];
    return `
      <article class="card" style="animation-delay:${i * 45}ms">
        <div class="card__media art-bg" style="background-color:${p.bg}" data-quick="${p.id}">
          ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
          ${off ? `<span class="tag tag--sale">-${off}%</span>` : ""}
          <button class="wish${state.wish.has(p.id) ? " on" : ""}" data-wish="${p.id}" aria-label="Save ${p.name}">
            ${icon("heart")}
          </button>
          ${media(p)}
          <span class="quick-hint">${icon("eye")} Quick look</span>
        </div>
        <div class="card__body">
          <span class="card__made">${icon("recycle")} ${p.made}</span>
          <h3 class="card__name" data-quick="${p.id}">${p.name}</h3>
          <span class="rating"><b>★</b> ${p.rating} · ${p.reviews} reviews</span>
          <div class="card__foot">
            <span class="price">${money(p.price)}${p.mrp ? `<s>${money(p.mrp)}</s>` : ""}</span>
            <button class="add${inCart ? " added" : ""}" data-add="${p.id}">${inCart ? `${icon("check")} In basket` : "+ Add"}</button>
          </div>
        </div>
      </article>`;
  }

  function renderGrid() {
    const list = filteredProducts();
    $("#grid").innerHTML = list.map(cardHTML).join("");
    $("#empty").hidden = list.length > 0;
    $("#resultCount").textContent = `${list.length} handmade piece${list.length === 1 ? "" : "s"}`;
    $$(".chip").forEach((c) => c.classList.toggle("active", c.dataset.filter === state.filter));
  }

  /* =========================================================
     Cart
     ========================================================= */
  const cartLines = () => Object.entries(state.cart).map(([id, qty]) => ({ p: byId(+id), qty })).filter((l) => l.p);
  const cartQty = () => cartLines().reduce((n, l) => n + l.qty, 0);

  function totals(express = false) {
    const subtotal = cartLines().reduce((s, l) => s + l.p.price * l.qty, 0);
    const discount = state.promo ? subtotal * (STORE.promoCodes[state.promo] || 0) : 0;
    const afterDiscount = subtotal - discount;
    let shipping = afterDiscount >= STORE.freeShippingAt || subtotal === 0 ? 0 : STORE.shippingFee;
    if (express) shipping += STORE.expressFee;
    const gift = state.giftWrap ? 49 : 0;
    return { subtotal, discount, shipping, gift, total: afterDiscount + shipping + gift };
  }

  function addToCart(id, qty = 1) {
    state.cart[id] = (state.cart[id] || 0) + qty;
    save();
    updateCart();
    renderGrid();
    toast(`${icon("bag")} ${byId(id).name} added to your basket`);
  }

  function setQty(id, qty) {
    if (qty <= 0) delete state.cart[id];
    else state.cart[id] = Math.min(qty, 20);
    save();
    updateCart();
    renderGrid();
  }

  function updateBadges() {
    const setBadge = (el, n) => {
      const prev = +el.textContent;
      el.textContent = n;
      el.classList.toggle("show", n > 0);
      if (n > prev) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
    };
    setBadge($("#cartCount"), cartQty());
    setBadge($("#wishCount"), state.wish.size);
  }

  function updateCart() {
    updateBadges();
    const lines = cartLines();
    const t = totals();

    // Free-shipping progress
    const sp = $("#shipProgress");
    if (!lines.length) sp.innerHTML = "";
    else {
      const base = t.subtotal - t.discount;
      const left = STORE.freeShippingAt - base;
      const pct = Math.min(100, (base / STORE.freeShippingAt) * 100);
      sp.innerHTML = `${left > 0
        ? `You're <b>${money(left)}</b> away from <b>free shipping</b> ${icon("truck")}`
        : `${icon("party")} Yay! You've unlocked <b>free plastic-free shipping</b>`}
        <div class="bar"><i style="width:${pct}%"></i></div>`;
    }

    if (!lines.length) {
      $("#cartItems").innerHTML = `
        <div class="drawer__empty">
          <div class="big">${icon("bag")}</div>
          <p>Your basket is empty — but full of potential.</p>
          <button class="btn btn--primary" data-go-shop>Start shopping</button>
        </div>`;
      $("#cartFoot").innerHTML = "";
      return;
    }

    $("#cartItems").innerHTML = lines.map(({ p, qty }) => `
      <div class="line">
        <div class="line__art art-bg" style="background-color:${p.bg}">${thumb(p)}</div>
        <div>
          <div class="line__name">${p.name}</div>
          <div class="line__meta">${money(p.price)} · ${icon("recycle")} ${p.made}</div>
          <button class="remove" data-remove="${p.id}">Remove</button>
        </div>
        <div class="line__right">
          <div class="qty">
            <button data-dec="${p.id}" aria-label="Decrease">−</button>
            <span>${qty}</span>
            <button data-inc="${p.id}" aria-label="Increase">+</button>
          </div>
          <b>${money(p.price * qty)}</b>
        </div>
      </div>`).join("");

    $("#cartFoot").innerHTML = `
      <form class="promo" id="promoForm">
        <input name="code" placeholder="Promo code" value="${state.promo || ""}" aria-label="Promo code" />
        <button type="submit">${state.promo ? `Applied ${icon("check")}` : "Apply"}</button>
      </form>
      <label class="toggle"><input type="checkbox" id="giftWrap" ${state.giftWrap ? "checked" : ""} /> Add reusable fabric gift wrap (+₹49) ${icon("gift")}</label>
      <div class="row"><span class="muted">Subtotal</span><span>${money(t.subtotal)}</span></div>
      ${t.discount ? `<div class="row"><span class="muted">Discount (${state.promo})</span><span class="green">−${money(t.discount)}</span></div>` : ""}
      <div class="row"><span class="muted">Shipping</span><span>${t.shipping ? money(t.shipping) : '<span class="green">FREE</span>'}</span></div>
      <div class="row row--total"><span>Total</span><span>${money(t.total)}</span></div>
      <button class="btn btn--primary btn--block" id="toCheckout">Checkout securely
        <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>`;
  }

  /* =========================================================
     Wishlist
     ========================================================= */
  function toggleWish(id) {
    if (state.wish.has(id)) { state.wish.delete(id); toast("Removed from wishlist"); }
    else { state.wish.add(id); toast(`${icon("heart")} Saved to your wishlist`); }
    save();
    updateBadges();
    renderGrid();
    renderWish();
  }

  function renderWish() {
    const items = [...state.wish].map(byId).filter(Boolean);
    $("#wishItems").innerHTML = items.length
      ? items.map((p) => `
        <div class="line">
          <div class="line__art art-bg" style="background-color:${p.bg}">${thumb(p)}</div>
          <div>
            <div class="line__name">${p.name}</div>
            <div class="line__meta">${money(p.price)}</div>
            <button class="remove" data-wish="${p.id}">Remove</button>
          </div>
          <button class="add" data-move="${p.id}">Move to basket</button>
        </div>`).join("")
      : `<div class="drawer__empty"><div class="big">${icon("heart")}</div><p>Tap the heart on anything you love and it'll wait for you here.</p><button class="btn btn--primary" data-go-shop>Browse treasures</button></div>`;
  }

  /* =========================================================
     Overlays: drawers & modals
     ========================================================= */
  let openPanel = null;
  function open(el) {
    close();
    openPanel = el;
    el.classList.add("open");
    el.setAttribute("aria-hidden", "false");
    $("#overlay").hidden = false;
    document.body.classList.add("locked");
  }
  function close() {
    if (openPanel) {
      openPanel.classList.remove("open");
      openPanel.setAttribute("aria-hidden", "true");
    }
    $("#nav").classList.remove("open");
    openPanel = null;
    $("#overlay").hidden = true;
    document.body.classList.remove("locked");
  }

  const closeBtn = `<button class="icon-btn modal__close" data-close aria-label="Close">${icon("close")}</button>`;

  function quickView(id) {
    const p = byId(id);
    let qty = 1;
    const cat = CATEGORIES.find((c) => c.id === p.cat);
    $("#quickViewBody").innerHTML = `
      ${closeBtn}
      <div class="qv">
        <div class="qv__media art-bg" style="background-color:${p.bg}">
          ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
          ${media(p)}
        </div>
        <div class="qv__info">
          <span class="scribble" style="font-size:1.2rem">${cat ? cat.name : ""}</span>
          <h3>${p.name}</h3>
          <span class="rating"><b>★★★★★</b> ${p.rating} · ${p.reviews} reviews</span>
          <div class="qv__price">${money(p.price)}${p.mrp ? `<s>${money(p.mrp)}</s>` : ""}</div>
          <p>${p.desc}</p>
          <div class="qv__story">
            <span class="hand">It used to be…</span>
            <span>${icon("recycle")} <b>${p.made}</b></span>
            <span>${icon("hand")} Handmade by <b>${p.maker}</b></span>
          </div>
          <div class="qv__actions">
            <div class="qty qty--lg">
              <button data-qv-dec aria-label="Decrease">−</button>
              <span id="qvQty">1</span>
              <button data-qv-inc aria-label="Increase">+</button>
            </div>
            <button class="btn btn--primary" id="qvAdd" style="flex:1;justify-content:center">Add to basket</button>
            <button class="wish${state.wish.has(p.id) ? " on" : ""}" data-wish="${p.id}" style="position:static" aria-label="Save">
              ${icon("heart")}
            </button>
          </div>
          <div class="qv__perks"><span>${icon("truck")} Ships in 2–4 days</span><span>${icon("box")} Plastic-free</span><span>${icon("returns")} 7-day returns</span></div>
        </div>
      </div>`;
    const setQ = (n) => { qty = Math.max(1, Math.min(20, n)); $("#qvQty").textContent = qty; };
    $("[data-qv-dec]").onclick = () => setQ(qty - 1);
    $("[data-qv-inc]").onclick = () => setQ(qty + 1);
    $("#qvAdd").onclick = () => { addToCart(p.id, qty); close(); setTimeout(() => open($("#cartDrawer")), 350); };
    open($("#quickView"));
  }

  /* =========================================================
     Checkout (3 steps → confirmation)
     ========================================================= */
  const checkout = {
    step: 1,
    data: store.get("address", { name: "", phone: "", email: "", address: "", city: "", pin: "" }),
    delivery: "standard",
    payment: "upi",
  };

  function stepper() {
    return `<div class="stepper">${["Details", "Delivery & payment", "Review"].map((s, i) =>
      `<div class="${i < checkout.step ? "done" : ""}">${i + 1}. ${s}</div>`).join("")}</div>`;
  }

  function renderCheckout() {
    const body = $("#checkoutBody");
    const d = checkout.data;
    const t = totals(checkout.delivery === "express");

    if (checkout.step === 1) {
      const f = (key, label, type = "text", extra = "", full = false) => `
        <label class="field${full ? " full" : ""}" data-field="${key}">${label}
          <input name="${key}" type="${type}" value="${d[key] || ""}" ${extra} />
          <small></small>
        </label>`;
      body.innerHTML = `${closeBtn}<div class="co">
        <h3>Where should we send it?</h3>${stepper()}
        <form class="form" id="coForm" novalidate>
          ${f("name", "Full name", "text", 'autocomplete="name"', true)}
          ${f("phone", "Phone", "tel", 'autocomplete="tel" inputmode="numeric"')}
          ${f("email", "Email", "email", 'autocomplete="email"')}
          ${f("address", "House no., street, area", "text", 'autocomplete="street-address"', true)}
          ${f("city", "City", "text", 'autocomplete="address-level2"')}
          ${f("pin", "PIN code", "text", 'inputmode="numeric" maxlength="6" autocomplete="postal-code"')}
        </form>
        <div class="co__nav">
          <button class="btn btn--ghost" data-close>Keep shopping</button>
          <button class="btn btn--primary" id="coNext">Continue →</button>
        </div>
      </div>`;
      $("#coNext").onclick = () => {
        const form = $("#coForm");
        const vals = Object.fromEntries(new FormData(form));
        const rules = {
          name: (v) => v.trim().length >= 2 || "Please enter your name",
          phone: (v) => /^[6-9]\d{9}$/.test(v.replace(/\D/g, "").slice(-10)) || "Enter a valid 10-digit mobile number",
          email: (v) => /^\S+@\S+\.\S+$/.test(v) || "Enter a valid email",
          address: (v) => v.trim().length >= 6 || "Please enter your full address",
          city: (v) => v.trim().length >= 2 || "Enter your city",
          pin: (v) => /^\d{6}$/.test(v) || "PIN code must be 6 digits",
        };
        let ok = true;
        for (const [k, rule] of Object.entries(rules)) {
          const res = rule(vals[k] || "");
          const field = $(`[data-field="${k}"]`, form);
          field.classList.toggle("err", res !== true);
          $("small", field).textContent = res === true ? "" : res;
          if (res !== true) ok = false;
        }
        checkout.data = vals;
        if (!ok) return;
        store.set("address", vals);
        checkout.step = 2;
        renderCheckout();
      };
    }

    if (checkout.step === 2) {
      const opt = (group, value, title, sub, right) => `
        <label class="option">
          <input type="radio" name="${group}" value="${value}" ${checkout[group] === value ? "checked" : ""} />
          <div><b>${title}</b><small>${sub}</small></div>
          ${right ? `<span class="price-tag">${right}</span>` : ""}
        </label>`;
      body.innerHTML = `${closeBtn}<div class="co">
        <h3>Delivery & payment</h3>${stepper()}
        <p class="co__label">Delivery speed</p>
        <div class="options">
          ${opt("delivery", "standard", "Standard", "4–6 business days · plastic-free", t.subtotal - t.discount >= STORE.freeShippingAt ? "FREE" : money(STORE.shippingFee))}
          ${opt("delivery", "express", "Express", "1–2 business days", "+" + money(STORE.expressFee))}
        </div>
        <p class="co__label">Pay with</p>
        <div class="options">
          ${opt("payment", "upi", "UPI", "GPay, PhonePe, Paytm & more", icon("upi"))}
          ${opt("payment", "card", "Credit / Debit card", "Visa, Mastercard, RuPay", icon("card"))}
          ${opt("payment", "netbanking", "Net banking", "All major banks", icon("bank"))}
          ${opt("payment", "cod", "Cash on delivery", "Pay when it arrives", icon("cash"))}
        </div>
        <p class="secure">${icon("lock")} Payment details are entered on the secure payment gateway page — never stored on this site.</p>
        <div class="co__nav">
          <button class="btn btn--ghost" id="coBack">← Back</button>
          <button class="btn btn--primary" id="coNext">Review order →</button>
        </div>
      </div>`;
      $$('input[name="delivery"], input[name="payment"]', body).forEach((r) =>
        r.addEventListener("change", () => { checkout[r.name] = r.value; }));
      $("#coBack").onclick = () => { checkout.step = 1; renderCheckout(); };
      $("#coNext").onclick = () => { checkout.step = 3; renderCheckout(); };
    }

    if (checkout.step === 3) {
      const payNames = { upi: "UPI", card: "Card", netbanking: "Net banking", cod: "Cash on delivery" };
      body.innerHTML = `${closeBtn}<div class="co">
        <h3>Looks good?</h3>${stepper()}
        <div class="summary">
          ${cartLines().map(({ p, qty }) => `<div class="row"><span>${p.name} × ${qty}</span><span>${money(p.price * qty)}</span></div>`).join("")}
          <hr />
          ${t.discount ? `<div class="row"><span class="muted">Discount (${state.promo})</span><span class="green">−${money(t.discount)}</span></div>` : ""}
          ${t.gift ? `<div class="row"><span class="muted">Fabric gift wrap</span><span>${money(t.gift)}</span></div>` : ""}
          <div class="row"><span class="muted">Shipping (${checkout.delivery})</span><span>${t.shipping ? money(t.shipping) : '<span class="green">FREE</span>'}</span></div>
          <div class="row row--total"><span>Total</span><span>${money(t.total)}</span></div>
        </div>
        <div class="summary" style="margin-top:1rem">
          <div class="row"><span class="muted">Ship to</span><span style="text-align:right">${esc(d.name)}<br/><span class="muted">${esc(d.address)}, ${esc(d.city)} ${esc(d.pin)}</span></span></div>
          <div class="row"><span class="muted">Payment</span><span>${payNames[checkout.payment]}</span></div>
        </div>
        <div class="co__nav">
          <button class="btn btn--ghost" id="coBack">← Back</button>
          <button class="btn btn--accent" id="coPlace">Place order · ${money(t.total)}</button>
        </div>
      </div>`;
      $("#coBack").onclick = () => { checkout.step = 2; renderCheckout(); };
      $("#coPlace").onclick = placeOrder;
    }
  }

  function placeOrder() {
    /* INTEGRATION POINT: call your backend here to create the order and
       open the payment gateway (e.g. Razorpay / Stripe / Cashfree) before
       showing the confirmation. This demo simulates a successful order. */
    const btn = $("#coPlace");
    btn.disabled = true;
    btn.textContent = "Placing order…";
    setTimeout(() => {
      const orderId = "RN-" + Date.now().toString(36).toUpperCase().slice(-6);
      const items = cartQty();
      state.cart = {};
      state.promo = null;
      state.giftWrap = false;
      save();
      updateCart();
      renderGrid();
      $("#checkoutBody").innerHTML = `${closeBtn}
        <div class="success">
          <div class="success__icon">${icon("check")}</div>
          <h3>Thank you, ${esc(checkout.data.name.split(" ")[0])}!</h3>
          <p>Your order <span class="order-id">${orderId}</span> is confirmed. We've sent the details to <b>${esc(checkout.data.email)}</b>.</p>
          <p class="muted">By choosing upcycled, you just rescued roughly <b>${items * 1.4 | 0 || 1} kg</b> of material from landfill and planted a tree ${icon("tree")}</p>
          <button class="btn btn--primary" data-close>Back to the shop</button>
        </div>`;
      confetti();
    }, 1100);
  }

  function esc(s = "") {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* =========================================================
     Little delights: toast, confetti, counters, reveal
     ========================================================= */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.innerHTML = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
  }

  function confetti() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = $("#confetti");
    const ctx = cv.getContext("2d");
    cv.width = innerWidth; cv.height = innerHeight;
    const colors = ["#2F5D50", "#D96C4A", "#E8B04B", "#7FB7BE", "#9CC59A"];
    const bits = Array.from({ length: 160 }, () => ({
      x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight / 2,
      vx: (Math.random() - .5) * 16, vy: Math.random() * -16 - 4,
      s: Math.random() * 8 + 5, r: Math.random() * 6, vr: (Math.random() - .5) * .3,
      c: colors[(Math.random() * colors.length) | 0], leaf: Math.random() > .6,
    }));
    let frame = 0;
    (function tick() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      bits.forEach((b) => {
        b.vy += .4; b.vx *= .99; b.x += b.vx; b.y += b.vy; b.r += b.vr;
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r); ctx.fillStyle = b.c;
        if (b.leaf) { ctx.beginPath(); ctx.ellipse(0, 0, b.s, b.s / 2.2, 0, 0, Math.PI * 2); ctx.fill(); }
        else ctx.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2);
        ctx.restore();
      });
      if (++frame < 180) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, cv.width, cv.height);
    })();
  }

  function animateCounters(root) {
    $$("[data-count]", root).forEach((el) => {
      const target = +el.dataset.count;
      const start = performance.now();
      const dur = 1800;
      (function step(now) {
        const k = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))).toLocaleString(STORE.locale) + (k === 1 && target > 100 ? "+" : "");
        if (k < 1) requestAnimationFrame(step);
      })(start);
    });
  }

  function setupObservers() {
    $$(".section__head, .steps li, .reviews figure, .kits, .newsletter, [data-reveal]").forEach((el) => el.classList.add("reveal"));
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    }), { threshold: .15 });
    $$(".reveal").forEach((el) => io.observe(el));

    const impactIO = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { animateCounters(e.target); impactIO.disconnect(); }
    }, { threshold: .4 });
    if ($("#impact")) impactIO.observe($("#impact"));

    const header = $(".header");
    if (header) addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 10), { passive: true });
  }

  /* =========================================================
     Events (delegated)
     ========================================================= */
  function goToShop(filter) {
    if (filter) { state.filter = filter; renderGrid(); }
    close();
    $("#shop").scrollIntoView({ behavior: "smooth" });
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, [data-quick], a");
    if (!t) return;
    const d = t.dataset;

    if (d.wish) { e.stopPropagation(); return toggleWish(+d.wish); }
    if (d.add) { const id = +d.add; return state.cart[id] ? open($("#cartDrawer")) : addToCart(id); }
    if (d.quick) return quickView(+d.quick);
    if (d.inc) return setQty(+d.inc, state.cart[d.inc] + 1);
    if (d.dec) return setQty(+d.dec, state.cart[d.dec] - 1);
    if (d.remove) { setQty(+d.remove, 0); return toast("Removed from basket"); }
    if (d.move) { const id = +d.move; state.wish.delete(id); addToCart(id); renderWish(); return; }
    if (d.filter) { state.filter = d.filter; return renderGrid(); }
    if (d.jumpCat) return goToShop(d.jumpCat);
    if ("goShop" in d) return goToShop();
    if ("close" in d) return close();
    if (t.id === "toCheckout") { checkout.step = 1; renderCheckout(); return open($("#checkout")); }
    if (t.closest("#nav") && t.tagName === "A") return close();
  });

  $("#cartBtn").onclick = () => { updateCart(); open($("#cartDrawer")); };
  $("#wishBtn").onclick = () => { renderWish(); open($("#wishDrawer")); };
  $("#menuToggle").onclick = () => { close(); $("#nav").classList.add("open"); $("#overlay").hidden = false; document.body.classList.add("locked"); };
  $("#overlay").onclick = close;
  $("#searchBtn").onclick = () => { $("#shop").scrollIntoView({ behavior: "smooth" }); setTimeout(() => $("#searchInput").focus({ preventScroll: true }), 500); };
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  let searchTimer;
  $("#searchInput").addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { state.search = e.target.value; renderGrid(); }, 150);
  });
  $("#sortSelect").addEventListener("change", (e) => { state.sort = e.target.value; renderGrid(); });
  $("#resetFilters").onclick = () => {
    state.filter = "all"; state.search = ""; $("#searchInput").value = ""; renderGrid();
  };

  document.addEventListener("submit", (e) => {
    if (e.target.id === "promoForm") {
      e.preventDefault();
      const code = e.target.code.value.trim().toUpperCase();
      if (STORE.promoCodes[code]) {
        state.promo = code; save(); updateCart();
        toast(`${icon("party")} ${Math.round(STORE.promoCodes[code] * 100)}% off applied!`);
      } else toast("Hmm, that code didn't work");
    }
    if (e.target.id === "newsForm") {
      e.preventDefault();
      e.target.innerHTML = `<p style="font-weight:700;font-size:1.1rem">${icon("party")} Welcome! Use code <span class="order-id">RENEST10</span> at checkout.</p>`;
    }
  });
  document.addEventListener("change", (e) => {
    if (e.target.id === "giftWrap") { state.giftWrap = e.target.checked; updateCart(); }
  });

  /* ---------- Init ---------- */
  const heroPicks = [[1, "#heroA"], [7, "#heroB"], [4, "#heroC"]];
  heroPicks.forEach(([id, sel]) => { const el = $(sel); if (el) { el.innerHTML = thumb(byId(id)); el.classList.toggle("has-photo", !!byId(id).image); } });
  if ($("#kitsArt")) $("#kitsArt").innerHTML = [14, 15].map((id) => { const p = byId(id); return `<div class="art-bg${p.image ? " has-photo" : ""}" style="background-color:${p.bg}">${thumb(p)}</div>`; }).join("");
  // Generic hook: <div data-art="3" data-art-bg> renders product #3's illustration (and its colour)
  $$("[data-art]").forEach((el) => {
    const p = byId(+el.dataset.art);
    if (!p) return;
    el.innerHTML = thumb(p);
    if (p.image) {
      el.classList.add("has-photo");
      if (getComputedStyle(el).position === "static") el.style.position = "relative";
    }
    if (el.hasAttribute("data-art-bg")) el.style.backgroundColor = p.bg;
  });
  if ($("#year")) $("#year").textContent = new Date().getFullYear();

  renderCategories();
  renderGrid();
  updateCart();
  renderWish();
  setupObservers();
})();
