# Feature Overview: Remove Bootstrap, Replace with shadcn/ui

## Goal
Remove `bootstrap` and `react-bootstrap` from the frontend UI layer and standardize dashboard UI on `shadcn/ui` primitives plus Tailwind utility classes, without changing existing business behavior.

## Scope
- Replace Bootstrap layout components (`Container`, `Row`, `Col`) with Tailwind layout primitives.
- Replace Bootstrap UI components used in dashboard flows:
  - navigation
  - buttons
  - forms and inputs
  - tables
  - badges
  - alerts
  - modals
  - list groups or dropdown equivalents
- Remove Bootstrap-specific types and styling dependencies from app code.
- Keep route structure, API contracts, and user flows unchanged.

## Out of Scope
- Backend or API behavior changes
- Workflow redesigns
- New business features
- Large visual redesign beyond migration needs

## Functional Requirements
- FR-001: All `react-bootstrap` imports in `pages/` and `src/` must be removed.
- FR-002: Shared Bootstrap-backed components must be replaced with `shadcn/ui` or local Tailwind-based components.
- FR-003: Dashboard navigation must preserve current destinations and logout behavior.
- FR-004: Existing form submissions, filters, pagination, and modal flows must behave the same after migration.
- FR-005: Data tables and list displays must keep current columns, actions, and empty/loading behavior.
- FR-006: Alert and status messaging must remain visible and actionable after migration.
- FR-007: Bootstrap-specific type usage, including alert variant typing, must be replaced with repo-local types.
- FR-008: `bootstrap` and `react-bootstrap` dependencies must be removable from `package.json` after migration.

## Non-Functional Requirements
- NFR-001: The migrated UI must remain responsive across current dashboard breakpoints.
- NFR-002: The migration should be reviewable in phased commits grouped by shared primitives and feature domains.
- NFR-003: The final code must pass `npm run lint` and `npm run build`.

## Edge Cases
- EC-001: Mobile navigation remains usable after removing Bootstrap navbar behavior.
- EC-002: Dialogs retain close behavior, focus handling, and dismissal paths.
- EC-003: Table actions and paginated controls remain usable with long content and narrow widths.
- EC-004: Form validation and disabled/loading states remain visible after component replacement.

## Acceptance Criteria
- AC-001: Given the codebase after migration, when searching for `react-bootstrap`, then no app source imports remain.
- AC-002: Given dashboard pages, when loaded on desktop and mobile widths, then layout and navigation remain usable.
- AC-003: Given existing feature flows on Binance and Posts pages, when users filter, paginate, edit, submit, or open modal UI, then behavior matches the current app.
- AC-004: Given alert and status UI, when success or error states occur, then messages render with clear severity and dismissal behavior where previously supported.
- AC-005: Given dependencies after migration, when `npm run lint` and `npm run build` are executed, then both commands pass.
- AC-006: Given `package.json`, when the migration is complete, then `bootstrap` and `react-bootstrap` can be removed without breaking runtime UI imports.

## Assumptions
- Existing Tailwind and `shadcn/ui` setup is sufficient for adding missing UI primitives.
- The current visual baseline does not need pixel-perfect Bootstrap parity.
- The team accepts phased migration by shared component and feature area rather than a single large rewrite.
