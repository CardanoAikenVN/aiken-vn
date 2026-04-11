# Codebase Summary: Vietnamese Aiken

## Repository Overview

| Field | Value |
|-------|-------|
| **Repository** | CardanoAikenVN/aiken-vn |
| **Primary languages** | Markdown (documentation), TypeScript/JSX (UI), Aiken (smart contracts) |
| **Build system** | Docusaurus 3.9.2 (SSG) |
| **Node requirement** | >= 20.0 |
| **Package manager** | npm |

The repository serves two primary purposes: (1) a Docusaurus documentation site delivering Vietnamese Aiken tutorials with 32 markdown files and pixel-art landing page, and (2) a collection of working Aiken smart contract examples with 80 automated tests.

## Directory Structure

```
aiken-vn/
├── .github/workflows/
│   ├── ci.yml                  # Build validation (validate → build)
│   └── before-after.yml        # Visual regression screenshots on PRs
│
├── docs/                       # Docusaurus curriculum (32 markdown files)
│   ├── 01-the-aiken-foundation/    # 13 lessons + index
│   ├── 02-cardano-architecture/    # 3 lessons + index
│   ├── 03-your-first-validator/    # 1 lesson + index
│   ├── 04-minting-tokens-nfts/     # 2 lessons + index
│   ├── 05-escrow-contract/         # 1 lesson + index
│   ├── project-overview-pdr.md
│   ├── codebase-summary.md
│   ├── code-standards.md
│   ├── system-architecture.md
│   ├── project-roadmap.md
│   ├── security-guidelines.md
│   └── final-report.md
│
├── docs-dev/                   # Developer documentation (reference)
│
├── examples/                   # Aiken smart contract project
│   ├── validators/             # 4 validator source files
│   │   ├── gift.ak
│   │   ├── escrow.ak
│   │   ├── nft_policy.ak
│   │   └── simple_ft.ak
│   ├── lib/                    # Test files (30+ test cases)
│   │   ├── escrow_test.ak
│   │   ├── gift_test.ak
│   │   ├── nft_test.ak
│   │   ├── simple_ft_test.ak
│   │   └── syntax_test.ak
│   ├── aiken.toml              # Aiken project config (stdlib v2.2.0)
│   └── plutus.json             # Compiled Plutus output
│
├── raw_doc/                    # Source lesson materials (15K+ lines)
│   ├── Part1/ (13 lessons)
│   ├── Part2/ (3 lessons)
│   ├── Part3/ (1 lesson)
│   ├── Part4/ (2 lessons)
│   └── Part5/ (1 lesson)
│
├── src/                        # React application source
│   ├── components/
│   │   ├── LandingPage/        # 15 files: active landing page
│   │   │   ├── index.tsx       # Main component
│   │   │   ├── Hero.tsx, Footer.tsx
│   │   │   ├── QuestTimeline.tsx, QuestCard.tsx
│   │   │   ├── OnboardingTrain.tsx, Starfield.tsx
│   │   │   ├── Navbar.tsx, Features.tsx, Curriculum.tsx
│   │   │   ├── Projects.tsx, Community.tsx
│   │   │   ├── PixelComponents.tsx
│   │   │   ├── constants.ts, types.ts
│   │   │   └── translations.ts
│   │   ├── HomepageFeatures/   # Legacy (Portuguese, unused)
│   │   └── YouTubeVideo.js     # Reusable YouTube embed
│   ├── css/
│   │   └── custom.css          # Global styles, Tailwind directives
│   ├── lib/
│   │   ├── firebase.js         # Firebase analytics config
│   │   └── tracking.js         # User behavior tracking
│   ├── pages/
│   │   └── index.js            # Homepage entry point
│   ├── theme/
│   │   └── Root.js             # Theme wrapper (analytics, sidebar)
│   └── clientModules/
│       └── sidebarToggle.js    # Sidebar injection (broken)
│
├── static/img/                 # Logos, illustrations, social cards
├── build/                      # Compiled static site output
├── plans/                      # Code review reports
│
├── docusaurus.config.js        # Site configuration (vi locale, mermaid)
├── sidebars.js                 # Auto-generated sidebar
├── tailwind.config.js          # Custom design tokens
├── package.json                # Dependencies and scripts
├── README.md                   # Project overview (bilingual)
├── CONTRIBUTING.md             # Contributor guidelines (bilingual)
├── DEVELOPER_GUIDE.md          # Developer reference (~1200 lines)
├── MAINTAINERS.md              # Maintainer list
├── SUSTAINABILITY.md           # Sustainability plan
├── final_milestone.md          # Deliverables and acceptance criteria
└── LICENSE                     # CC BY-4.0
```

## Key Entry Points

| File | Role |
|------|------|
| `docusaurus.config.js` | Site configuration: URL, i18n, plugins, theme, navbar, footer |
| `src/pages/index.js` | Homepage: renders `<LandingPage />` without navbar/footer |
| `src/components/LandingPage/index.tsx` | Landing page root: composes Hero, QuestTimeline, OnboardingTrain, Footer, Starfield |
| `sidebars.js` | Documentation navigation (auto-generated from `docs/` structure) |
| `src/css/custom.css` | Global styles: Tailwind directives, Infima overrides, animations |
| `src/theme/Root.js` | Docusaurus theme wrapper: injects analytics and sidebar behavior |
| `examples/aiken.toml` | Aiken project configuration for smart contracts |

