# prakhars17.dev

Personal site built with Astro 7 + Tailwind CSS v4 + Biome.

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # production build → dist/
pnpm preview      # preview built output
pnpm check        # biome lint + format (auto-fixes)
pnpm exec astro check  # TypeScript type-check
```

## Stack

- **Astro 7.0.3** — static site, strict TypeScript
- **Tailwind CSS v4.3.1** — via `@tailwindcss/vite` Vite plugin; CSS-first config (`@import "tailwindcss"` in `src/styles/global.css`); no `tailwind.config.js`
- **Biome 2.5.1** — sole formatter and linter; do not use Prettier or ESLint
- **semantic-release** — releases cut automatically when commits land on `main`; tags + CHANGELOG + GitHub Release are all generated

## Conventions

- **Conventional Commits are required** — enforced by lefthook `commit-msg` hook; e.g. `feat:`, `fix:`, `chore:`. Bad messages are rejected locally and determine the release version bump.
- **No `^` in deps** — all versions in `package.json` are exact-pinned; bump explicitly.
- **No layout components** — pages are flat, self-contained `.astro` files; do not create `src/layouts/`.
- **`main` = release** — merging to `main` triggers the CI release workflow; keep `main` clean.
- Development happens on `develop`; PRs go `develop` → `main`.

## Config file locations

Most tooling config lives in `package.json` (under `"commitlint"` and `"release"` keys) to minimize root clutter. Exceptions that cannot move:
- `biome.json` — Biome only reads its own file
- `lefthook.yml` — lefthook only reads its own file
- `pnpm-workspace.yaml` — pnpm workspace/build settings
