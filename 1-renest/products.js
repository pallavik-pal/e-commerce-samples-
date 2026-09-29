/* ------------------------------------------------------------------
   ReNest catalog
   To use real photos, add `image: "images/your-photo.jpg"` to a product;
   the illustrated art is only used when no image is set.
------------------------------------------------------------------- */

const STORE = {
  currency: "₹",
  locale: "en-IN",
  freeShippingAt: 1499,
  shippingFee: 79,
  expressFee: 99,
  promoCodes: { RENEST10: 0.10, WELCOME15: 0.15 },
};

const CATEGORIES = [
  { id: "decor",    name: "Home Decor",    blurb: "Vases, mirrors & wall art", art: "vase",     bg: "#7FB7BE" },
  { id: "lighting", name: "Lighting",      blurb: "Lamps from bottles & tins", art: "lamp",     bg: "#E8B04B" },
  { id: "planters", name: "Planters",      blurb: "Tins & tyres, now green",   art: "planter",  bg: "#9CC59A" },
  { id: "textiles", name: "Soft Textiles", blurb: "Rag rugs, cushions, totes", art: "rug",      bg: "#E79A83" },
  { id: "kitchen",  name: "Table & Kitchen", blurb: "Coasters, bowls & trays", art: "bowl",     bg: "#C9B6E4" },
  { id: "kits",     name: "DIY Craft Kits", blurb: "Make it yourself",         art: "kit",      bg: "#F2C9A0" },
];

