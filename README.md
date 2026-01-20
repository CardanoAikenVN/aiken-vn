# Vietnamese Aiken

[![CI](https://github.com/uberhub-mentorias/docusaurus/actions/workflows/ci.yml/badge.svg)](https://github.com/uberhub-mentorias/docusaurus/actions/workflows/ci.yml)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.9.2-blue)](https://docusaurus.io/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)

[English](#english) | [Tieng Viet](#tieng-viet)

---

## English

The first open-source curriculum for mastering **Aiken** and **Smart Contracts** on Cardano, tailored for Vietnamese developers.

### Features

- **Language**: 100% Vietnamese content
- **Theme**: Dark mode optimized for reading
- **Curriculum**: Complete learning path from basics to deployment
- **Accessibility**: WCAG-compliant interface

### Quick Start

**Prerequisites:** [Node.js](https://nodejs.org/) v20 or higher

```bash
# Clone the repository
git clone https://github.com/uberhub-mentorias/docusaurus.git
cd docusaurus

# Install dependencies
npm install

# Start development server
npm start
```

The site opens automatically at `http://localhost:3000`.

### Development Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run serve` | Serve production build locally |
| `npm run clear` | Clear Docusaurus cache |

### Curriculum Overview

| Part | Topic | Lessons | Status |
|------|-------|---------|--------|
| 1 | The Aiken Foundation | 13 | 53% |
| 2 | Cardano Architecture | 3 | Planned |
| 3 | Your First Validator | 1 | Planned |
| 4 | Minting Tokens & NFTs | 2 | Planned |
| 5 | Escrow Contract | 1 | Planned |

### Project Structure

```
aiken-vn/
├── docs/                    # Documentation content (Markdown)
│   ├── 01-the-aiken-foundation/  # Part 1: Aiken basics
│   ├── 02-cardano-architecture/  # Part 2: Cardano concepts
│   ├── 03-your-first-validator/  # Part 3: Validators
│   ├── 04-minting-tokens-nfts/   # Part 4: Token minting
│   └── 05-escrow-contract/       # Part 5: Escrow
├── docs-project/            # Project documentation
├── src/                     # Source code
│   ├── components/          # React components
│   ├── css/                 # Custom styles
│   ├── lib/                 # Utilities (Firebase, tracking)
│   └── pages/               # Custom pages
├── docusaurus.config.js     # Main configuration
├── sidebars.js              # Sidebar configuration
└── tailwind.config.js       # Tailwind CSS config
```

### Documentation

Detailed project documentation is available in `docs-project/`:

- [Project Overview & PDR](docs-project/project-overview-pdr.md) - Vision, goals, and requirements
- [Codebase Summary](docs-project/codebase-summary.md) - Technical overview
- [Code Standards](docs-project/code-standards.md) - Coding conventions
- [System Architecture](docs-project/system-architecture.md) - Architecture diagrams

### Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Docusaurus 3.9.2 |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS 3.4 |
| Animations | Framer Motion |
| Analytics | Firebase Firestore |
| Diagrams | Mermaid |

### Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Follow the [Code Standards](docs-project/code-standards.md)
4. Submit a Pull Request

### License

This documentation is released under the [CC BY-4.0](https://creativecommons.org/licenses/by/4.0/) license.

---

## Tieng Viet

Cong thong tin tai lieu huong dan lap trinh **Aiken** va **Smart Contract** tren Cardano bang tieng Viet.

### Tinh nang

- **Ngon ngu**: 100% Tieng Viet
- **Giao dien**: Dark mode toi uu cho viec doc tai lieu
- **Noi dung**: Lo trinh hoc tap tu co ban den nang cao
- **Tro nang**: Giao dien tuan thu WCAG

### Bat dau nhanh

**Yeu cau:** [Node.js](https://nodejs.org/) phien ban 20 tro len

```bash
# Clone repository
git clone https://github.com/uberhub-mentorias/docusaurus.git
cd docusaurus

# Cai dat dependencies
npm install

# Chay server phat trien
npm start
```

Trang web se tu dong mo tai `http://localhost:3000`.

### Cac lenh phat trien

| Lenh | Mo ta |
|------|-------|
| `npm start` | Chay server phat trien voi hot reload |
| `npm run build` | Build cho production |
| `npm run serve` | Chay ban build production |
| `npm run clear` | Xoa cache Docusaurus |

### Tong quan chuong trinh hoc

| Phan | Chu de | Bai hoc | Trang thai |
|------|--------|---------|------------|
| 1 | Nen Tang Aiken | 13 | 53% |
| 2 | Kien Truc Cardano | 3 | Du kien |
| 3 | Validator Dau Tien | 1 | Du kien |
| 4 | Phat Hanh Token & NFT | 2 | Du kien |
| 5 | Hop Dong Escrow | 1 | Du kien |

### Chi tiet chuong trinh hoc

#### Phan 1: Nen Tang Aiken

| # | Bai hoc | Muc tieu hoc tap | Trang thai |
|---|---------|------------------|------------|
| 01 | Cai Dat | Thiet lap moi truong lap trinh | Hoan thanh |
| 02 | Gioi Thieu | Tong quan ve Aiken | Hoan thanh |
| 03 | Aiken CLI | Lam chu giao dien dong lenh | Hoan thanh |
| 04 | Cau Truc Du An | Hieu cach to chuc du an | Hoan thanh |
| 05 | Bien & Hang So | Dinh nghia va su dung bien | Hoan thanh |
| 06 | Kieu Du Lieu Co Ban | Lam viec voi cac kieu co ban | Hoan thanh |
| 07 | Kieu Tuy Chinh | Dinh nghia cau truc du lieu phuc tap | Hoan thanh |
| 08 | Luong Dieu Khien | Trien khai logic dieu kien | Dang viet |
| 09 | Ham | Viet logic xu ly tai su dung | Dang viet |
| 10 | Modules | Quan ly va chia nho ma nguon | Dang viet |
| 11 | Du Lieu | Hieu cach xu ly du lieu | Dang viet |
| 12 | Kiem Thu Don Vi | Dam bao code chay dung | Dang viet |
| 13 | Xu Ly Loi | Ky thuat debug va xu ly van de | Dang viet |

### Cau truc du an

```
aiken-vn/
├── docs/                    # Noi dung tai lieu (Markdown)
│   ├── 01-the-aiken-foundation/  # Phan 1: Co ban Aiken
│   ├── 02-cardano-architecture/  # Phan 2: Kien truc Cardano
│   ├── 03-your-first-validator/  # Phan 3: Validators
│   ├── 04-minting-tokens-nfts/   # Phan 4: Phat hanh token
│   └── 05-escrow-contract/       # Phan 5: Escrow
├── docs-project/            # Tai lieu du an
├── src/                     # Ma nguon
│   ├── components/          # React components
│   ├── css/                 # CSS tuy chinh
│   ├── lib/                 # Tien ich (Firebase, tracking)
│   └── pages/               # Trang tuy chinh
├── docusaurus.config.js     # Cau hinh chinh
├── sidebars.js              # Cau hinh sidebar
└── tailwind.config.js       # Cau hinh Tailwind CSS
```

### Tai lieu du an

Tai lieu chi tiet co san trong `docs-project/`:

- [Tong Quan Du An & PDR](docs-project/project-overview-pdr.md) - Tam nhin, muc tieu, yeu cau
- [Tom Tat Ma Nguon](docs-project/codebase-summary.md) - Tong quan ky thuat
- [Tieu Chuan Code](docs-project/code-standards.md) - Quy uoc lap trinh
- [Kien Truc He Thong](docs-project/system-architecture.md) - So do kien truc

### Cong nghe su dung

| Loai | Cong nghe |
|------|-----------|
| Framework | Docusaurus 3.9.2 |
| UI | React 19, TypeScript |
| CSS | Tailwind CSS 3.4 |
| Animations | Framer Motion |
| Analytics | Firebase Firestore |
| Diagrams | Mermaid |

### Dong gop

Moi dong gop deu duoc hoan nghenh! Vui long:

1. Fork repository
2. Tao nhanh tinh nang (`git checkout -b feature/tinh-nang`)
3. Tuan theo [Tieu Chuan Code](docs-project/code-standards.md)
4. Gui Pull Request

### Giay phep

Tai lieu nay duoc phat hanh theo giay phep [CC BY-4.0](https://creativecommons.org/licenses/by/4.0/).

---

**Resources / Tai nguyen:**

- [Aiken Official Docs](https://aiken-lang.org)
- [Aiken Playground](https://play.aiken-lang.org)
- [Cardano Developer Portal](https://developers.cardano.org)
- [Discord Community](https://discord.gg/ub6atE94v4)

---

Built for the Cardano Vietnam Community.
