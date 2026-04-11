# System Architecture: Vietnamese Aiken

## High-Level Architecture

```mermaid
graph TB
    subgraph Sources["Source Content"]
        RAW[raw_doc/\nVietnamese Lessons]
        AK[examples/\nAiken Smart Contracts]
    end

    subgraph Build["Build Pipeline"]
        DOCS[docs/\nFormatted MDX]
        DOCUS[Docusaurus 3.9.2\nSSG Engine]
        TW[Tailwind CSS\nPostCSS Pipeline]
        RC[React Components\nLanding Page + Theme]
    end

    subgraph Output["Deployment"]
        BUILD[build/\nStatic HTML/JS/CSS]
        GHP[GitHub Pages\nuberhub-mentorias.github.io]
    end

    subgraph Services["External Services"]
        FB[Firebase\nFirestore Analytics]
        GHA[GitHub Actions\nCI/CD]
    end

    RAW --> DOCS
    DOCS --> DOCUS
    RC --> DOCUS
    TW --> DOCUS
    DOCUS --> BUILD
    BUILD --> GHP
    GHA --> BUILD
    BUILD -.-> FB
    AK -.->|Referenced in lessons| DOCS
```

## Frontend Architecture

The site is a Docusaurus 3.9.2 static site with two distinct rendering modes:

### Homepage (Landing Page)

The homepage bypasses the standard Docusaurus chrome. It renders `<Layout noNavbar noFooter>` and mounts a fully custom React application.

```mermaid
graph TD
    INDEX["src/pages/index.js"] --> LAYOUT["Docusaurus Layout\n(noNavbar, noFooter)"]
    LAYOUT --> LP["LandingPage/index.tsx"]
    LP --> SF["Starfield\n(Canvas animation)"]
    LP --> NAV["Inline <nav>\n(AIKEN VN + Docs link)"]
    LP --> HERO["Hero\n(CTA section)"]
    LP --> MAIN["<main>"]
    MAIN --> QT["QuestTimeline"]
    QT --> QC["QuestCard[]\n(from constants.ts)"]
    MAIN --> OT["OnboardingTrain\n(Animated train)"]
    LP --> FT["Footer"]
```

**Supporting modules:**
- `constants.ts` -- Quest data and section definitions
- `types.ts` -- TypeScript interfaces for all component props
- `translations.ts` -- UI string translations
- `PixelComponents.tsx` -- Reusable pixel-art UI primitives

**Unused components** (built but not rendered): `Navbar.tsx`, `Features.tsx`, `Curriculum.tsx`, `Projects.tsx`, `Community.tsx`.

### Documentation Pages

Documentation pages use the standard Docusaurus rendering pipeline with:
- Auto-generated sidebar from `docs/` directory structure
- Hideable sidebar (`docs.sidebar.hideable: true`)
- Mermaid diagram support via `@docusaurus/theme-mermaid`
- Prism syntax highlighting (Java, Bash, JSON, YAML + defaults)
- Table of contents: headings level 2-4

### Theme Customization

| Layer | File | Purpose |
|-------|------|---------|
| Root wrapper | `src/theme/Root.js` | Injects analytics tracking and sidebar behavior |
| Global CSS | `src/css/custom.css` | Infima variable overrides, Tailwind directives, animations |
| Client module | `src/clientModules/sidebarToggle.js` | Sidebar injection (currently broken) |

## Documentation Pipeline

```mermaid
flowchart LR
    A["raw_doc/\n(Source Vietnamese MD)\n15K+ lines"] -->|Format + Structure| B["docs/\n(Docusaurus MDX)\n26 files"]
    B -->|YAML frontmatter\n+ admonitions\n+ code blocks| C["Docusaurus SSG"]
    C -->|React + MDX\n+ Tailwind\n+ Mermaid| D["build/\n(Static HTML/JS/CSS)"]
    D -->|GitHub Actions| E["GitHub Pages"]
```

### Content Processing Steps

1. **Source content** (`raw_doc/`) -- Original Vietnamese lesson materials organized by part.
2. **Formatting** (`docs/`) -- Content is restructured with YAML frontmatter (`title`, `sidebar_position`, `slug`, `description`), Docusaurus admonitions, cross-references, and code examples.
3. **Build** -- Docusaurus processes MDX files through React, applies Tailwind via PostCSS, renders Mermaid diagrams, and outputs static HTML.
4. **Deploy** -- GitHub Actions builds and uploads artifacts; GitHub Pages serves the result.

## Smart Contract Architecture

### Project Structure

```
examples/
├── aiken.toml          # Project: aiken-vn/course-verification
│                       # Dependency: aiken-lang/stdlib v2.2.0
├── validators/
│   ├── gift.ak         # Spending: password-hash gift claiming
│   ├── escrow.ak       # Spending: multi-party escrow + timelock
│   ├── nft_policy.ak   # Minting: one-shot NFT
│   └── simple_ft.ak    # Minting: admin-controlled FT
├── lib/
│   ├── *_test.ak       # Test files (30+ cases)
│   └── *.ak            # Syntax demo modules
└── plutus.json         # Compiled Plutus Core output
```

### Validator Types

