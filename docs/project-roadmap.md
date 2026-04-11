# Project Roadmap: Vietnamese Aiken

## Current Status

**As of March 2026:** Core deliverables complete. Community engagement in progress.

| Phase | Status | Completion | Notes |
|-------|--------|------------|-------|
| Phase 1: Curriculum | Complete | 100% | 20 lessons across 5 parts |
| Phase 2: Smart Contracts | Complete | 100% | 4 validators, 30+ tests |
| Phase 3: Landing Page | Complete | 100% | Pixel-art theme, animations |
| Phase 4: CI/CD Pipeline | Complete | 100% | Build validation + visual regression |
| Phase 5: Community Engagement | In Progress | 40% | Workshops, feedback channels |
| Phase 6: Advanced Content | Planned | 0% | Additional lessons, certification |

## Phase 1: Curriculum Development (Complete)

**Timeline:** 2024-2025 | **Status:** Complete | **Completion:** 100%

### Deliverables

- **Part 1: The Aiken Foundation** (13 lessons)
  - Setup: Installation, Introduction
  - Syntax: CLI, Project Structure, Variables, Types, Control Flow, Functions, Modules, Data
  - Testing: Unit Testing, Troubleshooting

- **Part 2: Cardano Architecture** (3 lessons)
  - Introduction to Cardano
  - UTXO Model
  - Datum and Redeemer

- **Part 3: Your First Validator** (1 lesson)
  - Building a Spending Validator

- **Part 4: Minting Tokens and NFTs** (2 lessons)
  - FT vs NFT concepts
  - Minting Policies

- **Part 5: The Escrow Contract** (1 lesson)
  - Multi-party escrow with timelock

**Total:** 20 lessons in Vietnamese + 6 part index pages

### Evidence

- All 26 markdown files in `docs/` directory
- YAML frontmatter with titles, positions, descriptions
- Docusaurus admonitions and cross-references
- Mermaid diagrams for concepts

## Phase 2: Smart Contract Examples (Complete)

**Timeline:** 2024-2025 | **Status:** Complete | **Completion:** 100%

### Deliverables

| Validator | Type | Tests | Lines | Status |
|-----------|------|-------|-------|--------|
| gift.ak | Spending | 8 | 100+ | Complete |
| escrow.ak | Spending | 16 | 150+ | Complete |
| nft_policy.ak | Minting | 4 | 100+ | Complete |
| simple_ft.ak | Minting | 2 | 80+ | Complete |
| syntax_test.ak | Demo | 50 | 300+ | Complete |

**Total:** 80 test cases, 430+ lines of validator code + 300+ lines of test code

### Evidence

- All validators in `examples/validators/`
- All tests in `examples/lib/`
- `aiken check` exit code 0 (all tests passing)
- `plutus.json` compilation output
- Test evidence in `docs/test-evidence.md`

## Phase 3: Landing Page and Theme (Complete)

**Timeline:** 2024-2025 | **Status:** Complete | **Completion:** 100%

### Deliverables

- **Pixel-art retro/cyberpunk landing page**
  - Hero section with call-to-action
  - Quest timeline (5 learning path sections)
  - Onboarding train animated section
  - Canvas-based starfield background

- **16 React components** with TypeScript
  - Reusable pixel-art UI primitives
  - Framer Motion animations
  - Responsive design

- **Custom design system**
  - Color palette (retro-bg, retro-color tokens)
  - Typography (Press Start 2P, system sans-serif)
  - Animation system (cloud, float, pulse)

- **Dark mode support**
  - Infima variable overrides
  - Tailwind dark mode configuration

### Evidence

- All components in `src/components/LandingPage/`
- `tailwind.config.js` with custom tokens
- `src/css/custom.css` with global styles
- `src/pages/index.js` homepage entry point

## Phase 4: CI/CD Pipeline (Complete)

**Timeline:** 2025 | **Status:** Complete | **Completion:** 100%

### Deliverables

- **Build validation** (`ci.yml`)
  - Checkout → Validate contributor → Build
  - Triggered on push to main/part-* branches and PRs to main
  - Exit code 0 required

- **Visual regression testing** (`before-after.yml`)
  - Playwright screenshots of main vs PR
  - Before/after comparison posted as PR comment
  - Triggered on PRs to main

- **Aiken tests workflow** (`examples/.github/workflows/tests.yml`)
  - Format check → Type check → Tests → Build
  - Reference only (not triggered by root CI)

### Evidence

- `.github/workflows/ci.yml`
- `.github/workflows/before-after.yml`
- `examples/.github/workflows/tests.yml`
- Successful builds on GitHub Actions

## Phase 5: Community Engagement (In Progress)

**Timeline:** 2026 | **Status:** In Progress | **Completion:** ~40%

### Deliverables

- **Public workshops**
  - Target: 50+ attendees per workshop
  - Vietnamese-language instruction
  - Recording uploaded publicly
  - Status: 1+ workshops scheduled

