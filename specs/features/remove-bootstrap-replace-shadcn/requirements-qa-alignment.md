# Requirements QA Alignment: Remove Bootstrap, Replace with shadcn/ui

## Gate Status
- Status: Approved
- Reviewer Notes: Requirements are testable and the migration can proceed in phases. Main risk is UI regression in shared navigation, modal, and table-heavy dashboard views.

## Requirement Quality Review
| ID | Requirement | Quality | Issue | Resolution Needed |
|----|-------------|---------|-------|-------------------|
| FR-001 | Remove all `react-bootstrap` imports from app source | Good | None | None |
| FR-002 | Replace shared Bootstrap-backed components with shadcn/local Tailwind components | Good | None | None |
| FR-003 | Preserve navigation destinations and logout behavior | Good | None | None |
| FR-004 | Preserve form submit, filter, pagination, and modal behavior | Good | None | None |
| FR-005 | Preserve table/list columns and actions | Good | None | None |
| FR-006 | Preserve alert and status messaging | Good | None | None |
| FR-007 | Replace Bootstrap-specific types with local types | Good | None | None |
| FR-008 | Remove Bootstrap dependencies after migration | Good | None | None |
| NFR-001 | Maintain responsive dashboard behavior | Good | None | None |
| NFR-002 | Keep migration reviewable in phases | Good | None | None |
| NFR-003 | Pass lint and build checks | Good | None | None |
| EC-001 | Mobile navigation must remain usable | Good | None | None |
| EC-002 | Dialog close and focus behavior must hold | Good | None | None |
| EC-003 | Table actions must remain usable on narrow widths | Good | None | None |
| EC-004 | Validation and loading states must remain visible | Good | None | None |

## Acceptance Criteria
### Migration
| AC ID | Source | Acceptance Criterion |
|-------|--------|----------------------|
| AC-001 | Analyst | Given the codebase after migration, when searching for `react-bootstrap`, then no app source imports remain. |
| AC-002 | Analyst | Given dashboard pages, when loaded on desktop and mobile widths, then layout and navigation remain usable. |
| AC-003 | Analyst | Given existing feature flows on Binance and Posts pages, when users filter, paginate, edit, submit, or open modal UI, then behavior matches the current app. |
| AC-004 | Analyst | Given alert and status UI, when success or error states occur, then messages render with clear severity and dismissal behavior where previously supported. |
| AC-005 | Analyst | Given dependencies after migration, when `npm run lint` and `npm run build` are executed, then both commands pass. |
| AC-006 | Analyst | Given `package.json`, when the migration is complete, then `bootstrap` and `react-bootstrap` can be removed without breaking runtime UI imports. |

## Pasted Test Cases
| Test Case ID | Source | Scenario | Steps | Expected Result | Type | Priority | Parse Quality |
|--------------|--------|----------|-------|-----------------|------|----------|---------------|
| TC-001 | Planned | Import audit | Search source for `react-bootstrap` after migration | No app imports remain | Static | High | Good |
| TC-002 | Planned | Navbar desktop/mobile usability | Open dashboard pages at desktop and mobile widths; navigate menus and logout | Menus open, links route correctly, logout still works | Manual | High | Good |
| TC-003 | Planned | Binance history filters | Open history page; apply filters and submit | Data reloads, controls remain usable | Manual | High | Good |
| TC-004 | Planned | Future logs pagination/actions | Open future logs pages; paginate and trigger row/page actions | Controls work and no layout break occurs | Manual | High | Good |
| TC-005 | Planned | Config forms and dialogs | Open config page; create/edit flows; open and close modal UI | Validation, submit, and dismissal behavior remain intact | Manual | High | Good |
| TC-006 | Planned | Posts list and edit flows | Open posts list; trigger row actions; open edit UI | Table actions, badges, and edit flow still work | Manual | High | Good |
| TC-007 | Planned | Alert severity rendering | Trigger success/error UI where available | Alert remains visible with correct styling/semantics | Manual | Medium | Good |
| TC-008 | Planned | Build and lint gate | Run `npm run lint` and `npm run build` | Both commands pass | Integration | High | Good |
| TC-009 | Planned | Dependency removal check | Remove Bootstrap deps after import cleanup and reinstall | App builds without Bootstrap packages | Integration | High | Good |

