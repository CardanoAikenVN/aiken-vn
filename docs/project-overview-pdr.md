# Product Development Requirements: Vietnamese Aiken

## Project Identity

| Field | Value |
|-------|-------|
| **Name** | Vietnamese Aiken (Aiken Thực Chiến) |
| **Repository** | [CardanoAikenVN/aiken-vn](https://github.com/CardanoAikenVN/aiken-vn) |
| **Live Site** | https://uberhub-mentorias.github.io/ |
| **Organization** | uberhub-mentorias (GitHub) |
| **License** | CC BY-4.0 |

## Project Description

Vietnamese Aiken is the first open-source curriculum for mastering the Aiken smart contract language on the Cardano blockchain, written entirely in Vietnamese. The project delivers a structured learning path from language fundamentals through production-ready smart contract deployment, backed by working code examples and automated tests.

## Goals

1. **Accessibility** — Eliminate the language barrier for Vietnamese developers entering Cardano smart contract development.
2. **Completeness** — Provide a full learning path: environment setup, language syntax, Cardano architecture, and real contract deployment.
3. **Practicality** — Ship working, tested smart contract examples alongside every lesson.
4. **Sustainability** — Build an open-source community that continues contributing lessons and updates beyond the initial release.

## Target Audience

| Segment | Background | Entry Point |
|---------|-----------|-------------|
| Vietnamese developers new to blockchain | Programming experience, no Cardano/Aiken knowledge | Part 1 (Setup + Syntax) |
| Vietnamese developers with blockchain experience | Familiar with smart contracts, new to Aiken | Part 2 (Cardano Architecture) |
| Community contributors | Technical writers, Aiken developers | [CONTRIBUTING.md](../CONTRIBUTING.md) + [DEVELOPER_GUIDE.md](../DEVELOPER_GUIDE.md) |

## Key Features and Deliverables

- **Documentation site** — Docusaurus-powered static site generator with Vietnamese locale, dark mode, WCAG AA compliance
- **32 markdown files** across 5 curriculum parts + project docs
- **4 working smart contracts** with 80 automated test cases
- **Pixel-art landing page** with animated quest timeline and learning path visualization
- **CI/CD pipeline** with build validation and visual regression testing
- **Analytics** via Firebase Firestore for tracking learner engagement

## Curriculum Structure

| Part | Title | Lessons | Index | Focus | Audience |
|------|-------|---------|-------|-------|----------|
| 1 | The Aiken Foundation | 13 | 1 | Setup, Syntax, Testing | Beginner |
| 2 | Cardano Architecture | 3 | 1 | Blockchain fundamentals | Beginner/Intermediate |
| 3 | Your First Validator | 1 | 1 | Deployment | Intermediate |
| 4 | Minting Tokens and NFTs | 2 | 1 | Deployment | Intermediate |
| 5 | The Escrow Contract | 1 | 1 | Deployment | Intermediate |
| — | Project Documentation | 6 | — | Dev reference | Contributors |

**Total: 20 lessons + 6 part indices + 6 project docs = 32 markdown files**

### Learning Progression

```
Part 1: Setup (Lessons 1-2)
  ↓
Part 1: Syntax (Lessons 3-11)
  ↓
Part 1: Testing (Lessons 12-13)
  ↓
Part 2: Blockchain Fundamentals (Lessons 1-3) [can study in parallel]
  ↓
Parts 3-5: Deployment (5 advanced lessons)
```

## Smart Contract Examples

| Contract | Type | Description | Tests | Code |
|----------|------|-------------|-------|------|
| `gift.ak` | Spending Validator | Password-hash protected gift claiming | 8 | 100+ lines |
| `escrow.ak` | Spending Validator | Multi-party escrow with timelock | 16 | 150+ lines |
| `nft_policy.ak` | Minting Policy | One-shot NFT minting | 4 | 100+ lines |
| `simple_ft.ak` | Minting Policy | Admin-controlled fungible token | 2 | 80+ lines |

**Total: 80 tests, 430+ lines of Aiken code**

All contracts target **Aiken stdlib v2.2.0** and compile to Plutus via `aiken build`.

## Acceptance Criteria

Defined in `final_milestone.md`.

### Required Deliverables

- Final close-out report and video (publicly available)
- Learning hub website running at https://uberhub-mentorias.github.io/
- Repository with all core + advanced lessons, video references, security guidelines
- Video tutorials with Vietnamese voiceover and English subtitles

### Community Requirements

- Public workshop with 50+ attendees (recording uploaded publicly)
- Community review channel with 30+ members and 10+ valid feedback submissions
- GitHub issue template for open review
- Maintainer list and sustainability plan in repository

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **SSG Framework** | Docusaurus | 3.9.2 |
| **UI Library** | React | 19 |
| **Styling** | Tailwind CSS + Infima | 3.4.17 |
| **Animations** | Framer Motion | 12+ |
| **Icons** | Lucide React | 0.555.0 |
| **Diagrams** | Mermaid | via @docusaurus/theme-mermaid |
| **Analytics** | Firebase Firestore | 12.6.0 |
| **Smart Contracts** | Aiken (stdlib v2.2.0) | Latest |
| **CI/CD** | GitHub Actions | Node 20 |
| **Deployment** | GitHub Pages | — |
| **Runtime** | Node.js | >= 20.0 |

## Success Metrics

| Metric | Target | Current | Measurement |
|--------|--------|---------|-------------|
| Lesson coverage | 20 lessons + docs | 32 files | File count in `docs/` |
| Smart contract tests | 30+ passing | 80 passing | `aiken check` exit code = 0 |
| Production build | Zero errors | ✓ | `npm run build` exit code = 0 |
| Workshop attendance | 50+ attendees | In progress | Screenshot evidence |
| Community feedback | 10+ valid submissions | In progress | GitHub Issues |
| Community channel | 30+ members | In progress | Channel membership count |
| Accessibility | WCAG 2.1 AA | ✓ | Manual + automated audit |

## Milestone Status

| Phase | Status | Delivery |
|-------|--------|----------|
| Core curriculum (20 lessons) | Complete | docs/ directory |
| Smart contract examples | Complete | examples/ directory |
| Landing page + theme | Complete | src/ directory |
| CI/CD pipeline | Complete | .github/workflows/ |
| Community engagement | In Progress | Workshops, feedback channels |
| Documentation | Complete | docs-dev/ directory |

---

**Related documents:**
- [Codebase Summary](./codebase-summary.md)
- [System Architecture](./system-architecture.md)
- [Code Standards](./code-standards.md)