const PRODUCTS = [
  { id: 1,  name: "Bottle-Glass Bud Vase Trio", cat: "decor", price: 1290, mrp: 1590, art: "vase", bg: "#7FB7BE", c1: "#2F5D50", c2: "#E8B04B",
    made: "3 rescued wine & soda bottles", maker: "Kaanch Collective, Jaipur", rating: 4.8, reviews: 214, tag: "Bestseller", added: 3,
    desc: "Three hand-cut, flame-polished bottle vases in soft sea tones. Perfect for single stems and dried grasses." },
  { id: 2,  name: "Sari-Silk Rag Rug", cat: "textiles", price: 2490, mrp: 2990, art: "rug", bg: "#E79A83", c1: "#D96C4A", c2: "#2F5D50",
    made: "Offcuts from 6 pre-loved saris", maker: "Dhaaga Women's Co-op, Varanasi", rating: 4.9, reviews: 167, tag: "Loved", added: 5,
    desc: "A braided, reversible rug woven from vibrant silk sari offcuts. Every rug has its own colour story." },
  { id: 3,  name: "Tin-Can Pendant Lamp", cat: "lighting", price: 1850, art: "lamp", bg: "#E8B04B", c1: "#2F5D50", c2: "#D96C4A",
    made: "Reclaimed biscuit tin", maker: "Tinkerbox Studio, Pune", rating: 4.7, reviews: 88, added: 8,
    desc: "Hand-punched patterns throw a warm, dappled glow across your room. Includes cloth cord & E27 holder." },
  { id: 4,  name: "Paint-Tin Herb Planters (Set of 3)", cat: "planters", price: 899, mrp: 1099, art: "planter", bg: "#9CC59A", c1: "#D96C4A", c2: "#2F5D50",
    made: "3 cleaned paint tins", maker: "Green Tin Project, Chennai", rating: 4.6, reviews: 132, tag: "Eco pick", added: 2,
    desc: "Hand-painted tins with drainage holes and jute hangers. Ideal for basil, mint and tiny succulents." },
  { id: 5,  name: "Denim Patchwork Cushion Cover", cat: "textiles", price: 749, art: "cushion", bg: "#A9C6E8", c1: "#3C5A8A", c2: "#E8B04B",
    made: "2 pairs of old jeans", maker: "Blue Thread, Ahmedabad", rating: 4.5, reviews: 76, added: 9,
    desc: "Sturdy 16×16\" cover pieced from rescued denim with contrast kantha stitching. Hidden zip." },
  { id: 6,  name: "Macramé Wall Hanging", cat: "decor", price: 1390, art: "macrame", bg: "#F2C9A0", c1: "#8A5A3C", c2: "#F4EDE1",
    made: "Recycled cotton cord & driftwood", maker: "Knot & Co., Goa", rating: 4.8, reviews: 143, tag: "New", added: 1,
    desc: "Boho wall art knotted by hand from recycled cotton rope on a beach-found driftwood branch." },
  { id: 7,  name: "Jar Soy Candle — Monsoon", cat: "decor", price: 549, art: "candle", bg: "#C9B6E4", c1: "#6B4E9B", c2: "#E8B04B",
    made: "Rescued jam jar", maker: "Petrichor Candles, Shillong", rating: 4.9, reviews: 302, tag: "Bestseller", added: 6,
    desc: "Hand-poured soy wax with notes of wet earth and vetiver, in an upcycled jar you can reuse." },
  { id: 8,  name: "Newspaper-Weave Fruit Bowl", cat: "kitchen", price: 690, art: "bowl", bg: "#F6D98A", c1: "#D96C4A", c2: "#2F5D50",
    made: "40 old newspapers", maker: "Paper Trail Crafts, Kolkata", rating: 4.4, reviews: 58, added: 7,
    desc: "Tightly rolled and woven paper, sealed with a food-safe natural lacquer. Surprisingly sturdy!" },
  { id: 9,  name: "Tyre-Rubber Coaster Set", cat: "kitchen", price: 449, art: "coasters", bg: "#B7D3C8", c1: "#2A2522", c2: "#E8B04B",
    made: "Part of 1 bicycle tyre", maker: "Rubberband Studio, Delhi", rating: 4.6, reviews: 94, added: 10,
    desc: "Set of 4 non-slip, heat-proof coasters cut from retired bicycle tyres, with a cork-backed holder." },
  { id: 10, name: "Pallet-Wood Photo Frame", cat: "decor", price: 799, art: "frame", bg: "#E4C9A8", c1: "#8A5A3C", c2: "#7FB7BE",
    made: "Reclaimed shipping pallet", maker: "Timber Tales, Mysuru", rating: 4.7, reviews: 61, added: 11,
    desc: "Rustic 5×7\" frame sanded and oiled by hand. Every knot and nail-hole kept for character." },
  { id: 11, name: "Rope-Wrapped Round Mirror", cat: "decor", price: 2190, mrp: 2590, art: "mirror", bg: "#F4EDE1", c1: "#C08A4E", c2: "#7FB7BE",
    made: "Old jute rope & salvaged glass", maker: "Knot & Co., Goa", rating: 4.8, reviews: 49, tag: "Limited", added: 4,
    desc: "A 45cm statement mirror wrapped in reclaimed jute rope — nautical, warm and totally unique." },
  { id: 12, name: "Flour-Sack Tote Bag", cat: "textiles", price: 399, art: "tote", bg: "#F6D98A", c1: "#2F5D50", c2: "#D96C4A",
    made: "Recycled flour sacks", maker: "Dhaaga Women's Co-op, Varanasi", rating: 4.5, reviews: 188, added: 12,
    desc: "A roomy, washable market tote made from printed mill sacks. Holds up to 12kg." },
  { id: 13, name: "Bottle Fairy-Light Lamp", cat: "lighting", price: 990, art: "bottlelamp", bg: "#2F5D50", c1: "#7FB7BE", c2: "#E8B04B",
    made: "1 rescued whisky bottle", maker: "Kaanch Collective, Jaipur", rating: 4.7, reviews: 121, tag: "Gift idea", added: 13,
    desc: "USB-powered copper fairy lights glowing inside an upcycled bottle with a cork stopper." },
  { id: 14, name: "Macramé Plant Hanger Kit", cat: "kits", price: 649, art: "kit", bg: "#F2C9A0", c1: "#D96C4A", c2: "#2F5D50",
    made: "Recycled cotton cord", maker: "ReNest Studio", rating: 4.8, reviews: 97, tag: "New", added: 1,
    desc: "Everything you need to knot two plant hangers: pre-cut cord, wooden rings and an illustrated guide." },
  { id: 15, name: "Bottle-Cutting Starter Kit", cat: "kits", price: 1190, art: "kit", bg: "#7FB7BE", c1: "#2F5D50", c2: "#E8B04B",
    made: "Includes 2 rescued bottles", maker: "ReNest Studio", rating: 4.6, reviews: 54, added: 2,
    desc: "Learn to turn bottles into tumblers and planters. Scoring tool, sanding kit, gloves and 2 bottles." },
  { id: 16, name: "Tyre Ottoman Planter", cat: "planters", price: 1690, art: "tyre", bg: "#D9E7B0", c1: "#2A2522", c2: "#D96C4A",
    made: "1 retired scooter tyre", maker: "Rubberband Studio, Delhi", rating: 4.5, reviews: 38, added: 14,
    desc: "A bold, weatherproof planter for balconies, hand-painted and rope-wrapped around a rescued tyre." },
];

