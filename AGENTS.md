# AGENTS.md

## Project

Fuwari-based static blog (Astro 6 + Svelte 5 + Tailwind CSS 3). Deployed to Cloudflare Pages and GitHub Pages.
Site: `https://hhz114514.qzz.io/`

## Package manager

**pnpm only.** The `preinstall` script enforces this with `npx only-allow pnpm`. Do not use npm/yarn.

## Commands

| Command | Action |
|---|---|
| `pnpm install` | Install deps |
| `pnpm dev` | Dev server at `localhost:4321` use this more|
| `pnpm new-post <filename>` | Create new post in `src/content/posts/` |
| `pnpm build` | Build to `./dist/` (runs `astro build && pagefind --site dist`) don't use this,cloudlfare will build on cloud|
| `pnpm preview` | Preview built site locally |
| `pnpm check` | Astro type check (`astro check`) |
| `pnpm type-check` | Raw TypeScript check (`tsc --noEmit --isolatedDeclarations`) |
| `pnpm lint` | Biome lint + auto-fix (`biome check --write ./src`) |
| `pnpm format` | Biome format (`biome format --write ./src`) |
| `pnpm astro ...` | Pass-through to Astro CLI |

**Build quirk:** `pnpm build` runs Pagefind as a post-build step. If you modify `pnpm build`, keep `pagefind --site dist` at the end or search will break.

**Verification order:** `pnpm lint` -> `pnpm check` (or `pnpm type-check`). CI runs Biome and Astro check as separate workflows.

## Architecture

- **Content:** `src/content/posts/*.md` (or `.mdx`). Schema defined in `src/content.config.ts`. Frontmatter fields: `title`, `published`, `description`, `image`, `tags`, `category`, `draft`, `lang`, `pinned`.
- **Config:** `src/config.ts` — site title, nav links, profile, license, theme hue, banner, background, TOC, favicon.
- **Pages:** `src/pages/` — Astro page components.
- **Components:** `src/components/` — Astro + Svelte (`.svelte`) components.
- **Plugins:** `src/plugins/` — custom rehype/remark plugins (figures, email protection, admonitions, GitHub cards, URL cards, image width, excerpt, reading time).
- **i18n:** `src/i18n/` — translation system. Site language is `zh_CN` in config.
- **Styles:** `src/styles/` — global CSS, Tailwind config in `tailwind.config.cjs`.

## Path aliases

```
@/*        -> src/*
@components/* -> src/components/*
@assets/*     -> src/assets/*
@constants/*  -> src/constants/*
@utils/*      -> src/utils/*
@i18n/*       -> src/i18n/*
@layouts/*    -> src/layouts/*
```

## Code style

- **Formatter:** Biome, tabs for indentation, double quotes for JS/TS.
- **Svelte/Astro files:** `useConst` and `useImportType` rules are disabled (Biome override).
- CSS files in `src/**/*.css` are excluded from Biome.

## Deployment

- **Cloudflare Pages:** Primary deploy target. Uses `@astrojs/cloudflare` adapter. Wrangler config in `wrangler.jsonc` (project name: `hhz-blog`).
- **GitHub Pages:** Secondary deploy via `.github/workflows/deloy.yml` (typo in filename is intentional).
- **Vercel:** `vercel.json` is empty — not actively used.

## CI

- `build.yml` — Astro check + build on Node 22/23, push/PR to `main`.
- `biome.yml` — Biome CI on `./src`, push/PR to `main`.
- `deloy.yml` — Deploy to GitHub Pages on push to `main`.

## Content frontmatter schema

```yaml
title: string (required)
published: date (required)
updated: date (optional)
draft: boolean (default: false)
description: string (default: "")
image: string (default: "")
tags: string[] (default: [])
category: string | null (default: "")
lang: string (default: "") — set only if different from site lang
pinned: boolean (default: false)
```

## Markdown extensions

- Admonitions: `:::note`, `:::tip`, `:::important`, `:::caution`, `:::warning`
- GitHub repo cards: `::github[owner/repo]`
- URL cards: `::url[title](link)`
- KaTeX math support
- Expressive Code for code blocks (collapsible sections, line numbers, custom copy button)
- Custom image width syntax
