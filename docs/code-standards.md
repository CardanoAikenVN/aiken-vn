# Code Standards: Vietnamese Aiken

This document defines the coding conventions, patterns, and quality requirements for the Vietnamese Aiken project. All contributors must follow these standards.

## Language and Framework Conventions

### TypeScript / React

- **TypeScript-first** for all new components. Plain JavaScript acceptable only for Docusaurus config and legacy modules.
- Use `React.FC<Props>` with explicit interface definitions for component props.
- Functional components only. No class components.
- Hooks ordering: `useState` → `useEffect` → `useRef` → custom hooks.
- Event handlers: prefix with `handle` (e.g., `handleClick`, `handleSubmit`).
- Imports: external packages first, then internal/relative imports, separated by blank line.

### Aiken

- Target **stdlib v2.2.0** for all smart contract code.
- All validators must include an `else(_) { fail }` catch-all handler.
- Use `expect` for pattern matching instead of nested `when` where possible.
- Document all public types and exported functions with `///` doc comments.

### Markdown / MDX

- All lesson files must be valid Markdown with Docusaurus MDX extensions.
- Use Docusaurus admonitions (`:::tip`, `:::info`, `:::warning`, `:::danger`, `:::note`) for callouts.
- Mermaid diagrams supported via fenced code blocks with `mermaid` language tag.

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Documentation files | `NN_Title_Name.md` | `01_Installation.md` |
| Documentation directories | `NN-kebab-case/` | `01-the-aiken-foundation/` |
| React components (TSX) | `PascalCase.tsx` | `Hero.tsx`, `QuestTimeline.tsx` |
| TypeScript modules | `camelCase.ts` | `types.ts`, `constants.ts` |
| JavaScript utilities | `camelCase.js` | `tracking.js`, `firebase.js` |
| CSS files | `kebab-case.css` | `custom.css` |
| Config files | `kebab-case.ext` | `docusaurus.config.js` |
| Aiken validators | `snake_case.ak` | `escrow.ak`, `nft_policy.ak` |
| Aiken test files | `*_test.ak` | `escrow_test.ak` |

## Variable and Identifier Naming

| Type | Convention | Example |
|------|-----------|---------|
| React components | PascalCase | `HeroSection`, `FeatureCard` |
| Component props | camelCase | `isActive`, `onClick`, `userName` |
| Event handlers | `handle` + Event | `handleClick`, `handleSubmit` |
| Boolean variables | `is`/`has`/`can` prefix | `isLoading`, `hasError` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_ITEMS`, `API_URL` |
| CSS classes | kebab-case | `hero-section`, `feature-card` |
| Aiken types | CamelCase | `MyDatum`, `EscrowRedeemer` |
| Aiken functions/variables | snake_case | `check_signature`, `escrow_complete` |

## Component Patterns

Every React component file follows this order:
1. External imports
2. Internal imports
3. Props interface
4. Component definition with `React.FC<Props>`
5. Hooks
6. Event handlers
7. Render
8. Default export

### Required Practices

- Always define a props interface (no inline types).
- Use default values via destructuring, not `defaultProps`.
- Include ARIA attributes on interactive and landmark elements.
- Use semantic HTML (`<section>`, `<nav>`, `<main>`, `<article>`).

See [DEVELOPER_GUIDE.md](../DEVELOPER_GUIDE.md) for annotated templates.

## Styling Approach

The project uses three styling systems:

1. **Tailwind CSS 3.4** — Primary styling via utility classes
2. **Infima** — Docusaurus default CSS framework
3. **CSS Modules / custom.css** — Global overrides and animations

### Tailwind Class Ordering

```
1. Layout        (flex, grid, items-center, justify-center)
2. Size          (w-full, max-w-lg, h-auto, min-h-screen)
3. Spacing       (p-4, m-2, gap-4)
4. Typography    (text-lg, font-bold, text-white)
5. Background    (bg-gray-900, border, rounded-lg)
6. Effects       (shadow-lg, opacity-90)
7. Transitions   (transition-all, duration-300)
8. States        (hover:bg-gray-800, focus:outline-none)
9. Responsive    (md:flex-row, md:text-xl, lg:px-8)
```

### Design Tokens

Use custom Tailwind tokens from `tailwind.config.js`:

| Token | Hex Value | Usage |
|-------|-----------|-------|
| `retro-bg-primary` | `#0F1B2A` | Main page background |
| `retro-bg-secondary` | `#112030` | Section backgrounds |
| `retro-bg-card` | `#13253A` | Card/block surfaces |
| `retro-color-cyan` | `#5CE1E6` | Primary accent, links |
| `retro-color-cyan-dark` | `#2BBAC0` | Secondary accent |
| `retro-text-heading` | `#FFFFFF` | Heading text |
| `retro-text-body` | `#DDE6ED` | Body text |

### Infima Variable Overrides

Custom Infima variables are defined in `src/css/custom.css`. When modifying theme colors, update Infima variables rather than adding raw CSS.

### Tailwind Configuration Notes