## AC to Test Case Comparison
| AC ID | Analyst Acceptance Criterion | Matching Test Case ID | Coverage | Notes |
|-------|------------------------------|-----------------------|----------|-------|
| AC-001 | No `react-bootstrap` imports remain | TC-001 | Covered | Static search is sufficient |
| AC-002 | Dashboard layout and navigation usable on desktop/mobile | TC-002 | Covered | Shared navigation is highest-risk area |
| AC-003 | Feature flows preserve behavior | TC-003, TC-004, TC-005, TC-006 | Covered | Split by domain for focus |
| AC-004 | Alert/status UI preserves behavior | TC-007 | Covered | Verify dismissal path if present |
| AC-005 | Lint and build pass | TC-008 | Covered | Required exit gate |
| AC-006 | Bootstrap deps removable | TC-009 | Covered | Must be done after import cleanup |

## QA Traceability Matrix
| Requirement ID | AC ID | Test Case ID | Test Type | Priority | Coverage |
|----------------|-------|--------------|-----------|----------|----------|
| FR-001 | AC-001 | TC-001 | Static | High | Covered |
| FR-002 | AC-003 | TC-003 | Manual | High | Covered |
| FR-002 | AC-003 | TC-004 | Manual | High | Covered |
| FR-002 | AC-003 | TC-005 | Manual | High | Covered |
| FR-002 | AC-003 | TC-006 | Manual | High | Covered |
| FR-003 | AC-002 | TC-002 | Manual | High | Covered |
| FR-004 | AC-003 | TC-003 | Manual | High | Covered |
| FR-004 | AC-003 | TC-004 | Manual | High | Covered |
| FR-004 | AC-003 | TC-005 | Manual | High | Covered |
| FR-005 | AC-003 | TC-004 | Manual | High | Covered |
| FR-005 | AC-003 | TC-006 | Manual | High | Covered |
| FR-006 | AC-004 | TC-007 | Manual | Medium | Covered |
| FR-007 | AC-001 | TC-001 | Static | High | Covered |
| FR-008 | AC-006 | TC-009 | Integration | High | Covered |
| NFR-001 | AC-002 | TC-002 | Manual | High | Covered |
| NFR-002 | AC-003 | TC-003 | Manual | Medium | Covered |
| NFR-003 | AC-005 | TC-008 | Integration | High | Covered |

## Planned Test Cases
| Test Case ID | Scenario | Steps | Expected Result | Type | Priority |
|--------------|----------|-------|-----------------|------|----------|
| TC-001 | Import audit | Run `rg -n "react-bootstrap" pages src` | No matches in app source | Static | High |
| TC-002 | Navbar desktop/mobile usability | Visit dashboard routes on desktop/mobile widths; open menus; click links; logout | Navigation remains usable and routes correctly | Manual | High |
| TC-003 | Binance history filters | Load page; set filters; submit | Data updates and controls remain aligned | Manual | High |
| TC-004 | Future logs pagination/actions | Paginate and trigger available actions | Table actions and pagination still work | Manual | High |
| TC-005 | Config forms and dialogs | Open create/edit UI; validate fields; submit/cancel | Dialog and form states behave correctly | Manual | High |
| TC-006 | Posts list and edit flows | Open posts list; use row actions; open edit flow | UI actions still function | Manual | High |
| TC-007 | Alert severity rendering | Trigger error/success states | Alert content and severity are visible | Manual | Medium |
| TC-008 | Build and lint gate | Run lint and build | Commands pass | Integration | High |
| TC-009 | Dependency removal check | Remove Bootstrap deps and reinstall | Build succeeds without Bootstrap packages | Integration | High |

## Extra or Conflicting Test Cases
| Test Case ID | Issue Type | Reason | Required Action |
|--------------|------------|--------|-----------------|
| None | None | No conflicting cases identified | None |

## Edge Cases and Negative Tests
| ID | Scenario | Expected Handling | Covered By |
|----|----------|-------------------|------------|
| EC-001 | Mobile nav with collapsed menu | Menu opens/closes cleanly and remains keyboard-usable | TC-002 |
| EC-002 | Dialog dismissed by close/overlay/escape | Dialog closes and focus returns predictably | TC-005 |
| EC-003 | Narrow table viewport | Horizontal overflow remains usable without broken actions | TC-004, TC-006 |
| EC-004 | Disabled submit/loading state | User sees disabled/loading feedback during async submit | TC-003, TC-005 |

## Open Questions
- Should the migration preserve current Bootstrap-like visual styling closely, or is a modest Tailwind cleanup acceptable where behavior remains unchanged?

## Implementation Readiness
- Ready for architecture: Yes
- Ready for implementation: Yes
- Blocking gaps:
  - None
