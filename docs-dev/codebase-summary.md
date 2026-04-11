# Codebase Summary: Vietnamese Aiken

## Repository Overview

| Field | Value |
|-------|-------|
| **Repository** | `CardanoAikenVN/aiken-vn` |
| **Primary language** | Markdown (documentation), TypeScript/JSX (UI), Aiken (smart contracts) |
| **Build system** | Docusaurus 3.9.2 (SSG) |
| **Node requirement** | >= 20.0 |
| **Package manager** | npm |

The repository serves two purposes: (1) a Docusaurus documentation site delivering Vietnamese Aiken tutorials, and (2) a collection of working Aiken smart contract examples with tests.

## Directory Structure

```
aiken-vn/
├── .github/workflows/          # CI/CD pipelines
│   ├── ci.yml                  #   Build validation (validate -> build)
│   └── before-after.yml        #   Visual regression screenshots on PRs
│
├── docs/                       # Docusaurus curriculum content (26 markdown files)
│   ├── 01-the-aiken-foundation/    # Part 1: 13 lessons + index
│   ├── 02-cardano-architecture/    # Part 2: 3 lessons + index
│   ├── 03-your-first-validator/    # Part 3: 1 lesson + index
│   ├── 04-minting-tokens-nfts/     # Part 4: 2 lessons + index
│   └── 05-escrow-contract/         # Part 5: 1 lesson + index
│
├── docs-dev/                   # Developer documentation (this directory)
│
├── examples/                   # Aiken smart contract project
│   ├── validators/             #   4 validator source files
│   │   ├── gift.ak             #     Password-protected spending validator
│   │   ├── escrow.ak           #     Multi-party escrow with timelock
│   │   ├── nft_policy.ak       #     One-shot NFT minting policy
│   │   └── simple_ft.ak        #     Admin-controlled fungible token
│   ├── lib/                    #   Test files (30+ test cases) + syntax demos
│   ├── aiken.toml              #   Aiken project config (stdlib v2.2.0)
│   └── plutus.json             #   Compiled Plutus output
│
├── raw_doc/                    # Source lesson materials (Vietnamese markdown, 15K+ lines)
│   ├── Part1/ (13 lessons)
│   ├── Part2/ (3 lessons)
│   ├── Part3/ (1 lesson)
│   ├── Part4/ (2 lessons)
│   └── Part5/ (1 lesson)
│
├── src/                        # React application source
│   ├── components/
│   │   ├── HomepageFeatures/   #   Legacy component (unused, Portuguese content)
│   │   ├── LandingPage/        #   15+ files: active landing page
│   │   └── YouTubeVideo.js     #   Reusable YouTube embed
│   ├── css/
│   │   └── custom.css          #   Global styles, Tailwind directives, Infima overrides
│   ├── lib/
│   │   ├── firebase.js         #   Firebase analytics config
│   │   └── tracking.js         #   User behavior tracking (Firestore)
│   ├── pages/
│   │   └── index.js            #   Homepage entry point
│   ├── theme/
│   │   └── Root.js             #   Theme wrapper (analytics + sidebar)
│   └── clientModules/
│       └── sidebarToggle.js    #   Sidebar injection (BROKEN -- see Known Issues)
│
├── static/img/                 # Logos, illustrations, social cards
├── build/                      # Compiled static site output
├── plans/                      # Code review reports
│
├── docusaurus.config.js        # Site configuration (vi locale, mermaid, prism)
├── sidebars.js                 # Auto-generated sidebar from docs/
├── tailwind.config.js          # Custom design tokens (retro/cyberpunk theme)
├── package.json                # Dependencies and scripts
├── CONTRIBUTING.md             # Contributor guidelines (bilingual)
├── DEVELOPER_GUIDE.md          # Developer reference (~1200 lines, bilingual)
├── final_milestone.md          # Project deliverables and acceptance criteria
├── README.md                   # Project overview (bilingual)
└── LICENSE                     # CC BY-4.0
```

## Key Entry Points

| File | Role |
|------|------|
| `docusaurus.config.js` | Site configuration: URL, i18n, plugins, theme, navbar, footer |
| `src/pages/index.js` | Homepage: renders `<LandingPage />` inside Docusaurus `<Layout>` with no navbar/footer |
| `src/components/LandingPage/index.tsx` | Landing page root: composes Hero, QuestTimeline, OnboardingTrain, Footer, Starfield |
| `sidebars.js` | Documentation navigation (auto-generated from `docs/` directory structure) |
| `src/css/custom.css` | Global styles: Tailwind directives, Infima variable overrides, custom animations |
| `src/theme/Root.js` | Docusaurus theme wrapper: injects analytics and sidebar behavior |
| `examples/aiken.toml` | Aiken project configuration for smart contract examples |

