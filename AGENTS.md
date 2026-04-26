# AGENTS.md

## Project
Personalized [Fuwari](https://github.com/saicaca/fuwari) Astro blog fork. 

## Commands
- `pnpm dev` - dev server at localhost:4321
- `pnpm build` - runs `astro build && pagefind --site dist` (both steps required)
- `pnpm check` - `pnpm astro check`
- `pnpm type-check` - `tsc --noEmit --isolatedDeclarations`
- `pnpm lint` - Biome lint + fix on `./src`
- `pnpm format` - Biome format + write on `./src`
- `pnpm new-post ` - scaffold post in `src/content/posts/` (auto-adds `.md`, supports subdirectories)

## Order matters
CI (`build.yml`): `pnpm astro check` → `pnpm astro build`

## Linting/Formatting
Biome only (not ESLint/Prettier). Indent: tabs. Code files (`.astro`, `.svelte`) have relaxed rules (no `useConst`/`useImportType` warnings, no `noUnusedVariables`/`noUnusedImports`).

## Build & Deploy
- Adapter: `@astrojs/cloudflare` (configured for Cloudflare Pages)
- Deploy CI: uses `withastro/action` (GitHub Pages), ignores local adapter in CI
- `dist/` is build output; `pagefind` index lives there post-build
- `sharp` is a required runtime dependency (not dev-only)

## Plugins
Custom MD processing in `src/plugins/`: admonitions, GitHub cards, URL cards, reading time, excerpt, image width, KaTeX, email protection, etc. These are wired in `astro.config.mjs`.

## Config
- `src/config.ts` - site title, navbar, profile, theme, license
- `astro.config.mjs` - Astro + integrations config
- `biome.json` - lint/format rules

## Post Frontmatter
```yaml
title, published, description, image, tags, category, draft, lang
```

## Requirements
- Node.js 22-23, pnpm 10 (enforced by preinstall hook)