/* ------------------------------------------------------------------
   Product photos: free stock stand-ins (CC0, no attribution required)
   via Openverse. Replace each `src` with the client's own photo,
   e.g. "images/bud-vase-trio.jpg". Remove an entry to fall back to
   the illustration.
------------------------------------------------------------------- */
const PHOTOS = {
  1: { src: "https://api.openverse.org/v1/images/01f92566-4409-4539-b790-694b6edec515/thumb/", credit: "Kelly Ishmael (stocksnap, CC0)", page: "https://stocksnap.io/photo/flower-decoration-AZ7E91W5XA" },
  2: { src: "https://api.openverse.org/v1/images/5547db48-9a81-4d9a-a7a6-4e06a774bd58/thumb/", credit: "Catt Liu (stocksnap, CC0)", page: "https://stocksnap.io/photo/rug-floor-3269D623A7" },
  3: { src: "https://api.openverse.org/v1/images/c353d178-a60c-4f82-a4c2-5d57f6d1aaaa/thumb/", credit: "Travel Coffee Book (stocksnap, CC0)", page: "https://stocksnap.io/photo/lamps-lights-184CEE6460" },
  4: { src: "https://api.openverse.org/v1/images/aa4edef0-a6b3-4234-9aad-eec5e545cf35/thumb/", credit: "CupPlante (stocksnap, CC0)", page: "https://stocksnap.io/photo/herbs-pot-BNOT7LSS8O" },
  5: { src: "https://api.openverse.org/v1/images/0a86b783-cc32-4f31-a564-d383ea5169fe/thumb/", credit: "Daria Nepriakhina (stocksnap, CC0)", page: "https://stocksnap.io/photo/pillows-decor-2G3LKXJV9U" },
  6: { src: "https://api.openverse.org/v1/images/8a49fc4e-a69b-4039-8518-a77a6484584c/thumb/", credit: "Artsy Vibes (stocksnap, CC0)", page: "https://stocksnap.io/photo/flower-vase-94MHRSP4BZ" },
  7: { src: "https://api.openverse.org/v1/images/f3b6f645-ae16-43be-b7ec-94d76ae89bc2/thumb/", credit: "Christian Mackie (stocksnap, CC0)", page: "https://stocksnap.io/photo/candle-table-OEYUISMDPN" },
  8: { src: "https://api.openverse.org/v1/images/ced6b720-7124-4184-8dae-a34fb51bac0d/thumb/", credit: "Daria Nepriakhina (stocksnap, CC0)", page: "https://stocksnap.io/photo/basket-fruits-RZT4RP811T" },
  9: { src: "https://api.openverse.org/v1/images/0d8b28b6-c947-4ae0-98c8-ca037d0d6500/thumb/", credit: "Daria Nepriakhina (stocksnap, CC0)", page: "https://stocksnap.io/photo/apple-macbook-14BB9F8552" },
  10: { src: "https://api.openverse.org/v1/images/fdcdb514-4d4b-460e-beed-d969ac7ac16f/thumb/", credit: "Kristin Hardwick (stocksnap, CC0)", page: "https://stocksnap.io/photo/picture-frames-0UGJSGMQJL" },
  11: { src: "https://api.openverse.org/v1/images/119ba4ed-e701-4607-a8a3-7294d31b3d32/thumb/", credit: "Studio 7042 (stocksnap, CC0)", page: "https://stocksnap.io/photo/mirror-livingroom-JRHSFSKQZQ" },
  12: { src: "https://api.openverse.org/v1/images/d54f5ef2-3b7e-4f26-9552-b41c12a903b2/thumb/", credit: "Freestocks.org (stocksnap, CC0)", page: "https://stocksnap.io/photo/burlap-sack-D61LRR4CV8" },
  13: { src: "https://api.openverse.org/v1/images/63b5c782-5217-4d72-87f8-0e560ecea041/thumb/", credit: "Altered Reality (stocksnap, CC0)", page: "https://stocksnap.io/photo/winter-lights-ZAXS7YB4DG" },
  14: { src: "https://api.openverse.org/v1/images/7f02dbf6-321d-44f6-9c8f-387b178ca559/thumb/", credit: "Kristin Hardwick (stocksnap, CC0)", page: "https://stocksnap.io/photo/hanging-plant-MGRB4DRZME" },
  15: { src: "https://api.openverse.org/v1/images/9c51158d-184e-4754-a83b-486796c0d32e/thumb/", credit: "Skitter Photo (stocksnap, CC0)", page: "https://stocksnap.io/photo/vintage-crate-UZPHJ4C1LJ" },
  16: { src: "https://api.openverse.org/v1/images/a17b99f4-5429-4a30-92e5-1e81107d7e1f/thumb/", credit: "Neslihan Gunaydin (stocksnap, CC0)", page: "https://stocksnap.io/photo/gardening-pots-WV6Q25F8ZJ" },
};
// Collections borrow a photo from one of their products
const CATEGORY_PHOTO = { decor: 1, lighting: 3, planters: 4, textiles: 2, kitchen: 8, kits: 15 };

