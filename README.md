# Target Motors — טרגט מוטורס

Dealer site for Target Motors (parallel import of Toyota and Honda from the US).

**Live site:** https://target1598.github.io/target-motors/

Showroom: 68 Yirmiyahu St, Jerusalem · 077-8053655

## Stack

- TanStack Start + React + Tailwind
- Hebrew first (RTL) with English switch
- Toyota 360 viewer from official US jellies

## Local

```bash
npm install
npm run dev
```

## GitHub Pages

Every push to `main` builds and publishes GitHub Pages via `.github/workflows/pages.yml`.

To point **targetmotors.co.il** at this site:

1. GitHub → repo Settings → Pages → Custom domain → `targetmotors.co.il`
2. At your DNS provider, add a CNAME (or A records GitHub shows) to `target1598.github.io`

## Vercel

The production build is also Vercel-ready (`nitro` preset). Import this repo in Vercel if you want a custom domain with server rendering.
