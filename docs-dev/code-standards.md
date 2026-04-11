# Code Standards: Vietnamese Aiken

This document defines the coding conventions, patterns, and quality requirements for the Vietnamese Aiken project. All contributors must follow these standards.

## Language and Framework Conventions

### TypeScript / React

- **TypeScript-first** for all new components. Plain JS is acceptable only for Docusaurus config files and legacy modules.
- Use `React.FC<Props>` with explicit interface definitions for component props.
- Functional components only. No class components.
- Hooks ordering: `useState` -> `useEffect` -> `useRef` -> custom hooks.
- Event handlers: prefix with `handle` (e.g., `handleClick`, `handleSubmit`).
- Imports: external packages first, then internal/relative imports, separated by a blank line.

### Aiken

- Target **stdlib v2.2.0** for all smart contract code.
- All validators must include an `else(_) { fail }` catch-all handler.
- Use `expect` for pattern matching instead of nested `when` where possible.
- Document all public types and exported functions with `///` doc comments.

### Markdown / MDX

- All lesson files must be valid Markdown with Docusaurus MDX extensions.
- Use Docusaurus admonitions (`:::tip`, `:::info`, `:::warning`, `:::danger`, `:::note`) for callouts.
- Mermaid diagrams are supported via fenced code blocks with the `mermaid` language tag.

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Documentation files | `NN_Title_Name.md` | `01_Installation.md` |
| Documentation directories | `NN-kebab-case/` | `01-the-aiken-foundation/` |
| React components (TSX) | `PascalCase.tsx` | `Hero.tsx`, `QuestTimeline.tsx` |
| TypeScript modules | `camelCase.ts` | `types.ts`, `constants.ts` |
| JavaScript utilities | `camelCase.js` | `tracking.js`, `firebase.js` |
| CSS files | `kebab-case.css` | `custom.css` |
| Config files | `kebab-case.ext` | `docusaurus.config.js`, `tailwind.config.js` |
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

Every React component file follows this order: (1) external imports, (2) internal imports, (3) props interface, (4) component definition with `React.FC<Props>`, (5) hooks, (6) event handlers, (7) render, (8) default export.

See `DEVELOPER_GUIDE.md` for a full annotated template.

### Required Practices

- Always define a props interface (no inline types on the function signature).
- Use default values via destructuring, not `defaultProps`.
- Include ARIA attributes on interactive and landmark elements.
- Use semantic HTML (`<section>`, `<nav>`, `<main>`, `<article>`).

## Styling Approach

The project uses three styling systems in combination:

1. **Tailwind CSS 3.4** -- Primary styling via utility classes.
2. **Infima** -- Docusaurus default CSS framework (variables and base styles).
3. **CSS Modules / custom.css** -- Global overrides and custom animations.

### Tailwind Class Ordering

Follow this order for consistency:

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

Use the project's custom Tailwind tokens defined in `tailwind.config.js`:

| Token | Value | Usage |
|-------|-------|-------|
| `retro-bg-primary` | `#0F1B2A` | Page background |
| `retro-bg-secondary` | `#112030` | Section background |
| `retro-bg-card` | `#13253A` | Card background |
| `retro-color-cyan` | `#5CE1E6` | Primary accent |
| `retro-color-cyan-dark` | `#2BBAC0` | Secondary accent |
| `retro-text-heading` | `#FFFFFF` | Heading text |
| `retro-text-body` | `#DDE6ED` | Body text |

### Infima Variable Overrides

Custom Infima variables are defined in `src/css/custom.css`. When modifying theme colors, update the Infima variables rather than adding raw CSS.

### Tailwind Configuration Notes

- `preflight: false` -- Tailwind's CSS reset is disabled to avoid conflicts with Infima.
- `container` is blocklisted to prevent conflicts with Docusaurus layout.
- `darkMode` uses both `class` and `[data-theme="dark"]` selectors.

## Aiken Smart Contract Patterns

### Validator Structure

Every validator file follows this order: (1) module doc comment, (2) imports, (3) type definitions, (4) helper functions, (5) validator block with `else(_) { fail }` catch-all. See `DEVELOPER_GUIDE.md` for a full annotated template.

### Test Naming Convention

Pattern: `<function>_<scenario>_<expected_result>`

```aiken
test escrow_complete_succeeds() { ... }
test escrow_complete_fails_wrong_signer() fail { ... }
test escrow_cancel_before_deadline_succeeds() { ... }
```

- Tests that should succeed: no `fail` annotation.
- Tests that should fail: annotate with `fail` keyword.

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
| `sidebar_position` | Yes | Order in sidebar (starting from 1) |
| `slug` | No | Custom URL path |
| `description` | Recommended | SEO meta description |

### Lesson Structure

Every lesson should follow this outline:

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
| `:::info` | Supplementary context, background information |
| `:::warning` | Common mistakes, important caveats |
| `:::danger` | Security risks, data loss potential |
| `:::note` | Clarifications, additional detail |

## Git Workflow

### Branch Naming

| Pattern | Use Case |
|---------|----------|
| `part-N` | Curriculum part development branches |
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
| `test` | Adding or updating tests |
| `chore` | Build process, tooling |

Subject: imperative mood, lowercase, no period. Example: `feat: add escrow validator lesson`.

### Pull Request Requirements

- Branch must build cleanly (`npm run build` exits 0).
- Aiken tests must pass if `examples/` was modified (`aiken check` exits 0).
- PR description should include what changed and why.
- Visual regression screenshots are automatically generated by CI.

## Testing Standards

### Docusaurus

```bash
npm run build    # Must complete without errors before any PR
npm run serve    # Manual verification of rendered output
```

**Build verification checklist:**
- Build completes without errors
- No broken link warnings in console output
- All pages render correctly
- Images load properly
- Navigation works as expected

### Aiken

```bash
cd examples
aiken fmt        # Format check
aiken check      # Run all tests
aiken build      # Compile to Plutus
```

All new validators must include tests covering both success and failure paths.

## Accessibility Requirements

The project targets **WCAG 2.1 AA** compliance.

| Requirement | Implementation |
|-------------|---------------|
| Skip navigation | Present on landing page (`<a href="#main-content">`) |
| Keyboard navigation | All interactive elements focusable, visible focus rings |
| Screen reader support | ARIA labels on navigation, landmarks, and interactive elements |
| Color contrast | Minimum 4.5:1 for body text, 3:1 for large text |
| Language attribute | `lang="vi"` on root elements |
| Semantic HTML | `<nav>`, `<main>`, `<section>`, `<article>` used appropriately |
| Focus management | `focus:ring-4` with visible offset on interactive elements |
| Selection styling | Custom selection colors for readability |

---

**Related documents:**
- [System Architecture](./system-architecture.md)
- [Codebase Summary](./codebase-summary.md)
- [Project Overview (PDR)](./project-overview-pdr.md)
