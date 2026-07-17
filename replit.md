# Nexgen Digital Marketing Solutions

A polished Vite SPA for Nexgen, a digital marketing agency based in Ahmedabad. Built with React 19, TanStack Router v1, Tailwind CSS v4, Framer Motion, and Radix UI.

## How to run

```bash
bun run dev      # dev server on port 5000
bun run build    # production build → dist/
bun run preview  # preview production build
```

The workflow "Start application" runs `bun run dev` and serves on **port 5000**.

## Deploy to Vercel

1. `bun run build` — outputs to `dist/`
2. Set Vercel framework to **Other** (or Vite)
3. Build command: `bun run build`, Output directory: `dist`
4. `vercel.json` already rewrites all routes to `index.html` for SPA routing

## Key architecture

| Layer | Technology |
|-------|-----------|
| Framework | Vite SPA (React 19) |
| Routing | TanStack Router v1 (file-based, `src/routes/`) |
| State | TanStack Query v5 (via router context) |
| Styling | Tailwind CSS v4 + custom glass utilities |
| Animation | Framer Motion v12 |
| UI primitives | Radix UI + shadcn/ui components |

## Video backgrounds

- `public/videos/hero-light.mp4` — hero section background (light mode)
- `public/videos/hero-dark.mp4` — full-page background (dark mode)

Videos autoplay muted, looping. Dark mode video covers the entire page via `DarkModeVideoBackground` component (fixed, `z-0`). Sections become semi-transparent in dark mode via CSS so the video shows through.

## Theme

Dark/light mode is toggled by `ThemeToggle` (top-right). Theme is persisted in `localStorage` under `nexgen-theme`. Applied as a `.dark` class on `<html>` before first paint (inline script in `index.html`).

## Site data

All content (services, reviews, contact details, brand info) lives in `src/lib/site-data.ts`.

## User preferences

- Keep existing project structure — do not restructure or migrate without asking
- Logo is currently an "N" letter mark (placeholder until real logo is provided)