PRODUCTS.forEach((p) => { if (!p.image && PHOTOS[p.id]) p.image = PHOTOS[p.id].src; });
CATEGORIES.forEach((c) => { if (!c.image && PHOTOS[CATEGORY_PHOTO[c.id]]) c.image = PHOTOS[CATEGORY_PHOTO[c.id]].src; });

/* ------------------------------------------------------------------
   Illustrated product art (inline SVG). Returns an SVG string.
------------------------------------------------------------------- */
function productArt(type, c1 = "#2F5D50", c2 = "#E8B04B") {
  const ink = "#2A2522", paper = "#FFFDF7";
  const s = `stroke="${ink}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
  const shapes = {
    vase: `
      <ellipse cx="100" cy="168" rx="70" ry="8" fill="${ink}" opacity=".12"/>
      <path d="M52 166V110c0-10 10-14 10-26V64h12v20c0 12 10 16 10 26v56z" fill="${c1}" ${s}/>
      <path d="M88 166V96c0-12 12-16 12-30V44h14v22c0 14 12 18 12 30v70z" fill="${c2}" ${s}/>
      <path d="M130 166v-40c0-8 8-12 8-20V92h10v14c0 8 8 12 8 20v40z" fill="${paper}" ${s}/>
      <path d="M107 44c-6-14-2-26 8-32M107 44c8-10 20-12 28-8" fill="none" ${s}/>
      <circle cx="116" cy="12" r="6" fill="#D96C4A" ${s}/>
      <path d="M68 64c-4-10 0-20 8-24" fill="none" ${s}/>
      <path d="M97 110v40M60 118v30" stroke="${paper}" stroke-width="4" stroke-linecap="round" opacity=".7"/>`,
    rug: `
      <ellipse cx="100" cy="104" rx="84" ry="56" fill="${c1}" ${s}/>
      <ellipse cx="100" cy="104" rx="64" ry="42" fill="${c2}" ${s}/>
      <ellipse cx="100" cy="104" rx="44" ry="28" fill="#E8B04B" ${s}/>
      <ellipse cx="100" cy="104" rx="24" ry="14" fill="${paper}" ${s}/>
      <path d="M22 96l-8-4M20 110l-9 2M178 96l8-4M180 110l9 2" ${s}/>`,
    lamp: `
      <path d="M100 0v58" ${s}/>
      <path d="M92 58h16v10H92z" fill="${ink}"/>
      <path d="M100 68c-34 0-52 30-52 56h104c0-26-18-56-52-56z" fill="${c1}" ${s}/>
      <g fill="#FFE8A3">${[70,86,100,114,130].map((x,i)=>`<circle cx="${x}" cy="${102 + (i%2)*10}" r="3.5"/>`).join("")}<circle cx="100" cy="86" r="3.5"/></g>
      <path d="M48 124h104" ${s}/>
      <circle cx="100" cy="134" r="12" fill="#FFE8A3" ${s}/>
      <path d="M70 160l-10 14M100 166v18M130 160l10 14" stroke="${c2}" stroke-width="4" stroke-linecap="round"/>`,
    bottlelamp: `
      <ellipse cx="100" cy="176" rx="46" ry="7" fill="#000" opacity=".2"/>
      <path d="M70 174v-80c0-16 18-22 18-40V30h24v24c0 18 18 24 18 40v80z" fill="${c1}" fill-opacity=".85" ${s}/>
      <rect x="86" y="16" width="28" height="16" rx="3" fill="#C08A4E" ${s}/>
      <path d="M78 150c14-10 30 8 44-6M80 124c14-12 28 8 42-4M84 98c10-8 24 6 34-2" fill="none" stroke="#C08A4E" stroke-width="2"/>
      <g fill="${c2}">${[[84,146],[100,140],[116,146],[90,120],[108,124],[96,100],[112,96]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4"/>`).join("")}</g>
      <g fill="${c2}" opacity=".35">${[[84,146],[100,140],[116,146],[90,120],[108,124]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9"/>`).join("")}</g>`,
    planter: `
      <ellipse cx="100" cy="172" rx="72" ry="7" fill="${ink}" opacity=".12"/>
      ${[[34,c1],[80,c2],[126,"#E8B04B"]].map(([x,col])=>`
        <rect x="${x}" y="110" width="40" height="60" rx="4" fill="${col}" ${s}/>
        <path d="M${x} 122h40" ${s}/>
        <circle cx="${x+20}" cy="146" r="7" fill="${paper}" ${s}/>`).join("")}
      <path d="M54 110c-2-22-18-30-24-40 16 2 24 16 24 30M54 110c4-20 14-30 26-34-2 16-14 26-26 34" fill="#6FAF6B" ${s}/>
      <path d="M100 110V70M100 86c-12-4-18-14-18-24 12 2 18 12 18 24zM100 78c10-6 20-4 26 2-8 8-18 8-26-2z" fill="#6FAF6B" ${s}/>
      <path d="M146 110c-8-10-4-24 4-30 6 8 6 20-4 30zM146 110c-12-2-18-10-18-18 10 0 16 8 18 18z" fill="#6FAF6B" ${s}/>`,
    cushion: `
      <path d="M40 48q60-16 120 0 14 56 0 110-60 16-120 0-14-56 0-110z" fill="${c1}" ${s}/>
      <path d="M100 42v122M36 102h128" stroke="${paper}" stroke-width="3" stroke-dasharray="6 6"/>
      <path d="M52 60h36v32H52z" fill="#5B7DB1" stroke="${paper}" stroke-width="2" stroke-dasharray="4 4"/>
      <path d="M112 112h36v32h-36z" fill="#5B7DB1" stroke="${paper}" stroke-width="2" stroke-dasharray="4 4"/>
      <circle cx="130" cy="74" r="12" fill="${c2}" ${s}/>
      <path d="M58 118l20 20M78 118l-20 20" stroke="${c2}" stroke-width="4" stroke-linecap="round"/>`,
    macrame: `
      <path d="M30 34c30-6 110-6 140 0" stroke="#8A5A3C" stroke-width="8" stroke-linecap="round" fill="none"/>
      <path d="M100 6 40 34M100 6l60 28" ${s} fill="none"/>
      ${[48,64,80,96,112,128,144].map((x,i)=>`<path d="M${x} 36v${40 + (i%2)*8}" stroke="${c2}" stroke-width="5" stroke-linecap="round"/>`).join("")}
      <path d="M50 76l24 28 26-28 26 28 24-28" fill="none" stroke="${c1}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M74 104l26 30 26-30" fill="none" stroke="${c1}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="100" cy="136" r="7" fill="${c1}"/>
      ${[80,90,100,110,120].map((x,i)=>`<path d="M100 140 ${x} ${184 - Math.abs(2-i)*6}" stroke="${c2}" stroke-width="4" stroke-linecap="round"/>`).join("")}`,
    candle: `
      <ellipse cx="100" cy="176" rx="50" ry="7" fill="${ink}" opacity=".12"/>
      <path d="M62 80h76v84q0 10-10 10H72q-10 0-10-10z" fill="${paper}" fill-opacity=".7" ${s}/>
      <path d="M66 110h68v54q0 6-6 6H72q-6 0-6-6z" fill="${c1}"/>
      <rect x="58" y="66" width="84" height="16" rx="4" fill="${c2}" ${s}/>
      <path d="M100 110V92" ${s}/>
      <path d="M100 92c-10-10-6-24 0-34 6 10 10 24 0 34z" fill="#F7A13B" ${s}/>
      <path d="M100 88c-4-4-2-10 0-14 2 4 4 10 0 14z" fill="#FFE8A3"/>
      <rect x="74" y="128" width="52" height="24" rx="3" fill="${paper}" ${s}/>
      <path d="M82 140h36" stroke="${c1}" stroke-width="3" stroke-linecap="round"/>`,
    bowl: `
      <ellipse cx="100" cy="172" rx="70" ry="7" fill="${ink}" opacity=".12"/>
      <circle cx="80" cy="84" r="20" fill="#E8584A" ${s}/>
      <circle cx="116" cy="80" r="18" fill="#F7A13B" ${s}/>
      <path d="M96 96c10-20 30-30 44-24-6 18-26 30-44 24z" fill="#F6D24A" ${s}/>
      <path d="M26 100h148c0 40-30 68-74 68S26 140 26 100z" fill="${c1}" ${s}/>
      ${[0,1,2,3].map(i=>`<path d="M${36+i*2} ${116+i*14}c${40-i*2} ${10} ${88-i*6} ${10} ${128-i*6} 0" fill="none" stroke="${paper}" stroke-width="2.5" opacity=".75"/>`).join("")}
      <path d="M22 100h156" ${s}/>`,
    coasters: `
      <ellipse cx="100" cy="170" rx="66" ry="8" fill="${ink}" opacity=".12"/>
      ${[0,1,2,3].map(i=>`<ellipse cx="100" cy="${150 - i*14}" rx="58" ry="18" fill="${i===3 ? c1 : "#3A3431"}" ${s}/>`).join("")}
      <ellipse cx="100" cy="108" rx="40" ry="11" fill="none" stroke="${c2}" stroke-width="3" stroke-dasharray="8 6"/>
      <path d="M150 60c-20 0-30 12-30 30h40c0-18-4-30-10-30z" fill="${paper}" ${s} transform="rotate(12 140 76)"/>
      <path d="M126 80h26" stroke="#C08A4E" stroke-width="6" transform="rotate(12 140 76)"/>`,
    frame: `
      <rect x="36" y="30" width="128" height="140" rx="4" fill="#C08A4E" ${s}/>
      <path d="M36 60h128M36 100h128M36 140h128" stroke="#8A5A3C" stroke-width="2"/>
      <rect x="56" y="50" width="88" height="100" fill="${c2}" ${s}/>
      <circle cx="120" cy="76" r="10" fill="#FFE8A3"/>
      <path d="M56 150l30-44 20 26 14-16 24 34z" fill="#2F5D50" stroke="${ink}" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="46" cy="40" r="3" fill="${ink}"/><circle cx="154" cy="40" r="3" fill="${ink}"/>
      <circle cx="46" cy="160" r="3" fill="${ink}"/><circle cx="154" cy="160" r="3" fill="${ink}"/>`,
    mirror: `
      <path d="M100 8v22" ${s}/>
      <circle cx="100" cy="6" r="5" fill="${ink}"/>
      <circle cx="100" cy="104" r="74" fill="${c1}" ${s}/>
      ${Array.from({length: 24}, (_, i) => { const a = i * 15 * Math.PI / 180; return `<path d="M${100+66*Math.cos(a)} ${104+66*Math.sin(a)} L${100+78*Math.cos(a+0.1)} ${104+78*Math.sin(a+0.1)}" stroke="#8A5A3C" stroke-width="3"/>`; }).join("")}
      <circle cx="100" cy="104" r="54" fill="${c2}" ${s}/>
      <path d="M70 84l30-26M76 112l46-40" stroke="${paper}" stroke-width="7" stroke-linecap="round" opacity=".75"/>`,
    tote: `
      <path d="M70 70c0-40 60-40 60 0" fill="none" stroke="${c2}" stroke-width="9" stroke-linecap="round"/>
      <path d="M44 64h112l-8 110H52z" fill="${paper}" ${s}/>
      <path d="M44 64h112l-2 22H46z" fill="${c1}" ${s}/>
      <circle cx="100" cy="126" r="24" fill="none" stroke="${c1}" stroke-width="4"/>
      <path d="M86 126c6-14 22-14 28 0M88 132h24" stroke="${c2}" stroke-width="4" stroke-linecap="round" fill="none"/>
      <text x="100" y="168" text-anchor="middle" font-family="Caveat, cursive" font-size="16" fill="${c1}">ATTA · 10kg</text>`,
    kit: `
      <ellipse cx="100" cy="176" rx="72" ry="7" fill="${ink}" opacity=".12"/>
      <path d="M30 80h140v92H30z" fill="#C8A27A" ${s}/>
      <path d="M22 64h156v22H22z" fill="#D8B48C" ${s}/>
      <path d="M92 64h16v108H92z" fill="${c1}" ${s}/>
      <path d="M100 64c-18-26-44-22-40-6 4 12 26 8 40 6zM100 64c18-26 44-22 40-6-4 12-26 8-40 6z" fill="${c1}" ${s}/>
      <rect x="44" y="104" width="36" height="24" rx="3" fill="${paper}" ${s}/>
      <path d="M50 114h24M50 120h16" stroke="${c2}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="134" cy="128" r="16" fill="${c2}" ${s}/>
      <text x="134" y="134" text-anchor="middle" font-family="Caveat, cursive" font-size="16" fill="${paper}">DIY</text>`,
    tyre: `
      <ellipse cx="100" cy="172" rx="76" ry="8" fill="${ink}" opacity=".12"/>
      <path d="M36 110v44c0 12 28 20 64 20s64-8 64-20v-44" fill="${c1}" ${s}/>
      ${[0,1,2,3,4,5,6].map(i=>`<path d="M${46+i*18} ${118 + (i===0||i===6?-2:4)}v${40}" stroke="#4A4441" stroke-width="3"/>`).join("")}
      <path d="M40 140c0 10 28 18 60 18s60-8 60-18" stroke="${c2}" stroke-width="7" fill="none"/>
      <ellipse cx="100" cy="110" rx="64" ry="18" fill="#6FAF6B" ${s}/>
      <path d="M72 108c-6-22 2-40 14-46-2 18-6 32-14 46zM100 106c0-24 10-40 24-44-2 20-10 34-24 44zM126 110c10-14 20-18 30-16-6 10-16 16-30 16z" fill="#4F8F4C" ${s}/>
      <circle cx="84" cy="102" r="5" fill="#F7A13B"/><circle cx="116" cy="98" r="5" fill="#E8584A"/>`,
  };
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${shapes[type] || shapes.kit}</svg>`;
}
