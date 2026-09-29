# Upcycled home decor & crafts — e-commerce samples

Four design directions for a recycled / upcycled home decor and craft brand, all sharing the same working shop flow. Open `index.html` (the gallery) to compare them.
Plain HTML + CSS + JS: no build step, no dependencies.

## Run locally
```bash
python -m http.server 5174
```
Run it from this folder, then open http://localhost:5174 for the gallery of all four samples.

## Samples
| Folder | Direction |
|---|---|
| `1-renest/` | ReNest: warm, playful, kraft-paper look |
| `2-kabaad/` | Kabaad Co.: bold neo-brutalist pop |
| `3-terra/` | Terra & Thread: calm, premium, editorial |
| `4-scrap/` | Scrap & Story: handmade scrapbook, "guess the past" game, workshop listings |

Samples 2–4 split their styles into `base.css` (shared cart, checkout and card components, driven by CSS variables) and `theme.css` (the look). Each sample's colour palette is set by a short script in its `index.html`, just after `products.js`.
The file table below describes sample 1; the other samples use the same `products.js` and `app.js`.

## Product photos
All four samples show stand-in stock photos (CC0: free for commercial use, no credit required). Sources are listed in [PHOTO-CREDITS.md](PHOTO-CREDITS.md).
- They show *similar* items, not the client's actual products. Swap in the client's photography before launch.
- To replace a photo, edit the `PHOTOS` map near the end of the product list in each sample's `products.js`, e.g. `1: { src: "images/bud-vase-trio.jpg", ... }`. Square or 4:5 photos about 1000px wide work best.
- The photos currently load from Openverse's image service. For a live site, save them in an `images/` folder instead.
- Delete an entry to fall back to that product's illustration.

## Files
| File | What it holds |
|---|---|
| `index.html` | Page structure: hero, collections, shop, process, impact, DIY kits, reviews, newsletter, footer |
| `styles.css` | All styling. Brand colours and fonts are CSS variables at the top (`:root`) |
| `products.js` | **Edit this to manage the catalog**: store settings, categories, products, promo codes |
| `app.js` | Shop logic: filters, search, sort, wishlist, cart, quick view, 3-step checkout |

## Customising
- **Products**: add or edit entries in `PRODUCTS`. Each has a price, an optional `mrp` (shows a sale badge), a `tag`, "made from" and maker details.
- **Real photos**: add `image: "images/vase.jpg"` to a product. The illustration is only used when no photo is set.
- **Shipping and promos**: `STORE.freeShippingAt`, `shippingFee`, `expressFee`, `promoCodes` (demo codes: `RENEST10`, `WELCOME15`).
- **Brand name**: "ReNest" is a placeholder. Search and replace it in `index.html` to use the client's real brand.

## Before going live
Checkout currently **simulates** a successful order. See `placeOrder()` in `app.js`, marked `INTEGRATION POINT`:
1. Send the cart and address to a backend or order API.
2. Open a payment gateway (Razorpay / Cashfree / Stripe) for UPI, card and net banking.
3. Validate prices and promo codes on the server; the ones in the browser are for display only.

Alternatively, the design can be ported to a Shopify or WooCommerce theme if the client wants a managed admin panel.
