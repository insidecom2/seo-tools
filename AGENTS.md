# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 12 application with page routes in `pages/` and API handlers in `pages/api/`. UI components, hooks, stores, providers, and shared utilities live under `src/` (`src/components`, `src/stores`, `src/lib`, `src/utils`). Database access is defined in `prisma/schema.prisma`. Static assets are in `public/`, and global styles are in `styles/`.

## Build, Test, and Development Commands
- `npm run dev`: start the local Next.js dev server on `http://localhost:3000`.
- `npm run build`: create a production build and catch type/build issues.
- `npm run start`: run the built app locally.
- `npm run lint`: run the Next.js ESLint configuration.

Use `npm` consistently within a single change. Both `package-lock.json` and `yarn.lock` exist, so avoid updating both unless dependency work requires it.

## Coding Style & Naming Conventions
Use TypeScript/TSX for new code. Follow the existing codebase style: 2-space indentation, semicolons, and React function components. Keep page files and components in PascalCase when they export components, and use lowercase route folders/files where the URL shape matters, for example `pages/dashboard/binance/history/index.tsx`. Shared helpers belong in `src/utils` or `src/lib`; Zustand stores follow the current snake_case filenames in `src/stores/`.

Run `npm run lint` before opening a PR. Respect the existing `@/*` path alias from `tsconfig.json`.

## Testing Guidelines
There is no dedicated automated test suite in this repository yet. For now, treat `npm run lint` and `npm run build` as required checks. When adding tests, place them near the feature or in a local `__tests__/` folder, and name them `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines
Recent history uses short Conventional Commit prefixes such as `feat:`. Follow that pattern (`feat:`, `fix:`, `refactor:`, `docs:`) with a concise imperative summary. Keep commits scoped to one concern.

Pull requests should include:
- a short description of the change and affected routes or APIs
- linked issue or task ID when available
- screenshots for UI changes in `pages/dashboard/*`
- verification notes listing commands run, for example `npm run lint` and `npm run build`

## Security & Configuration Tips
Do not commit secrets or real credentials. Keep runtime configuration in environment variables such as `DATABASE_URL`, and review API route changes for auth and input validation before merging.