## Landing Page Component Hierarchy

The homepage (`src/pages/index.js`) renders a custom landing page outside standard Docusaurus chrome:

```
Layout (noNavbar, noFooter)
└── LandingPage/index.tsx
    ├── Starfield              # Canvas animated stars (cyberpunk BG)
    ├── Navbar                 # Inline nav (unused)
    ├── Hero                   # Hero section + CTA to docs
    ├── <main>
    │   ├── QuestTimeline      # 5-part curriculum path
    │   │   └── QuestCard[]    # Individual quest cards
    │   └── OnboardingTrain    # Animated train animation
    └── Footer                 # Landing page footer
```

**Active components (16 files):** LandingPage, Hero, Footer, QuestTimeline, QuestCard, OnboardingTrain, Starfield, PixelComponents, constants, types, translations

**Unused components (3 files):** Navbar, Features, Curriculum, Projects, Community (code clutter, low priority cleanup)

**Supporting modules:**
- `constants.ts` — Quest data, section definitions
- `types.ts` — TypeScript interfaces
- `translations.ts` — UI string translations
- `PixelComponents.tsx` — Pixel-art UI primitives

## Data Flow

```
raw_doc/              docs/               Docusaurus SSG        build/
(source lessons) → (formatted MDX) → (React + Tailwind) → (static HTML/JS/CSS)
                  with YAML frontmatter  + Mermaid            deployed to GitHub Pages
                                        + code highlighting
```

The `raw_doc/` directory contains original Vietnamese lesson content. Content is processed into `docs/` with YAML frontmatter, Docusaurus admonitions, and cross-references. Docusaurus builds the final static site into `build/`.

## Dependencies Summary

### Production (Key packages)

| Package | Version | Purpose |
|---------|---------|---------|
| @docusaurus/core | 3.9.2 | Static site generator |
| @docusaurus/theme-mermaid | ^3.9.2 | Mermaid diagrams in lessons |
| react | ^19.0.0 | UI library (React 19) |
| tailwindcss | ^3.4.17 | CSS utility framework |
| firebase | ^12.6.0 | Analytics & Firestore access logs |
| framer-motion | ^12.23.25 | Animation library |
| lucide-react | ^0.555.0 | SVG icon library |

### Development (Key packages)

| Package | Version | Purpose |
|---------|---------|---------|
| @docusaurus/module-type-aliases | 3.9.2 | TypeScript paths |
| postcss | ^8.5.6 | CSS pipeline |
| autoprefixer | ^10.4.22 | CSS vendor prefixing |

## Known Issues

| Issue | Location | Impact | Priority |
|-------|----------|--------|----------|
| Broken sidebar toggle | `src/clientModules/sidebarToggle.js` | Runtime error on load | High |
| Hardcoded Firebase keys | `src/lib/firebase.js` | Not secret but visible | Low |
| Legacy Portuguese content | `src/components/HomepageFeatures/` | Code clutter | Low |
| Unused landing components | `src/components/LandingPage/` | Maintenance burden | Medium |
| Aiken tests workflow isolated | `examples/.github/workflows/tests.yml` | Not triggered by CI | Medium |

## Aiken Smart Contracts

### Project Structure

```
examples/
├── aiken.toml           # Project: aiken-vn/course-verification
├── validators/
│   ├── gift.ak          # Spending: password-hash gift (100+ lines, 8 tests)
│   ├── escrow.ak        # Spending: multi-party escrow (150+ lines, 16 tests)
│   ├── nft_policy.ak    # Minting: one-shot NFT (100+ lines, 4 tests)
│   └── simple_ft.ak     # Minting: admin-controlled FT (80+ lines, 2 tests)
├── lib/
│   ├── *_test.ak        # 30+ test cases (80+ lines)
│   └── *.ak             # Syntax examples
└── plutus.json          # Compiled Plutus output
```

### Commands

```bash
cd examples
aiken check    # Type-check + run all tests (30+ cases)
aiken build    # Compile to Plutus (plutus.json)
aiken fmt      # Format source files
```

## Build and Deployment

### Commands

```bash
npm install              # Install dependencies
npm start                # Dev server (hot reload)
npm run build            # Production build → build/
npm run serve            # Preview production build
```

### CI/CD Pipeline

| Workflow | Trigger | Steps |
|----------|---------|-------|
| `ci.yml` | Push to main/part-*, PR to main | validate → build → upload artifact |
| `before-after.yml` | PR to main | checkout → build both → screenshot → compare |

**Deploy:** GitHub Actions builds `build/` and GitHub Pages serves at https://uberhub-mentorias.github.io/

---

**Related documents:**
- [Project Overview (PDR)](./project-overview-pdr.md)
- [System Architecture](./system-architecture.md)
- [Code Standards](./code-standards.md)