## Component Hierarchy

The landing page renders outside the standard Docusaurus chrome (no navbar, no footer):

```
Layout (noNavbar, noFooter)
└── LandingPage
    ├── Starfield              # Canvas-based animated star background
    ├── <nav>                  # Inline navigation (AIKEN VN + Tai Lieu link)
    ├── Hero                   # Hero section with CTA
    ├── <main>
    │   ├── QuestTimeline      # 5-section learning path visualization
    │   │   └── QuestCard[]    # Individual quest cards (from constants.ts)
    │   └── OnboardingTrain    # Animated train onboarding section
    └── Footer                 # Landing page footer
```

**Unused components** (built but not rendered on landing page):
- `Navbar.tsx`, `Features.tsx`, `Curriculum.tsx`, `Projects.tsx`, `Community.tsx`

**Supporting modules:**
- `constants.ts` -- Quest data, section definitions
- `types.ts` -- TypeScript interfaces
- `translations.ts` -- UI string translations
- `PixelComponents.tsx` -- Pixel-art UI primitives

## Data Flow

```
raw_doc/            docs/                 Docusaurus SSG        build/
(source lessons) -> (formatted lessons) -> (React + MDX) -----> (static HTML/JS/CSS)
                    with YAML frontmatter   + Tailwind            deployed to GitHub Pages
                                            + Mermaid diagrams
```

The `raw_doc/` directory contains the original Vietnamese lesson content. These are processed and formatted into `docs/` with proper YAML frontmatter, Docusaurus admonitions, and cross-references. Docusaurus then builds the final static site into `build/`.

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| `@docusaurus/core` | 3.9.2 | Static site generator framework |
| `@docusaurus/preset-classic` | 3.9.2 | Default Docusaurus theme and plugins |
| `@docusaurus/theme-mermaid` | ^3.9.2 | Mermaid diagram rendering |
| `@mdx-js/react` | ^3.0.0 | MDX support in React |
| `clsx` | ^2.0.0 | Conditional className utility |
| `firebase` | ^12.6.0 | Analytics and Firestore access logging |
| `framer-motion` | ^12.23.25 | Animation library |
| `lucide-react` | ^0.555.0 | Icon library |
| `prism-react-renderer` | ^2.3.0 | Syntax highlighting |
| `prop-types` | ^15.8.1 | Runtime type checking (legacy) |
| `react` | ^19.0.0 | UI library |
| `react-dom` | ^19.0.0 | React DOM renderer |

### Development

| Package | Version | Purpose |
|---------|---------|---------|
| `@docusaurus/module-type-aliases` | 3.9.2 | TypeScript path aliases |
| `@docusaurus/types` | 3.9.2 | TypeScript type definitions |
| `autoprefixer` | ^10.4.22 | CSS vendor prefixing |
| `postcss` | ^8.5.6 | CSS processing pipeline |
| `tailwindcss` | ^3.4.17 | Utility-first CSS framework |

## Known Issues

1. **Broken sidebar toggle** -- `src/clientModules/sidebarToggle.js` imports a `SidebarToggle` component that does not exist, causing a runtime error when loaded.

2. **Hardcoded Firebase keys** -- `src/lib/firebase.js` contains API keys inline. This is standard practice for client-side Firebase (keys are not secret), but it is worth noting for awareness.

3. **Legacy Portuguese content** -- `src/components/HomepageFeatures/` contains Portuguese-language content from the original Docusaurus template. It is not rendered anywhere but should be removed.

4. **Unused landing page components** -- `Navbar.tsx`, `Features.tsx`, `Curriculum.tsx`, `Projects.tsx`, and `Community.tsx` are built but not imported in the landing page `index.tsx`. `Community.tsx` uses `picsum.photos` for placeholder avatars.

5. **Aiken tests workflow location** -- `examples/.github/workflows/tests.yml` exists as a reference but is not triggered by the root-level CI since it lives inside `examples/`.

---

**Related documents:**
- [Project Overview (PDR)](./project-overview-pdr.md)
- [System Architecture](./system-architecture.md)
- [Code Standards](./code-standards.md)
