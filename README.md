# Vietnamese Aiken

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

<a name="english"></a>

## English

The first open-source curriculum for mastering Aiken and Smart Contracts on Cardano, tailored for Vietnamese developers.

**Live Site:** [https://aiken-vn.vercel.app/](https://aiken-vn.vercel.app/)

### Features

- **Language**: 100% Vietnamese content
- **Theme**: Pixel-art retro/cyberpunk landing page with dark mode documentation
- **Accessibility**: WCAG 2.1 AA compliant
- **Examples**: Working Aiken smart contracts with 80 automated tests
- **Curriculum**: Complete learning path from basics to deployment (5 parts, 20 lessons, 32 files)

### Curriculum

#### Part 1: The Aiken Foundation (13 lessons)
| # | Lesson | Stage |
|---|--------|-------|
| 01 | Installation | Setup |
| 02 | Introduction | Setup |
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
Introduction to Cardano, UTXO Model, Datum & Redeemer

#### Part 3: Your First Validator (1 lesson)
Building a Spending Validator

#### Part 4: Minting Tokens & NFTs (2 lessons)
FT & NFT Concepts, Minting Policies

#### Part 5: The Escrow Contract (1 lesson)
Multi-party escrow with timelock

### Example Smart Contracts

The `examples/` directory contains working Aiken smart contracts:

| Validator | Description | Tests |
|-----------|-------------|-------|
| `gift.ak` | Password-protected gift claiming | 8 |
| `escrow.ak` | Buyer-seller escrow with timelock | 16 |
| `nft_policy.ak` | One-shot NFT minting policy | 4 |
| `simple_ft.ak` | Admin-controlled fungible token | 2 |

```bash
cd examples
aiken check    # Type check and run tests
aiken build    # Compile to Plutus
```

### Quick Start

Prerequisites: [Node.js](https://nodejs.org/) >= 20.0

```bash
git clone https://github.com/CardanoAikenVN/aiken-vn.git
cd aiken-vn
npm install
npm start      # Dev server at http://localhost:3000
```

### Build

```bash
npm run build  # Production build (output: build/)
npm run serve  # Preview production build
```

### Project Structure

```
├── docs/                  # Curriculum + docs (32 Markdown/MDX files)
├── examples/              # Aiken validators (4) + tests (80)
├── raw_doc/               # Source lesson materials
├── src/                   # React components (16 landing page files)
├── static/img/            # Images and logos
├── .github/workflows/     # CI/CD pipelines
├── docusaurus.config.js   # Site configuration
└── package.json           # Dependencies
```

### Developer Documentation

Documentation for contributors lives in `docs/`:

| Document | Purpose |
|----------|---------|
| [Project Overview (PDR)](docs/project-overview-pdr.md) | Project goals, audience, deliverables, milestones |
| [Codebase Summary](docs/codebase-summary.md) | Repository structure, component hierarchy, known issues |
| [Code Standards](docs/code-standards.md) | Naming conventions, patterns, styling, git workflow |
| [System Architecture](docs/system-architecture.md) | Architecture, CI/CD, design system, data models |
| [Project Roadmap](docs/project-roadmap.md) | Phase status, timeline, success metrics, recommendations |

### Contributing

Contributions are welcome. Please read:
- [CONTRIBUTING.md](CONTRIBUTING.md) -- Contribution guidelines
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) -- Development setup & standards
- [docs-dev/code-standards.md](docs-dev/code-standards.md) -- Code conventions

### License

Released under the [CC BY-4.0](https://creativecommons.org/licenses/by/4.0/) license.

---

<a name="tiếng-việt"></a>

## Tiếng Việt

Tai lieu huong dan lap trinh Aiken va Smart Contract tren Cardano bang tieng Viet -- du an ma nguon mo dau tien danh cho cong dong lap trinh vien Viet Nam.

**Trang web:** [https://aiken-vn.vercel.app/](https://aiken-vn.vercel.app/)

### Tinh nang

- **Ngon ngu**: 100% Tieng Viet
- **Giao dien**: Landing page pixel-art retro/cyberpunk, tai lieu dark mode
- **Tiep can**: Tuan thu chuan WCAG 2.1 AA
- **Vi du**: Smart contract Aiken hoat dong kem 30+ test tu dong
- **Noi dung**: Lo trinh hoc tap tu co ban den nang cao (5 phan, 20 bai)

### Noi dung hoc tap

| Phan | Chu de | So bai | Giai doan |
|------|--------|--------|-----------|
| 1 | Nen Tang Aiken | 13 | Setup, Syntax, Testing |
| 2 | Kien Truc Cardano | 3 | Extra |
| 3 | Validator Dau Tien | 1 | Deployment |
| 4 | Phat Hanh Token & NFT | 2 | Deployment |
| 5 | Hop Dong Escrow | 1 | Deployment |

### Vi du Smart Contract

| Validator | Mo ta | Tests |
|-----------|-------|-------|
| `gift.ak` | Nhan qua bang mat khau | 8 |
| `escrow.ak` | Ky quy buyer-seller voi timelock | 16 |
| `nft_policy.ak` | Policy mint NFT one-shot | 4 |
| `simple_ft.ak` | Token do admin kiem soat | 2 |

```bash
cd examples
aiken check    # Kiem tra type va chay tests
aiken build    # Compile sang Plutus
```

### Bat dau nhanh

Yeu cau: [Node.js](https://nodejs.org/) >= 20.0

```bash
git clone https://github.com/CardanoAikenVN/aiken-vn.git
cd aiken-vn
npm install
npm start      # Server tai http://localhost:3000
```

### Build

```bash
npm run build  # Build production (output: build/)
npm run serve  # Xem truoc ban build
```

### Cau Truc Du An

```
├── docs/                  # Tai lieu + lesson (32 Markdown/MDX files)
├── examples/              # Aiken validators (4) + tests (80)
├── raw_doc/               # Bai hoc goc
├── src/                   # React landing page (16 files)
├── static/img/            # Hinh anh va logo
├── .github/workflows/     # CI/CD pipelines
├── docusaurus.config.js   # Cau hinh trang
└── package.json           # Dependencies
```

### Tai Lieu Developer

Tai lieu phat trien cho nhung nguoi dong gop nam trong `docs/`:

| Tai Lieu | Muc Dich |
|----------|----------|
| [Project Overview (PDR)](docs/project-overview-pdr.md) | Muc tieu, doi tuong, san pham, milestone |
| [Codebase Summary](docs/codebase-summary.md) | Cau truc repo, entry points, component |
| [Code Standards](docs/code-standards.md) | Quy uoc code, git workflow, patterns |
| [System Architecture](docs/system-architecture.md) | Kien truc, CI/CD, design system |
| [Project Roadmap](docs/project-roadmap.md) | Trang thai, timeline, muc tieu thanh cong |

### Dong gop

Moi dong gop deu duoc hoan nghenh. Vui long doc:
- [CONTRIBUTING.md](CONTRIBUTING.md) -- Huong dan dong gop
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) -- Cai dat & quy chuan code
- [docs-dev/code-standards.md](docs-dev/code-standards.md) -- Quy uoc code

### Giay phep

Phat hanh theo giay phep [CC BY-4.0](https://creativecommons.org/licenses/by/4.0/).

---

Built for the Cardano Vietnam Community.