```mermaid
graph LR
    subgraph Spending["Spending Validators"]
        GIFT["gift.ak\n8 tests\nPassword-hash unlock"]
        ESCROW["escrow.ak\n16 tests\nMulti-party + timelock"]
    end

    subgraph Minting["Minting Policies"]
        NFT["nft_policy.ak\n4 tests\nOne-shot NFT"]
        FT["simple_ft.ak\n2 tests\nAdmin-controlled"]
    end

    GIFT -->|Compiled| PLUTUS["plutus.json"]
    ESCROW -->|Compiled| PLUTUS
    NFT -->|Compiled| PLUTUS
    FT -->|Compiled| PLUTUS
```

### Build and Test Commands

| Command | Purpose |
|---------|---------|
| `aiken fmt` | Format source files |
| `aiken check` | Type-check and run all tests |
| `aiken build` | Compile validators to Plutus Core (`plutus.json`) |
| `aiken docs` | Generate API documentation |

## CI/CD Pipeline

### ci.yml -- Main Build Pipeline

Triggered on pushes to `main` and `part-*` branches, and on PRs to `main`.

```mermaid
flowchart LR
    PUSH["Push / PR"] --> VALIDATE["validate\n- Checkout\n- Read CLAUDE.md\n- Validate contributor"]
    VALIDATE --> BUILD["build\n- Setup Node 20\n- npm ci\n- npm run build\n- Upload artifact"]
```

### before-after.yml -- Visual Regression

Triggered on PRs to `main`. Captures before/after screenshots and posts them as a PR comment.

```mermaid
flowchart LR
    PR["Pull Request"] --> CHECKOUT["Checkout\nmain + PR branch"]
    CHECKOUT --> BUILD_BOTH["Build both\nbranches"]
    BUILD_BOTH --> SERVE["Serve on\nports 3000/3001"]
    SERVE --> CAPTURE["Playwright\nscreenshots"]
    CAPTURE --> COMMENT["Post diff\nas PR comment"]
```

**Tools used:** `@vercel/before-and-after`, Playwright (Chromium), `npx serve`.

### Aiken Tests Workflow

Located at `examples/.github/workflows/tests.yml` (reference only, not triggered by root CI):

```
aiken fmt --check -> aiken check -> aiken build
```

## Analytics Architecture

```mermaid
flowchart LR
    USER["User visits site"] --> ROOT["src/theme/Root.js\nTheme wrapper"]
    ROOT --> TRACK["src/lib/tracking.js\nBehavior tracking"]
    TRACK --> FB["Firebase Firestore\naccess_logs collection"]
    ROOT --> FIREBASE["src/lib/firebase.js\nFirebase config"]
```

Firebase is initialized with client-side configuration in `firebase.js`. The `tracking.js` module logs user access events to a Firestore `access_logs` collection. Analytics is injected at the theme root level via `src/theme/Root.js`.

## Deployment Architecture

```mermaid
flowchart LR
    DEV["Developer"] -->|git push| GH["GitHub\nCardanoAikenVN/aiken-vn"]
    GH -->|GitHub Actions| CI["CI Pipeline\n- Validate\n- Build"]
    CI -->|Upload artifact| PAGES["GitHub Pages\nuberhub-mentorias.github.io"]
    PAGES -->|CDN| USER["End User"]
```

| Aspect | Detail |
|--------|--------|
| **Host** | GitHub Pages |
| **URL** | https://uberhub-mentorias.github.io/ |
| **Organization** | uberhub-mentorias |
| **Base URL** | `/` |
| **Build output** | `build/` directory |
| **Node version** | 20 (in CI) |
| **Cache** | npm cache in GitHub Actions |
| **Artifact retention** | 7 days |

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `retro-bg-primary` | `#0F1B2A` | Page background |
| `retro-bg-secondary` | `#112030` | Section backgrounds |
| `retro-bg-card` | `#13253A` | Card surfaces |
| `retro-bg-dark` | `#0a0a0a` | Deepest background |
| `retro-color-cyan` | `#5CE1E6` | Primary accent, links |
| `retro-color-cyan-dark` | `#2BBAC0` | Secondary accent |
| `primary` | `#8f3aff` | Brand purple |
| `primary-glow` | `#b366ff` | Purple glow effects |
| `accent-green` | `#10B981` | Success states |
| `accent-blue` | `#3B82F6` | Information |

### Typography

| Element | Font | Weight |
|---------|------|--------|
| Pixel headings | Press Start 2P | Regular |
| Body text | Arial / Helvetica (system sans-serif) | Regular (400) |
| Bold text | System sans-serif | Bold (700) |

### Animation System

Defined in `tailwind.config.js`:

| Animation | Duration | Use |
|-----------|----------|-----|
| `cloud-slow` | 60s linear infinite | Background clouds |
| `cloud-medium` | 40s linear infinite | Mid-layer clouds |
| `cloud-fast` | 25s linear infinite | Foreground clouds |
| `float` | 4s ease-in-out infinite | Floating elements |
| `pulse-slow` | 4s cubic-bezier infinite | Slow pulse effect |

Additional animations are implemented via Framer Motion in individual components (Hero, OnboardingTrain, QuestCard).

### Shadows

| Token | Value | Use |
|-------|-------|-----|
| `glow` | `0 0 15px rgba(255,255,255,0.2)` | Subtle glow on interactive elements |
| `card` | `0 25px 50px -12px rgba(0,0,0,0.5)` | Card elevation |

---

**Related documents:**
- [Codebase Summary](./codebase-summary.md)
- [Code Standards](./code-standards.md)
- [Project Overview (PDR)](./project-overview-pdr.md)
