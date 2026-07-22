# My Comic Books (mycomicbooks.ca)

React + Vite rebuild of [mycomicbooks.ca](https://mycomicbooks.ca), migrated off GoDaddy Website Builder. Content is static JS data; images live under `public/site/`.

## Stack

- React 19 + React Router 7
- Vite 8
- Tailwind CSS 4

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve dist/ locally
npm run lint
```

## Project layout

| Area | Path |
|------|------|
| Routes | `src/App.jsx` |
| Pages | `src/pages/` |
| Layout / header / footer | `src/components/` |
| Homepage + blog copy | `src/data/siteContent.js` |
| Inventory | `src/data/stockInventory.js` |
| Images | `public/site/` (hero, gallery, blog, stock covers) |
| Styles | `src/index.css` |

### Routes

- `/` — Home
- `/f` — Blog index
- `/f/:slug` — Blog post
- `/whats-in-stock` — Comic inventory

### Editing content

- Homepage / blog → `src/data/siteContent.js`
- Inventory → `src/data/stockInventory.js` + cover image in `public/site/stock/`
- Colors / fonts → `src/index.css` `@theme` block

## Deploy to Vercel

Configured via `vercel.json` (Vite build → `dist`, SPA rewrites). Production is live at:

**https://mycomicbooks-ca.vercel.app**

Redeploy after changes:

```bash
npx vercel --prod
```

Or connect a GitHub repo in the Vercel dashboard for automatic deploys on push.

### Point mycomicbooks.ca at Vercel

1. In the Vercel project → **Settings → Domains** → ensure `mycomicbooks.ca` (and optionally `www`) are attached.
2. At your DNS host (domain can stay on GoDaddy):
   - **Apex** (`mycomicbooks.ca`): A record → `76.76.21.21` (or the value Vercel shows).
   - **www**: CNAME → `cname.vercel-dns.com` (or the exact target Vercel shows).
3. Wait for DNS + HTTPS to go green in Vercel.
4. Once verified, turn off GoDaddy Website Builder hosting. Keep the domain registration if you want.

## Notes

- Inventory wording intentionally matches the live GoDaddy page (including legacy typos).
- Blog path `/f` mirrors the legacy URL structure.
- Contact / newsletter are mailto links to `sales@mycomicbooks.ca` (no backend).