- **Community feedback channel**
  - GitHub Discussions or Discord server
  - Target: 30+ members, 10+ valid submissions
  - Status: Channel established, members recruited

- **Issue template for open review**
  - Standardized GitHub issue template
  - Feedback guidelines
  - Status: Merged to main

- **Maintainer list and sustainability plan**
  - `MAINTAINERS.md` in repository
  - `SUSTAINABILITY.md` with long-term vision
  - Status: Complete

### Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Workshop attendance | 50+ | TBD |
| Community members | 30+ | TBD |
| Valid feedback | 10+ | TBD |
| Active maintainers | 2+ | Quan Nguyen (Lead), Jason (Advisor) |

## Phase 6: Advanced Content and Certification (Planned)

**Timeline:** 2026-2027 | **Status:** Planned | **Completion:** 0%

### Proposed Deliverables

- **Advanced lessons** (3-6 months from Phase 5 completion)
  - Advanced validator patterns
  - Performance optimization
  - Security best practices
  - Integration with frontend (Mesh, Lucid)

- **Community workshops** (ongoing, 6-12 months)
  - Monthly or quarterly sessions
  - Guest speakers (Aiken core team, Cardano developers)
  - Recorded and archived

- **Certification program** (12+ months from Phase 5)
  - Hands-on project requirements
  - Code review by maintainers
  - Certificate of completion
  - Recognized in Cardano community

- **Expanded smart contract examples** (ongoing)
  - Real-world patterns (stake pooling, NFT marketplaces)
  - Integration examples (dApps, backend services)
  - Performance benchmarks

### Estimated Effort

| Deliverable | Effort | Resources |
|-------------|--------|-----------|
| 3 advanced lessons | 40-60 hours | 1 senior developer + 1 reviewer |
| Monthly workshops | 20 hours/month | Organizer + guest speaker |
| Certification program | 80-120 hours | Core team consensus |
| 5 new examples | 60-80 hours | 1-2 developers |

## Success Metrics (Overall)

| Metric | Target | Current Status |
|--------|--------|-----------------|
| **Accessibility** | WCAG 2.1 AA | ✓ Complete |
| **Lesson coverage** | 20 lessons | ✓ Complete (32 markdown files) |
| **Smart contract tests** | 30+ passing | ✓ Complete (80 tests passing) |
| **Production build** | Zero errors | ✓ Clean (`npm run build`) |
| **GitHub Stars** | 100+ | TBD |
| **Monthly visitors** | 500+ | Tracked via Firebase |
| **Active contributors** | 5+ | In progress |
| **Workshops held** | 2+ | Scheduled |
| **Maintainer count** | 2+ | ✓ 2 (Quan, Jason) |

## Dependencies and Blockers

### Current Blockers

| Issue | Impact | Owner | Status |
|-------|--------|-------|--------|
| Broken sidebar toggle | Runtime error on load | TBD | Tracked in Phase 6 |
| Hardcoded Firebase keys | Client-side visible | Acceptable | Documented |
| Unused components | Code maintenance | Low priority | Phase 6 cleanup |

### External Dependencies

- **Aiken stdlib v2.2.0** — Maintained by Aiken core team
- **Docusaurus 3.9.2** — Maintained by Meta (Docusaurus team)
- **React 19** — Maintained by Meta
- **Tailwind CSS 3.4** — Maintained by Tailwind Labs
- **Firebase** — Maintained by Google

### Community Dependencies

- Cardano Vietnam community interest
- Volunteer contributors
- GitHub Actions CI/CD availability

## Recommendations for Next Steps

### Immediate (Next 30 days)

1. **Complete Phase 5 community engagement**
   - Finalize workshop dates and speakers
   - Recruit community channel members
   - Collect and document feedback

2. **Fix known issues**
   - Resolve broken sidebar toggle
   - Remove unused components from landing page

3. **Documentation maintenance**
   - Update this roadmap with progress
   - Document lessons learned from Phase 1-4

### Short-term (3-6 months)

1. **Plan advanced lessons content**
   - Survey community for requested topics
   - Create lesson outlines
   - Assign reviewers

2. **Expand smart contract examples**
   - Gather community requests
   - Implement 2-3 real-world patterns
   - Add integration examples

3. **Improve analytics**
   - Set up dashboards for tracking
   - Analyze learner engagement patterns
   - Refine content based on metrics

### Long-term (6-12 months)

1. **Design certification program**
   - Define competency standards
   - Create assessment criteria
   - Plan review process

2. **Scale community**
   - Recruit additional maintainers
   - Establish contribution guidelines
   - Plan monthly/quarterly workshops

3. **Integrate with broader Cardano ecosystem**
   - Partner with Cardano educational initiatives
   - Link from official Cardano resources
   - Contribute to Cardano documentation

---

**Related documents:**
- [Project Overview (PDR)](./project-overview-pdr.md)
- [Codebase Summary](./codebase-summary.md)
- [System Architecture](./system-architecture.md)
