# Frontend Migration Design: Remove Bootstrap, Replace with shadcn/ui

## Folder Structure
- `src/components/ui/`
  - extend with missing primitives: `alert`, `badge`, `dialog`, `dropdown-menu`, `input`, `table`, optionally `checkbox`
- `src/components/common/`
  - keep shared wrappers only where they remove duplication across feature areas
- `src/components/nav.tsx`
  - rebuild navigation with shadcn primitives and Tailwind layout
- `pages/dashboard/**`
  - replace page-level Bootstrap layout wrappers with plain Tailwind containers

## Component Breakdown
- `Button`
  - use existing `src/components/ui/button.tsx`
- `Container`, `Row`, `Col`
  - replace with `div` wrappers using `mx-auto`, `max-w-*`, `grid`, `flex`, `gap-*`, `px-*`, `py-*`
- `Navbar`, `Nav`, `NavDropdown`
  - replace with responsive header + dropdown menu or collapsible menu
- `Modal`
  - replace with shadcn `Dialog`
- `Alert`
  - replace with shadcn `Alert` plus a local variant union type
- `Badge`
  - replace with shadcn `Badge`
- `Table`
  - use shadcn `Table` or a thin local wrapper for repeated table styling
- `Form`, `FormControl`
  - replace with semantic form elements and shadcn `Input`

## Migration Sequence
1. Add missing UI primitives in `src/components/ui/`.
2. Replace shared infrastructure:
   - `src/components/nav.tsx`
   - `src/components/common/modal.tsx`
   - `src/components/common/alert.tsx`
   - `src/stores/alert.ts`
3. Replace page layout wrappers in `pages/dashboard/**`.
4. Migrate feature components by domain:
   - `src/components/binance/history/*`
   - `src/components/binance/future_log/*`
   - `src/components/binance/future_xgb_log/*`
   - `src/components/binance/config/*`
   - `src/components/posts/*`
5. Remove dependencies after import count reaches zero.

## Page Flow
- Login remains unchanged except for any downstream navigation styling effects.
- Dashboard pages load:
  - top navigation
  - page container
  - filter/action areas
  - data table/list content
  - modal/alert overlays
- Flow parity matters more than exact Bootstrap appearance.

## API Hooks Structure
- Keep existing hooks and API calls in place.
- Do not mix transport changes into the migration.
- UI rewrites must treat hooks as stable interfaces.

## State Management Suggestion
- Keep Zustand stores where already present.
- Avoid adding new global state for layout migration.
- Limit state additions to local UI concerns such as menu open state or dialog visibility.

## Loading, Error, and Empty States
- Preserve current loading buttons, spinners, and disabled states.
- Preserve empty tables/lists and no-result filter states.
- Preserve visible error messaging for form submits and async actions.

## Responsive Behavior Notes
- Use a single consistent dashboard width container.
- Prefer CSS grid/flex with explicit gaps rather than one-off wrappers.
- Treat the navbar migration as the breakpoint reference implementation for the rest of the dashboard.

## Risks
- Navbar replacement can regress mobile usability if menu state and focus behavior are not handled cleanly.
- Mixed inline styles and Tailwind classes may leave inconsistent spacing unless normalized during migration.
- Tables and dense admin pages may lose scanability if generic card layouts replace structured tables.

## Simpler Alternative
Instead of rewriting every page at once, migrate shared primitives and one feature domain first, then validate patterns before scaling to the rest of the dashboard. This reduces regressions and avoids a large review surface.

## Recommendation
Execute the migration in phases:
- Phase 1: shared primitives + navbar
- Phase 2: Binance pages
- Phase 3: Posts pages
- Phase 4: dependency removal and final verification
