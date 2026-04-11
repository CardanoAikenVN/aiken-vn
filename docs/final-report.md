---
title: "Final Closeout Report"
sidebar_position: 100
description: "Final closeout report for the Vietnamese Aiken project"
---

# Final Closeout Report

**Project**: Vietnamese Aiken - Open-Source Aiken Smart Contract Curriculum
**Organization**: CardanoAikenVN
**Date**: March 2026
**License**: CC BY-4.0

## 1. Introduction

Vietnamese Aiken is the first open-source curriculum for mastering Aiken smart contract development on Cardano, created entirely in Vietnamese. The project addresses a critical gap: while Cardano development resources exist primarily in English, the Vietnamese developer community (one of the largest crypto-adopting populations globally) lacked structured, native-language educational materials.

This report summarizes the project's deliverables, outcomes, and sustainability plan.

## 2. Project Overview

### Goals
- Create a complete Vietnamese-language Aiken learning path from zero to deployment
- Provide working, tested smart contract examples
- Build an accessible, open-source documentation hub
- Establish a self-sustaining community of Vietnamese Cardano developers

### Target Audience
- Vietnamese developers new to blockchain
- Developers with programming experience learning Cardano
- Students and educators in Vietnamese universities
- Existing Cardano community members wanting to learn Aiken

## 3. Learning Hub Architecture

### Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Static Site Generator | Docusaurus | 3.9.2 |
| Frontend Framework | React | 19 |
| Styling | Tailwind CSS | 3.4.17 |
| Animations | Framer Motion | latest |
| Analytics | Firebase/Firestore | 12.6.0 |
| Smart Contracts | Aiken (stdlib) | v2.2.0 |
| CI/CD | GitHub Actions | - |
| Hosting | GitHub Pages | - |

### Site Features
- Pixel-art retro/cyberpunk themed landing page
- Dark mode documentation with syntax highlighting
- WCAG 2.1 AA accessibility compliance
- Vietnamese locale (`lang="vi"`)
- Mermaid diagram support for architecture visualizations
- Responsive design (mobile + desktop)
- Canvas-based animated starfield background
- Interactive quest timeline for learning path navigation

### Live URL
https://uberhub-mentorias.github.io/

### Repository
https://github.com/CardanoAikenVN/aiken-vn

## 4. Lessons and Tutorials

### Curriculum Structure

The curriculum is organized into 5 progressive parts with 20 lessons total:

#### Part 1: The Aiken Foundation (13 lessons)

| # | Topic | Stage |
|---|-------|-------|
| 01 | Installation | Setup |
| 02 | Introduction to Aiken | Setup |
| 03 | Aiken CLI | Syntax |
| 04 | Project Structure | Syntax |
| 05 | Variables & Constants | Syntax |
| 06 | Primitive Types | Syntax |
| 07 | Custom Types | Syntax |
| 08 | Control Flow | Syntax |
| 09 | Functions | Syntax |
| 10 | Modules | Syntax |
| 11 | Data | Syntax |
| 12 | Unit Testing | Testing |
| 13 | Troubleshooting | Testing |

#### Part 2: Cardano Architecture (3 lessons)
- Introduction to Cardano blockchain
- UTXO Model (Extended UTXO)
- Datum & Redeemer concepts

#### Part 3: Your First Validator (1 lesson)
- Building a spending validator (vesting contract)

#### Part 4: Minting Tokens & NFTs (2 lessons)
- FT vs NFT concepts on Cardano
- Minting policy implementation

#### Part 5: The Escrow Contract (1 lesson)
- Multi-party escrow with timelock and dispute resolution

### Content Standards
- All lessons written in Vietnamese with proper diacritics
- Each lesson includes: learning objectives, explanations, code examples, summaries
- Admonitions (tip, info, warning, danger) for important notes
- YAML frontmatter for SEO and navigation

## 5. Smart Contract Examples

The `examples/` directory contains 4 production-quality validators with comprehensive test suites:

| Validator | Type | Description | Tests |
|-----------|------|-------------|-------|
| `gift.ak` | Spending | Password-hash protected gift claiming | 7 |
| `escrow.ak` | Spending | Buyer-seller escrow with timelock | 14 |
| `nft_policy.ak` | Minting | One-shot NFT minting with quantity guarantee | 4 |
| `simple_ft.ak` | Minting | Admin-controlled fungible token | 2 |
| `syntax.ak` | Library | Aiken language patterns and utilities | 53 |

**Total: 80 tests, 80 passing, 0 failing**

### Test Coverage
- Happy path validation (correct inputs succeed)
- Authorization failure (wrong/missing signatures rejected)
- Time boundary checks (deadline enforcement)
- Value validation (insufficient funds rejected)
- Edge cases (empty inputs, boundary conditions)

### Compilation
All validators compile to UPLC (Untyped Plutus Core) via `aiken build`, producing `plutus.json` for on-chain deployment.

