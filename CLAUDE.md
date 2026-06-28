# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# prakhars17.dev

Personal site built with Astro 7 + Tailwind CSS v4 + Biome.

## Architecture

Single-page static site. `src/pages/index.astro` is the only page: it owns the `<html>`/`<head>` (meta tags, OG/Twitter cards, `<Font>` preload, `global.css` import) and composes the page body from section components in `src/components/` — `Nav`, then inside `<main>`: `Hero`, `About`, `Work`, `Projects`, `Contact`. Each component is a self-contained section with its own content (often hard-coded `const` arrays of data) and Tailwind markup; they take no props. To edit page content, edit the relevant section component.

Images go through Astro's `<Image>` component (`astro:assets`) with imported assets from `src/assets/images/`; `sharp` handles optimization at build time. `public/` holds raw passthrough files (e.g. `Prakhar_Saxena_Resume.pdf`, `favicon.svg`).

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # production build → dist/
pnpm preview      # preview built output
pnpm check        # biome lint + format (auto-fixes)
pnpm exec astro check  # TypeScript type-check
```

## Docs

Always check the latest docs before implementing anything new:
- **Astro**: https://docs.astro.build/
- **Tailwind CSS v4**: https://tailwindcss.com/docs

## Stack

- **Astro 7.0.3** — static site, strict TypeScript
- **Tailwind CSS v4.3.1** — via `@tailwindcss/vite` Vite plugin; CSS-first config (`@import "tailwindcss"` in `src/styles/global.css`); no `tailwind.config.js`
- **Biome 2.5.1** — sole formatter and linter; do not use Prettier or ESLint
- **semantic-release** — releases cut automatically when commits land on `main`; tags + CHANGELOG + GitHub Release are all generated

## Fonts

Fonts are loaded via **Astro's font API** (`fontProviders.local()` in `astro.config.mjs`) — not `@font-face` in CSS. Font files live in `src/assets/fonts/`.

Currently configured:
- **Syne** (variable, 100–900) — `cssVariable: "--font-syne"` → Tailwind utility `font-syne`

To use a font, add `<Font cssVariable="--font-syne" preload />` in the page `<head>` (imported from `astro:assets`). The `@theme` block in `global.css` registers the variable as a Tailwind utility; Astro's `<Font />` component injects the `@font-face` and preload at runtime.

## CSS conventions

`src/styles/global.css` has these distinct blocks:
- **`@theme {}`** — Tailwind design tokens (font families). Adding `--font-*` here creates a `font-*` utility class.
- **`:root {}`** — site color palette as plain CSS vars. Surface/structure tokens (`--accent`, `--bg`, `--border`, `--card`, `--hairline`) and text tokens (`--ink`, `--ink-soft`, `--ink-mid`, `--muted`, `--faint`, `--btn-border`).
- **base styles** — smooth scroll (disabled under `prefers-reduced-motion`), plus `::selection` and `:focus-visible` tied to `--accent`.

Reference these vars with Tailwind v4's CSS-var shorthand — `bg-(--accent)`, `text-(--ink)`, `border-(--border)` — **not** the older `bg-[var(--accent)]` form. This is the convention used throughout the components; match it.

## Conventions

- **Conventional Commits are required** — enforced by lefthook `commit-msg` hook; e.g. `feat:`, `fix:`, `chore:`. Bad messages are rejected locally and determine the release version bump.
- **lefthook `pre-commit`** runs `biome check --write` on staged files and re-stages fixes — formatting is applied automatically on commit.
- **No `^` in deps** — all versions in `package.json` are exact-pinned; bump explicitly.
- **No layout components** — do not create `src/layouts/`. `index.astro` owns the document shell directly and composes `src/components/` sections; keep that pattern rather than introducing a layout wrapper.
- **`main` = release** — merging to `main` triggers the CI release workflow; keep `main` clean.
- Development happens on `develop`; PRs go `develop` → `main`.

## Config file locations

Most tooling config lives in `package.json` (under `"commitlint"` and `"release"` keys) to minimize root clutter. Exceptions that cannot move:
- `biome.json` — Biome only reads its own file
- `lefthook.yml` — lefthook only reads its own file
- `pnpm-workspace.yaml` — pnpm workspace/build settings
