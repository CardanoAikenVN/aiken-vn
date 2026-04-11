# Product Development Requirements: Vietnamese Aiken

## Project Identity

| Field | Value |
|-------|-------|
| **Name** | Vietnamese Aiken |
| **Repository** | [CardanoAikenVN/aiken-vn](https://github.com/CardanoAikenVN/aiken-vn) |
| **Live Site** | https://uberhub-mentorias.github.io/ |
| **Organization** | uberhub-mentorias (GitHub) |
| **License** | CC BY-4.0 |

## Project Description

Vietnamese Aiken is the first open-source curriculum for mastering the Aiken smart contract language on the Cardano blockchain, written entirely in Vietnamese. The project delivers a structured learning path from language fundamentals through production-ready smart contract deployment, backed by working code examples and automated tests.

## Goals

1. **Accessibility** -- Eliminate the language barrier for Vietnamese developers entering Cardano smart contract development.
2. **Completeness** -- Provide a full learning path: environment setup, language syntax, Cardano architecture, and real contract deployment.
3. **Practicality** -- Ship working, tested smart contract examples alongside every lesson.
4. **Sustainability** -- Build an open-source community that continues contributing lessons and updates beyond the initial release.

## Target Audience

| Segment | Background | Entry Point |
|---------|-----------|-------------|
| Vietnamese developers new to blockchain | Programming experience, no Cardano/Aiken knowledge | Part 1 (Setup + Syntax) |
| Vietnamese developers with blockchain experience | Familiar with smart contracts, new to Aiken | Part 2 (Cardano Architecture) |
| Community contributors | Technical writers, Aiken developers | CONTRIBUTING.md + DEVELOPER_GUIDE.md |

## Key Features and Deliverables

- **Documentation site** -- Docusaurus-powered SSG with Vietnamese locale, dark mode, WCAG AA compliance
- **26 lesson documents** across 5 curriculum parts (see below)
- **4 working smart contracts** with 30+ automated test cases
- **Pixel-art landing page** with animated quest timeline and learning path visualization
- **CI/CD pipeline** with build validation and visual regression testing
- **Analytics** via Firebase Firestore for tracking learner engagement

## Curriculum Structure

| Part | Title | Lessons | Stage | Audience |
|------|-------|---------|-------|----------|
| 1 | The Aiken Foundation | 13 | Setup, Syntax, Testing | Beginner |
| 2 | Cardano Architecture | 3 | Extra (blockchain fundamentals) | Beginner/Intermediate |
| 3 | Your First Validator | 1 | Deployment | Intermediate |
| 4 | Minting Tokens and NFTs | 2 | Deployment | Intermediate |
| 5 | The Escrow Contract | 1 | Deployment | Intermediate |

**Total: 20 lessons + 6 index/overview pages = 26 markdown files**

### Learning Path Progression

```
Setup (Lessons 1-2)
  -> Syntax (Lessons 3-11)
    -> Testing (Lessons 12-13)
      -> Deployment (Parts 3, 4, 5)
```

Part 2 (Cardano Architecture) serves as supplementary material that can be studied in parallel.

## Smart Contract Examples

| Contract | Type | Description | Tests |
|----------|------|-------------|-------|
| `gift.ak` | Spending Validator | Password-hash protected gift claiming | 8 |
| `escrow.ak` | Spending Validator | Multi-party escrow with timelock | 16 |
| `nft_policy.ak` | Minting Policy | One-shot NFT minting | 4 |
| `simple_ft.ak` | Minting Policy | Admin-controlled fungible token | 2 |

All contracts target **Aiken stdlib v2.2.0** and compile to Plutus via `aiken build`.

## Milestone and Acceptance Criteria

Source: `final_milestone.md`

### Required Deliverables

- Final close-out report (publicly available)
- Final close-out video (publicly available)
- Learning hub website running with direct link to repo docs
- Repository contains all core + advanced lessons, video references, and security guidelines
- Video tutorials with Vietnamese voiceover and English subtitles

### Community Requirements

- Public workshop with at least 50 attendees (recording uploaded publicly)
- Community review channel active with at least 30 members and 10 valid feedback submissions
- GitHub issue template merged into main repo for open review
- Maintainer list and sustainability plan visible in repo

### Evidence Requirements

- Links to: close-out report, close-out video, live website, repository, workshop recording
- Screenshots proving attendee count and test cases passing
- Demo video of contract execution
- CC BY-4.0 license published in repository

## Tech Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| SSG Framework | Docusaurus | 3.9.2 |
| UI | React | 19 |
| Styling | Tailwind CSS + Infima + CSS Modules | 3.4.17 |
| Animations | Framer Motion | 12+ |
| Icons | Lucide React | 0.555.0 |
| Diagrams | Mermaid | via @docusaurus/theme-mermaid |
| Analytics | Firebase (Firestore) | 12.6.0 |
| Smart Contracts | Aiken (stdlib v2.2.0) | Latest |
| CI/CD | GitHub Actions | Node 20 |
| Deployment | GitHub Pages | -- |
| Runtime | Node.js | >= 20.0 |

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lesson coverage | 20 lessons across 5 parts | File count in `docs/` |
| Smart contract tests | 30+ passing | `aiken check` exit code |
| Production build | Zero errors | `npm run build` exit code |
| Workshop attendance | 50+ attendees | Screenshot evidence |
| Community feedback | 10+ valid submissions | GitHub Issues |
| Community channel | 30+ members | Channel membership count |
| Accessibility | WCAG 2.1 AA | Manual + automated audit |

---

**Related documents:**
- [Codebase Summary](./codebase-summary.md)
- [System Architecture](./system-architecture.md)
- [Code Standards](./code-standards.md)