## 6. Security Guidelines

A dedicated security guidelines document (`docs/security-guidelines.md`) covers:

- Cardano eUTXO security model advantages and specific vulnerabilities
- Validator security checklist (datum validation, signature verification, time ranges, output validation, one-shot minting, catch-all rejection)
- Common vulnerability patterns (double satisfaction, datum hijacking, insufficient output validation, unbounded computation)
- Testing requirements and naming conventions
- Pre-deployment checklist

## 7. CI/CD Pipeline

### Build Pipeline (`ci.yml`)
- Triggers on push to main/part-* branches and pull requests
- Validates contributor identity
- Builds production site with Node.js 20
- Caches npm dependencies for performance
- Uploads build artifacts (7-day retention)

### Visual Regression (`before-after.yml`)
- Triggers on pull requests to main
- Builds both main branch and PR branch
- Captures before/after screenshots using Playwright
- Auto-comments on PR with visual comparison
- Prevents unintended UI regressions

### Aiken Tests (`examples/.github/workflows/tests.yml`)
- Runs `aiken fmt --check` (formatting)
- Runs `aiken check -D` (type checking + tests)
- Runs `aiken build` (compilation)

## 8. Community Engagement

### Contribution Infrastructure
- **CONTRIBUTING.md**: Bilingual (Vietnamese + English) contribution guidelines with branch naming, commit format, PR checklist
- **DEVELOPER_GUIDE.md**: 1,200+ line development reference covering environment setup, coding standards, debugging
- **Issue Templates**: Bug reports, feature requests, lesson feedback (GitHub YAML forms)
- **Code of Conduct**: Welcoming, inclusive community standards

### Communication Channels
- GitHub Issues for bug reports and feature requests
- GitHub Discussions for community Q&A
- Telegram group for real-time discussion
- Workshop events for onboarding new developers

## 9. Sustainability Plan

See [SUSTAINABILITY.md](https://github.com/CardanoAikenVN/aiken-vn/blob/main/SUSTAINABILITY.md) for the full plan. Key elements:

- **Governance**: Core maintainers review PRs weekly; community maintainers invited based on contributions
- **Funding**: GitHub Sponsors enabled for community support
- **Continuity**: CC BY-4.0 license ensures the project can be forked and continued by anyone
- **Roadmap**: Short-term (advanced lessons, video tutorials), medium-term (quarterly workshops, testnet integration), long-term (certification program, university partnerships)

See [MAINTAINERS.md](https://github.com/CardanoAikenVN/aiken-vn/blob/main/MAINTAINERS.md) for the current maintainer list and responsibilities.

## 10. Deliverables Checklist

| Deliverable | Status | Evidence |
|-------------|--------|----------|
| Final closeout report | Complete | This document |
| Learning hub website | Complete | https://uberhub-mentorias.github.io/ |
| GitHub repository | Complete | https://github.com/CardanoAikenVN/aiken-vn |
| Core + advanced lessons (20) | Complete | `docs/` directory (26 files across 5 parts) |
| Smart contract examples (4) | Complete | `examples/validators/` |
| Test suite (80 tests passing) | Complete | `docs-dev/test-evidence.md` |
| Security guidelines | Complete | `docs/security-guidelines.md` |
| Maintainer list | Complete | `MAINTAINERS.md` |
| Sustainability plan | Complete | `SUSTAINABILITY.md` |
| CC BY-4.0 license | Complete | `LICENSE` |
| Issue templates | Complete | `.github/ISSUE_TEMPLATE/` |
| GitHub sponsorship | Complete | `.github/FUNDING.yml` |
| Contributor guidelines | Complete | `CONTRIBUTING.md`, `DEVELOPER_GUIDE.md` |
| CI/CD pipeline | Complete | `.github/workflows/` |
| Final closeout video | Pending | To be recorded |
| Public workshop (50+ attendees) | Pending | To be scheduled |
| Workshop recording | Pending | Depends on workshop |
| Video tutorials (VN voiceover + EN subs) | Pending | To be produced |
| Community channel (30+ members) | Pending | To be grown |
| 10 feedback submissions | Pending | To be collected via GitHub Issues |

## 11. Future Work

### Immediate (pending deliverables)
- Record final closeout video (Vietnamese voiceover + English subtitles)
- Organize and execute public workshop targeting 50+ attendees
- Record and upload workshop
- Produce video tutorials for each curriculum part
- Grow community channel to 30+ active members
- Collect 10+ valid feedback submissions via GitHub Issues

### Content Expansion
- Multi-signature validator patterns
- Governance contract examples
- DeFi protocol patterns (liquidity pools, lending)
- Integration with Cardano testnet for hands-on deployment exercises

### Platform Improvements
- Search functionality across all lessons
- Progress tracking for learners
- Interactive code playground (Aiken REPL in browser)
- Automated lesson validation (broken links, code compilation)