- `preflight: false` — Tailwind reset disabled to avoid conflicts with Infima
- `container` blocklisted to prevent conflicts with Docusaurus layout
- `darkMode` uses both `class` and `[data-theme="dark"]` selectors

## Aiken Smart Contract Patterns

### Validator Structure

Every validator file follows this order:
1. Module doc comment
2. Imports
3. Type definitions
4. Helper functions
5. Validator block with `else(_) { fail }` catch-all

See [DEVELOPER_GUIDE.md](../DEVELOPER_GUIDE.md) for annotated template.

### Test Naming Convention

Pattern: `<function>_<scenario>_<expected_result>`

```aiken
test escrow_complete_succeeds() { ... }
test escrow_complete_fails_wrong_signer() fail { ... }
test escrow_cancel_before_deadline_succeeds() { ... }
```

- Tests that should succeed: no `fail` annotation
- Tests that should fail: annotate with `fail` keyword

## Documentation Standards

### YAML Frontmatter (Required on All Docs)

```yaml
---
title: "Lesson Title in Vietnamese"
sidebar_position: 1
slug: /optional-custom-url
description: "Brief SEO description (1-2 sentences)"
---
```

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Display title (Vietnamese) |
| `sidebar_position` | Yes | Order in sidebar (1+) |
| `slug` | No | Custom URL path |
| `description` | Recommended | SEO meta description |

### Lesson Structure

Every lesson should follow:

1. Title (H1, matching frontmatter title)
2. Opening paragraph (1-2 sentences)
3. Learning objectives (bulleted list)
4. Section content with H2/H3 headings
5. Code examples with language-tagged fenced blocks
6. Summary (key points as bullets)
7. Next lesson link

### Admonition Usage

| Type | When to Use |
|------|-------------|
| `:::tip` | Best practices, shortcuts, helpful hints |
| `:::info` | Supplementary context, background |
| `:::warning` | Common mistakes, important caveats |
| `:::danger` | Security risks, data loss potential |
| `:::note` | Clarifications, additional detail |

## Git Workflow

### Branch Naming

| Pattern | Use Case |
|---------|----------|
| `part-N` | Curriculum part development |
| `feature/*` | New features |
| `fix/*` | Bug fixes |
| `docs/*` | Documentation changes |

### Commit Message Format

```
<type>: <subject>
```

| Type | Meaning |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code restructuring |
| `test` | Adding/updating tests |
| `chore` | Build process, tooling |

Subject: imperative mood, lowercase, no period. Example: `feat: add escrow validator lesson`.

### Pull Request Requirements

- Branch must build cleanly (`npm run build` exits 0)
- Aiken tests must pass if `examples/` modified (`aiken check` exits 0)
- PR description should include what changed and why
- Visual regression screenshots auto-generated by CI

## Testing Standards

### Docusaurus

```bash
npm run build    # Must complete without errors before PR
npm run serve    # Manual verification of rendered output
```

**Build verification:**
- Build completes without errors
- No broken link warnings
- All pages render correctly
- Images load properly
- Navigation works

### Aiken

```bash
cd examples
aiken fmt        # Format check
aiken check      # Run all tests
aiken build      # Compile to Plutus
```

All new validators must include tests covering success and failure paths.

## Accessibility Requirements

Project targets **WCAG 2.1 AA** compliance.

| Requirement | Implementation |
|-------------|---------------|
| Skip navigation | `<a href="#main-content">` |
| Keyboard navigation | All interactive elements focusable, visible focus |
| Screen reader support | ARIA labels on navigation, landmarks, interactive elements |
| Color contrast | 4.5:1 for body, 3:1 for large text |
| Language attribute | `lang="vi"` on root elements |
| Semantic HTML | `<nav>`, `<main>`, `<section>`, `<article>` |
| Focus management | `focus:ring-4` with visible offset |
| Selection styling | Custom selection colors for readability |

## Error Handling

### React Components

Use try-catch for error boundaries. Components should fail gracefully:

```typescript
try {
  // operation
} catch (error) {
  console.error('Operation failed:', error);
  return <ErrorFallback />;
}
```

### Aiken Validators

Always include catch-all handler:

```aiken
validator {
  when redeemer is {
    CompleteAction -> { /* success */ }
    CancelAction -> { /* success */ }
    _other -> fail
  }
}
```

## Documentation Comments

Comments explain **WHY**, not WHAT:

### Comments ARE Required For
- Business logic: Why this specific threshold, formula, or branching
- Security rationale: Why this check exists, what attack it prevents
- Workarounds: What bug/limitation this works around (with link)
- Regex patterns: What the pattern matches (always)
- Protocol references: Which EIP, SIMD, or spec section
- Non-obvious performance: Why this approach over obvious one
- Invariants: Assumptions that must hold for correctness
- Magic numbers: What the number represents and where it comes from

### Comments are FORBIDDEN For
- Comments that repeat what code does
- Commented-out code (delete it)
- Obvious comments ("increment counter")
- Comments instead of good naming
- Summarizing a function with clear name

---

**Related documents:**
- [System Architecture](./system-architecture.md)
- [Codebase Summary](./codebase-summary.md)
- [Project Overview (PDR)](./project-overview-pdr.md)
