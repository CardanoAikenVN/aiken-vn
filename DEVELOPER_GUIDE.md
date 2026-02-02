# Huong Dan Phat Trien / Developer Guide

> [Tieng Viet](#tieng-viet) | [English](#english)

---

## Tieng Viet

Tai lieu nay cung cap thong tin toan dien cho cac lap trinh vien lam viec tren du an tai lieu Vietnamese Aiken. No bao gom cai dat moi truong, quy chuan code, quy uoc dat ten, va mau gui bai hoc.

---

### Muc luc

- [Cai dat moi truong phat trien](#cai-dat-moi-truong-phat-trien)
- [Kien truc du an](#kien-truc-du-an)
- [Cau truc thu muc](#cau-truc-thu-muc)
- [Quy trinh phat trien](#quy-trinh-phat-trien)
- [Quy chuan code](#quy-chuan-code)
- [Quy uoc dat ten](#quy-uoc-dat-ten)
- [Mau gui bai hoc](#mau-gui-bai-hoc)
- [Huong dan testing](#huong-dan-testing)
- [Meo debug](#meo-debug)
- [Van de thuong gap va giai phap](#van-de-thuong-gap-va-giai-phap)

---

### Cai dat moi truong phat trien

#### Yeu cau he thong

| Cong cu | Phien ban | Cai dat | Kiem tra |
|---------|-----------|---------|----------|
| Node.js | v20+ | [nodejs.org](https://nodejs.org/) | `node --version` |
| npm | v10+ | Di kem voi Node.js | `npm --version` |
| Git | Moi nhat | [git-scm.com](https://git-scm.com/) | `git --version` |
| Aiken | Moi nhat | Xem ben duoi | `aiken --version` |

#### Cai dat Aiken

**macOS (Homebrew)**
```bash
brew install aiken-lang/tap/aikup
aikup
```

**macOS/Linux (curl)**
```bash
curl --proto '=https' --tlsv1.2 -LsSf https://install.aiken-lang.org | sh
```

**Windows (PowerShell)**
```powershell
powershell -c "irm https://windows.aiken-lang.org | iex"
```

**npm (da nen tang)**
```bash
npm install -g @aiken-lang/aikup
aikup
```

#### Cai dat du an

```bash
# Clone repository
git clone https://github.com/CardanoAikenVN/aiken-vn.git
cd aiken-vn

# Cai dat dependencies
npm install

# Khoi dong development server
npm start
```

Development server khoi dong tai `http://localhost:3000` voi hot reload duoc bat.

#### Extension VS Code khuyen dung

| Extension | Muc dich |
|-----------|----------|
| Aiken | Syntax highlighting va LSP cho Aiken |
| ESLint | Linting JavaScript/TypeScript |
| Prettier | Dinh dang code |
| Tailwind CSS IntelliSense | Tu dong hoan thanh class Tailwind |
| MDX | Ho tro file MDX |
| Mermaid | Xem truoc diagram |

---

### Kien truc du an

#### Ngan xep cong nghe

| Danh muc | Cong nghe | Phien ban |
|----------|-----------|-----------|
| Framework | Docusaurus | 3.9.2 |
| Thu vien UI | React | 19 |
| Style | Tailwind CSS | 3.4 |
| Animation | Framer Motion | 12+ |
| Icon | Lucide React | Moi nhat |
| Analytics | Firebase Firestore | 12+ |
| Diagram | Mermaid | Tich hop san |
| Smart Contract | Aiken | Moi nhat (stdlib v2.2.0) |

#### So do kien truc

```
+------------------+     +-------------------+     +------------------+
|                  |     |                   |     |                  |
|   Static Site    |---->|   Docusaurus      |---->|   Build Output   |
|   (Markdown)     |     |   (SSG)           |     |   (HTML/JS/CSS)  |
|                  |     |                   |     |                  |
+------------------+     +-------------------+     +------------------+
        |                        |
        v                        v
+------------------+     +-------------------+
|                  |     |                   |
|   React          |     |   Tailwind CSS    |
|   Components     |     |   + Custom CSS    |
|                  |     |                   |
+------------------+     +-------------------+
```

#### Luong du lieu

```
Yeu cau nguoi dung
     |
     v
+--------------------+
|  Docusaurus SSG    |
|  (File tinh)       |
+--------------------+
     |
     +---> docs/*.md ---> Markdown Parser ---> React Components ---> HTML
     |
     +---> src/components/*.tsx ---> React ---> UI tuong tac
     |
     +---> examples/*.ak ---> Aiken Compiler ---> Vi du tai lieu
```

---

### Cau truc thu muc

```
aiken-vn/
├── .github/                    # Cau hinh GitHub
│   └── workflows/
│       └── ci.yml              # Pipeline CI/CD
│
├── docs/                       # Tai lieu tieng Viet (25+ file)
│   ├── 01-the-aiken-foundation/    # Phan 1: Co ban Aiken (13 bai)
│   │   ├── index.md                # Tong quan phan
│   │   ├── 01_Installation.md      # Bai 1
│   │   ├── 02_Introduction.md      # Bai 2
│   │   └── ...
│   ├── 02-cardano-architecture/    # Phan 2: Khai niem Cardano (3 bai)
│   ├── 03-your-first-validator/    # Phan 3: Smart contract dau tien (1 bai)
│   ├── 04-minting-tokens-nfts/     # Phan 4: Mint token (2 bai)
│   └── 05-escrow-contract/         # Phan 5: Mau escrow (1 bai)
│
├── docs-project/               # Tai lieu cho lap trinh vien
│   ├── code-standards.md       # Quy uoc code
│   ├── codebase-summary.md     # Tong quan ky thuat
│   ├── project-overview-pdr.md # Tam nhin va lo trinh
│   └── system-architecture.md  # So do kien truc
│
├── examples/                   # Smart contract Aiken hoat dong
│   ├── validators/             # File nguon validator
│   │   ├── escrow.ak           # Hop dong escrow
│   │   ├── gift.ak             # Spending validator don gian
│   │   ├── nft_policy.ak       # Policy mint NFT
│   │   └── simple_ft.ak        # Policy token thay the
│   ├── lib/                    # File test (80+ tests)
│   │   ├── escrow_test.ak      # Test escrow
│   │   ├── gift_test.ak        # Test gift validator
│   │   └── ...
│   ├── aiken.toml              # Cau hinh du an Aiken
│   └── plutus.json             # Output Plutus da bien dich
│
├── src/                        # Ma nguon React
│   ├── components/             # Component tai su dung
│   │   ├── HomepageFeatures/   # The tinh nang
│   │   ├── LandingPage/        # Phan trang chu
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Curriculum.tsx
│   │   │   └── ...
│   │   └── YouTubeVideo.js     # Component nhung video
│   ├── css/
│   │   └── custom.css          # Style toan cuc + Tailwind
│   ├── lib/                    # Module tien ich
│   │   └── firebase.js         # Cau hinh Firebase
│   ├── pages/                  # Trang tuy chinh
│   │   └── index.js            # Trang chu
│   └── theme/                  # Ghi de theme Docusaurus
│
├── static/                     # Tai san tinh
│   └── img/                    # Hinh anh va icon
│
├── docusaurus.config.js        # Cau hinh trang
├── sidebars.js                 # Cau truc dieu huong
├── tailwind.config.js          # Cau hinh Tailwind
├── package.json                # Dependencies
└── README.md                   # Tong quan du an
```

#### File quan trong

| File | Muc dich |
|------|----------|
| `docusaurus.config.js` | Tieu de trang, URL, i18n, theme, plugin |
| `sidebars.js` | Cau truc sidebar tai lieu |
| `tailwind.config.js` | Tuy chinh Tailwind |
| `src/css/custom.css` | CSS toan cuc, ghi de Infima, animation |
| `examples/aiken.toml` | Dependencies du an Aiken |

---

### Quy trinh phat trien

#### Cac lenh kha dung

| Lenh | Mo ta |
|------|-------|
| `npm start` | Khoi dong dev server voi hot reload |
| `npm run build` | Build trang production vao `build/` |
| `npm run serve` | Phuc vu production build o local |
| `npm run clear` | Xoa cache Docusaurus |
| `npm run swizzle` | Tuy chinh component Docusaurus |

#### Cac lenh Aiken (trong thu muc `examples/`)

| Lenh | Mo ta |
|------|-------|
| `aiken build` | Bien dich validator sang Plutus |
| `aiken check` | Chay tat ca tests |
| `aiken fmt` | Dinh dang code Aiken |
| `aiken docs` | Tao tai lieu |

#### Cac buoc quy trinh phat trien

1. **Tao feature branch**
   ```bash
   git checkout -b feature/tinh-nang-cua-ban
   ```

2. **Khoi dong development server**
   ```bash
   npm start
   ```

3. **Thuc hien thay doi** (docs, component, hoac examples)

4. **Xac nhan build**
   ```bash
   npm run build
   ```

5. **Test thay doi Aiken (neu ap dung)**
   ```bash
   cd examples && aiken check
   ```

6. **Commit va push**
   ```bash
   git add .
   git commit -m "feat: thong diep mo ta cua ban"
   git push origin feature/tinh-nang-cua-ban
   ```

7. **Mo pull request**

---

### Quy chuan code

#### Mau TypeScript/React Component

##### Cau truc Component

```typescript
// src/components/ComponentName/index.tsx

// 1. Import (ben ngoai, sau do ben trong)
import React from 'react';
import { motion } from 'framer-motion';
import { IconName } from 'lucide-react';

// 2. Dinh nghia kieu
interface ComponentProps {
  title: string;
  description?: string;
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

// 3. Dinh nghia component (su dung React.FC<Props>)
const ComponentName: React.FC<ComponentProps> = ({
  title,
  description,
  isActive = false,
  onClick,
  children,
}) => {
  // 4. Hooks (useState, useEffect, v.v.)
  const [state, setState] = React.useState(false);

  // 5. Xu ly su kien
  const handleClick = () => {
    if (onClick) onClick();
    setState(true);
  };

  // 6. Render
  return (
    <div
      className="component-wrapper"
      role="region"
      aria-labelledby={`${title}-heading`}
    >
      <h2 id={`${title}-heading`}>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
};

// 7. Export
export default ComponentName;
```

##### Cac thuc hanh tot nhat cho Component

| Thuc hanh | Mo ta |
|-----------|-------|
| TypeScript | Luon su dung TypeScript cho component moi |
| Functional Component | Su dung mau `React.FC<Props>` |
| Props Interface | Dinh nghia kieu prop ro rang |
| Default Props | Su dung gia tri mac dinh khi destructure |
| Accessibility | Them thuoc tinh ARIA |
| Semantic HTML | Su dung element HTML phu hop |

#### Quy uoc CSS/Tailwind

##### Thu tu class tien ich

Tuan theo thu tu nay de dong nhat:

```html
<div class="
  /* 1. Layout */
  flex flex-col items-center justify-center
  /* 2. Kich thuoc */
  w-full max-w-lg h-auto min-h-screen
  /* 3. Khoang cach */
  p-4 m-2 gap-4
  /* 4. Typography */
  text-lg font-bold text-white
  /* 5. Background/Border */
  bg-gray-900 border border-white rounded-lg
  /* 6. Hieu ung */
  shadow-lg opacity-90
  /* 7. Transition */
  transition-all duration-300
  /* 8. Trang thai */
  hover:bg-gray-800 focus:outline-none
  /* 9. Responsive */
  md:flex-row md:text-xl lg:px-8
">
```

##### Huong dan CSS tuy chinh

```css
/* Dinh dang comment phan */
/* ============================================
   TEN PHAN
   ============================================ */

/* Su dung dat ten kieu BEM cho class tuy chinh */
.component-name { }
.component-name__element { }
.component-name--modifier { }

/* Luon them trang thai focus */
.interactive-element:focus-visible {
  outline: 3px solid #5CE1E6;
  outline-offset: 2px;
}

/* Ton trong tuy chon giam chuyen dong */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none !important;
  }
}
```

##### Bien CSS

Su dung bien CSS da dinh nghia cua du an:

```css
/* Cac bien kha dung */
--bg-primary: #0F1B2A;
--bg-secondary: #112030;
--bg-card: #13253A;
--color-cyan: #5CE1E6;
--color-cyan-dark: #2BBAC0;
--color-cyan-light: #A3DCE2;
--text-heading: #FFFFFF;
--text-body: #DDE6ED;
```

#### Mau Smart Contract Aiken

##### Cau truc Validator

```aiken
//// Ten Validator
//// Mo ta ngan gon bang tieng Viet va/hoac tieng Anh

use aiken/collection/list
use cardano/transaction.{OutputReference, Transaction}

// ============================================
// KIEU DU LIEU
// ============================================

/// Kieu Datum voi tai lieu
pub type MyDatum {
  owner: ByteArray,
  deadline: Int,
  amount: Int,
}

/// Kieu Redeemer cho cac hanh dong chi tieu
pub type MyRedeemer {
  Action1
  Action2
  Action3
}

// ============================================
// HAM HO TRO
// ============================================

/// Ham ho tro voi tai lieu
fn helper_function(tx: Transaction, value: ByteArray) -> Bool {
  list.has(tx.extra_signatories, value)
}

// ============================================
// VALIDATOR CHINH
// ============================================

validator my_validator {
  spend(
    datum: Option<MyDatum>,
    redeemer: MyRedeemer,
    _input: OutputReference,
    tx: Transaction,
  ) {
    expect Some(d) = datum

    when redeemer is {
      Action1 -> // logic xac thuc
      Action2 -> // logic xac thuc
      Action3 -> // logic xac thuc
    }
  }

  else(_) {
    fail
  }
}
```

##### Mau file Test

```aiken
// lib/validator_test.ak

use validators/my_validator.{MyDatum, MyRedeemer, my_validator}

// Test thanh cong
test my_validator_action1_succeeds() {
  let datum = MyDatum { owner: #"abc123", deadline: 100, amount: 1000 }
  let redeemer = Action1
  my_validator.spend(Some(datum), redeemer, mock_ref(), mock_tx()) == True
}

// Test that bai (mong doi False hoac loi)
test my_validator_action1_fails_wrong_signer() fail {
  let datum = MyDatum { owner: #"abc123", deadline: 100, amount: 1000 }
  let redeemer = Action1
  my_validator.spend(Some(datum), redeemer, mock_ref(), bad_tx())
}
```

---

### Quy uoc dat ten

#### File va thu muc

| Loai | Quy uoc | Vi du |
|------|---------|-------|
| File tai lieu | `NN_Ten_Tieu_De.md` | `01_Installation.md`, `05_Variable_Constant.md` |
| Thu muc tai lieu | `NN-kebab-case/` | `01-the-aiken-foundation/`, `02-cardano-architecture/` |
| React component (TSX) | `PascalCase.tsx` | `Hero.tsx`, `QuestTimeline.tsx` |
| React component (JSX) | `PascalCase.js` | `YouTubeVideo.js` |
| Module TypeScript | `camelCase.ts` | `types.ts`, `constants.ts` |
| Tien ich JavaScript | `camelCase.js` | `tracking.js`, `firebase.js` |
| File CSS | `kebab-case.css` | `custom.css`, `styles.module.css` |
| File cau hinh | `kebab-case.ext` | `docusaurus.config.js`, `tailwind.config.js` |
| Aiken validator | `snake_case.ak` | `escrow.ak`, `nft_policy.ak` |
| File test Aiken | `*_test.ak` | `escrow_test.ak`, `syntax_test.ak` |

#### Component va bien

| Loai | Quy uoc | Vi du |
|------|---------|-------|
| React component | PascalCase | `HeroSection`, `FeatureCard` |
| Props component | camelCase | `isActive`, `onClick`, `userName` |
| Xu ly su kien | `handle` + Su kien | `handleClick`, `handleSubmit` |
| Bien boolean | tien to `is`/`has`/`can` | `isLoading`, `hasError`, `canSubmit` |
| Hang so | SCREAMING_SNAKE_CASE | `MAX_ITEMS`, `API_URL` |
| Class CSS | kebab-case | `hero-section`, `feature-card` |
| CSS BEM | `block__element--modifier` | `card__title--highlighted` |

#### Dat ten tai lieu

| Phan tu | Quy uoc | Vi du |
|---------|---------|-------|
| Thu muc phan | `NN-kebab-case/` | `01-the-aiken-foundation/` |
| File bai hoc | `NN_Title.md` | `01_Installation.md` |
| File index | `index.md` | `docs/01-the-aiken-foundation/index.md` |
| Tien to so | Hai chu so, them so 0 | `01`, `02`, `13` |
| Dau phan cach (file) | Gach duoi | `05_Variable_Constant.md` |
| Dau phan cach (thu muc) | Gach noi | `02-cardano-architecture/` |

---

### Mau gui bai hoc

#### YAML Frontmatter (Bat buoc)

```yaml
---
title: "Tieu de bai hoc bang tieng Viet"
sidebar_position: 1
slug: /duong-dan-tuy-chinh-tuy-chon
description: "Mo ta ngan gon cho SEO (1-2 cau)"
---
```

| Truong | Bat buoc | Mo ta |
|--------|----------|-------|
| `title` | Co | Tieu de hien thi (tieng Viet) |
| `sidebar_position` | Co | Thu tu trong sidebar (bat dau tu 1) |
| `slug` | Khong | Duong dan URL tuy chinh |
| `description` | Khuyen nghi | Mo ta meta SEO |

#### Mau bai hoc day du

Sao chep va tuy chinh mau nay cho bai hoc moi:

```markdown
---
title: Tieu de bai hoc
sidebar_position: N
description: "Mo ta ngan gon cho SEO"
---

# Tieu de bai hoc

Doan mo dau gioi thieu noi dung bai hoc (1-2 cau).

## Muc tieu hoc tap

Sau bai hoc nay, ban se:

- Muc tieu 1
- Muc tieu 2
- Muc tieu 3

---

## Phan 1: Gioi thieu

Noi dung gioi thieu khai niem...

### Khai niem co ban

Giai thich khai niem...

:::tip Meo
Meo huu ich hoac best practice.
:::

---

## Phan 2: Noi dung chinh

Noi dung chi tiet...

### Vi du code

```aiken
// Mo ta code bang tieng Viet
fn example_function(a: Int, b: Int) -> Int {
  a + b
}
```

:::info Thong tin
Thong tin bo sung hoac giai thich them.
:::

### Bang tom tat

| Cot 1 | Cot 2 | Cot 3 |
|-------|-------|-------|
| Gia tri 1 | Gia tri 2 | Gia tri 3 |
| Gia tri 4 | Gia tri 5 | Gia tri 6 |

---

## Phan 3: Thuc hanh

### Bai tap 1: [Ten bai tap]

Yeu cau bai tap...

```aiken
// Code khung cho bai tap
fn your_solution() {
  // TODO: Hoan thanh code
  todo
}
```

:::warning Luu y
Canh bao hoac luu y quan trong.
:::

---

## Tom tat

- Diem chinh 1
- Diem chinh 2
- Diem chinh 3

## Cau hoi on tap

1. Cau hoi 1?
2. Cau hoi 2?
3. Cau hoi 3?

---

**Tiep theo**: [Bai N+1 - Tieu de](./NN_Next_Lesson.md)
```

#### Cac loai Admonition

Su dung admonition cua Docusaurus cho cac khung goi y:

```markdown
:::tip Tieu de
Meo huu ich hoac thuc hanh tot.
:::

:::info Thong tin
Thong tin chung hoac ngu canh.
:::

:::warning Luu y
Canh bao hoac luu y quan trong.
:::

:::danger Nguy hiem
Canh bao nghiem trong ve cac van de tiem an.
:::

:::note Ghi chu
Ghi chu hoac lam ro them.
:::
```

#### Huong dan khoi code

| Ngon ngu | Dinh danh | Truong hop su dung |
|----------|-----------|-------------------|
| Aiken | `aiken` | Code smart contract |
| Bash/Shell | `bash` | Huong dan dong lenh |
| JavaScript | `javascript` | Code frontend |
| TypeScript | `typescript` | Code frontend co kieu |
| JSON | `json` | Cau hinh, du lieu |
| TOML | `toml` | Cau hinh du an Aiken |
| YAML | `yaml` | Frontmatter, CI/CD |
| PowerShell | `powershell` | Lenh Windows |

---

### Huong dan testing

#### Test build Docusaurus

```bash
# Build production day du (bat buoc truoc PR)
npm run build

# Phuc vu va test production build
npm run serve
```

#### Checklist xac nhan build

- [ ] Build hoan thanh khong loi
- [ ] Khong co canh bao lien ket hong (kiem tra console)
- [ ] Tat ca trang render dung
- [ ] Hinh anh tai dung
- [ ] Dieu huong hoat dong nhu mong doi

#### Huong dan test Aiken

```bash
cd examples

# Build contract
aiken build

# Chay tat ca test
aiken check

# Dinh dang code
aiken fmt
```

#### Yeu cau do phu test

| Validator | Test toi thieu |
|-----------|----------------|
| Validator don gian | 3-5 tests |
| Validator phuc tap | 10+ tests |
| Minting policy | 3-5 tests |

#### Quy uoc dat ten test

```aiken
// Mau: <ham>_<kich_ban>_<ket_qua_mong_doi>

test escrow_complete_succeeds() { ... }
test escrow_complete_fails_wrong_signer() fail { ... }
test escrow_cancel_before_deadline_succeeds() { ... }
test escrow_refund_after_deadline_succeeds() { ... }
```

---

### Meo debug

#### Van de Docusaurus

**Build that bai voi module not found**
```bash
# Xoa cache va cai dat lai
npm run clear
rm -rf node_modules package-lock.json
npm install
```

**Hot reload khong hoat dong**
```bash
# Khoi dong lai dev server
npm run clear && npm start
```

**Loi lien ket hong**
- Kiem tra duong dan tuong doi trong file markdown
- Xac nhan ten file khop chinh xac (phan biet hoa thuong)
- Su dung tien to `./` cho lien ket cung thu muc

#### Van de Aiken

**Loi bien dich**
```bash
# Kiem tra cu phap
aiken fmt

# Output build chi tiet
aiken build --verbose
```

**Test that bai**
```bash
# Chay test cu the
aiken check --match "test_name"

# Output test chi tiet
aiken check --verbose
```

#### DevTools trinh duyet

| Van de | Phuong phap debug |
|--------|-------------------|
| Van de layout | Inspect element, kiem tra CSS |
| Loi JavaScript | Tab Console |
| Van de mang | Tab Network |
| Hieu suat | Tab Performance |

---

### Van de thuong gap va giai phap

#### Van de: "Command not found: aiken"

**Nguyen nhan**: Aiken khong nam trong PATH

**Giai phap**:
```bash
# Them vao ~/.bashrc hoac ~/.zshrc
export PATH="$HOME/.aiken/bin:$PATH"

# Tai lai shell
source ~/.bashrc  # hoac ~/.zshrc
```

#### Van de: Build that bai voi loi bo nho

**Nguyen nhan**: Vuot qua gioi han heap Node.js

**Giai phap**:
```bash
# Tang gioi han bo nho Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### Van de: Ky tu tieng Viet hien thi sai

**Nguyen nhan**: Van de encoding file

**Giai phap**:
- Dam bao file duoc luu dang UTF-8
- Kiem tra cai dat encoding cua trinh soan thao
- Xac nhan `lang="vi"` trong HTML

#### Van de: Class Tailwind khong ap dung

**Nguyen nhan**: Class khong nam trong safelist hoac bi purge

**Giai phap**:
1. Kiem tra duong dan content trong `tailwind.config.js`
2. Them class dong vao safelist
3. Khoi dong lai dev server

#### Van de: Hinh anh khong tai

**Nguyen nhan**: Duong dan sai hoac thieu file

**Giai phap**:
- Su dung `/img/filename.png` cho hinh anh tinh
- Xac nhan file ton tai trong `static/img/`
- Kiem tra phan biet hoa thuong

#### Van de: Sidebar khong cap nhat

**Nguyen nhan**: Van de cache hoac cau hinh

**Giai phap**:
```bash
npm run clear
# Kiem tra loi trong sidebars.js
npm start
```

#### Van de: Test Aiken pass o local nhung fail trong CI

**Nguyen nhan**: Khong khop phien ban hoac khac biet moi truong

**Giai phap**:
- Kiem tra phien ban Aiken trong CI khop voi local
- Xac nhan dependencies trong `aiken.toml`
- Kiem tra van de dac thu nen tang

---

### Tai nguyen bo sung

#### Tai lieu du an

- [Quy chuan code](./docs-project/code-standards.md) - Quy uoc code chi tiet
- [Tong quan du an](./docs-project/project-overview-pdr.md) - Tam nhin va lo trinh
- [Tom tat codebase](./docs-project/codebase-summary.md) - Tong quan ky thuat
- [Kien truc he thong](./docs-project/system-architecture.md) - So do kien truc

#### Tai lieu ben ngoai

- [Tai lieu Docusaurus](https://docusaurus.io/docs)
- [Huong dan ngon ngu Aiken](https://aiken-lang.org/language-tour)
- [Tai lieu Tailwind CSS](https://tailwindcss.com/docs)
- [Tai lieu React](https://react.dev/)
- [Cong developer Cardano](https://developers.cardano.org/)

#### Cong dong

- [Discord](https://discord.gg/ub6atE94v4)
- [GitHub Discussions](https://github.com/CardanoAikenVN/aiken-vn/discussions)

---

### Nhan tro giup

Neu ban gap van de khong duoc de cap o day:

1. Tim kiem [GitHub Issues](https://github.com/CardanoAikenVN/aiken-vn/issues) hien co
2. Kiem tra [GitHub Discussions](https://github.com/CardanoAikenVN/aiken-vn/discussions)
3. Hoi trong [Discord](https://discord.gg/ub6atE94v4)
4. Mo issue moi voi:
   - Mo ta ro rang van de
   - Cac buoc tai tao
   - Hanh vi mong doi vs thuc te
   - Chi tiet moi truong (OS, phien ban Node, v.v.)

---
---

## English

This guide provides comprehensive information for developers working on the Vietnamese Aiken documentation project. It covers environment setup, coding standards, naming conventions, and lesson submission templates.

---

### Table of Contents

- [Development Environment Setup](#development-environment-setup)
- [Project Architecture](#project-architecture)
- [Directory Structure](#directory-structure)
- [Development Workflow](#development-workflow-1)
- [Coding Standards](#coding-standards)
- [Naming Conventions](#naming-conventions)
- [Lesson Submission Template](#lesson-submission-template)
- [Testing Guidelines](#testing-guidelines)
- [Debugging Tips](#debugging-tips)
- [Common Issues and Solutions](#common-issues-and-solutions)

---

### Development Environment Setup

#### Prerequisites

| Tool | Version | Installation | Verification |
|------|---------|--------------|--------------|
| Node.js | v20+ | [nodejs.org](https://nodejs.org/) | `node --version` |
| npm | v10+ | Bundled with Node.js | `npm --version` |
| Git | Latest | [git-scm.com](https://git-scm.com/) | `git --version` |
| Aiken | Latest | See below | `aiken --version` |

#### Installing Aiken

**macOS (Homebrew)**
```bash
brew install aiken-lang/tap/aikup
aikup
```

**macOS/Linux (curl)**
```bash
curl --proto '=https' --tlsv1.2 -LsSf https://install.aiken-lang.org | sh
```

**Windows (PowerShell)**
```powershell
powershell -c "irm https://windows.aiken-lang.org | iex"
```

**npm (cross-platform)**
```bash
npm install -g @aiken-lang/aikup
aikup
```

#### Project Setup

```bash
# Clone the repository
git clone https://github.com/CardanoAikenVN/aiken-vn.git
cd aiken-vn

# Install dependencies
npm install

# Start development server
npm start
```

The development server starts at `http://localhost:3000` with hot reload enabled.

#### Recommended VS Code Extensions

| Extension | Purpose |
|-----------|---------|
| Aiken | Syntax highlighting and LSP for Aiken |
| ESLint | JavaScript/TypeScript linting |
| Prettier | Code formatting |
| Tailwind CSS IntelliSense | Tailwind class autocomplete |
| MDX | MDX file support |
| Mermaid | Diagram preview |

---

### Project Architecture

#### Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Docusaurus | 3.9.2 |
| UI Library | React | 19 |
| Styling | Tailwind CSS | 3.4 |
| Animations | Framer Motion | 12+ |
| Icons | Lucide React | Latest |
| Analytics | Firebase Firestore | 12+ |
| Diagrams | Mermaid | Built-in |
| Smart Contracts | Aiken | Latest (stdlib v2.2.0) |

#### Architecture Diagram

```
+------------------+     +-------------------+     +------------------+
|                  |     |                   |     |                  |
|   Static Site    |---->|   Docusaurus      |---->|   Build Output   |
|   (Markdown)     |     |   (SSG)           |     |   (HTML/JS/CSS)  |
|                  |     |                   |     |                  |
+------------------+     +-------------------+     +------------------+
        |                        |
        v                        v
+------------------+     +-------------------+
|                  |     |                   |
|   React          |     |   Tailwind CSS    |
|   Components     |     |   + Custom CSS    |
|                  |     |                   |
+------------------+     +-------------------+
```

#### Data Flow

```
User Request
     |
     v
+--------------------+
|  Docusaurus SSG    |
|  (Static Files)    |
+--------------------+
     |
     +---> docs/*.md ---> Markdown Parser ---> React Components ---> HTML
     |
     +---> src/components/*.tsx ---> React ---> Interactive UI
     |
     +---> examples/*.ak ---> Aiken Compiler ---> Documentation Examples
```

---

### Directory Structure

```
aiken-vn/
├── .github/                    # GitHub configuration
│   └── workflows/
│       └── ci.yml              # CI/CD pipeline
│
├── docs/                       # Vietnamese documentation (25+ files)
│   ├── 01-the-aiken-foundation/    # Part 1: Aiken basics (13 lessons)
│   │   ├── index.md                # Part overview
│   │   ├── 01_Installation.md      # Lesson 1
│   │   ├── 02_Introduction.md      # Lesson 2
│   │   └── ...
│   ├── 02-cardano-architecture/    # Part 2: Cardano concepts (3 lessons)
│   ├── 03-your-first-validator/    # Part 3: First smart contract (1 lesson)
│   ├── 04-minting-tokens-nfts/     # Part 4: Token minting (2 lessons)
│   └── 05-escrow-contract/         # Part 5: Escrow pattern (1 lesson)
│
├── docs-project/               # Developer documentation
│   ├── code-standards.md       # Coding conventions
│   ├── codebase-summary.md     # Technical overview
│   ├── project-overview-pdr.md # Vision and roadmap
│   └── system-architecture.md  # Architecture diagrams
│
├── examples/                   # Working Aiken smart contracts
│   ├── validators/             # Validator source files
│   │   ├── escrow.ak           # Escrow contract
│   │   ├── gift.ak             # Simple spending validator
│   │   ├── nft_policy.ak       # NFT minting policy
│   │   └── simple_ft.ak        # Fungible token policy
│   ├── lib/                    # Test files (80+ tests)
│   │   ├── escrow_test.ak      # Escrow tests
│   │   ├── gift_test.ak        # Gift validator tests
│   │   └── ...
│   ├── aiken.toml              # Aiken project config
│   └── plutus.json             # Compiled Plutus output
│
├── src/                        # React source code
│   ├── components/             # Reusable components
│   │   ├── HomepageFeatures/   # Feature cards
│   │   ├── LandingPage/        # Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Curriculum.tsx
│   │   │   └── ...
│   │   └── YouTubeVideo.js     # Video embed component
│   ├── css/
│   │   └── custom.css          # Global styles + Tailwind
│   ├── lib/                    # Utility modules
│   │   └── firebase.js         # Firebase configuration
│   ├── pages/                  # Custom pages
│   │   └── index.js            # Homepage
│   └── theme/                  # Docusaurus theme overrides
│
├── static/                     # Static assets
│   └── img/                    # Images and icons
│
├── docusaurus.config.js        # Site configuration
├── sidebars.js                 # Navigation structure
├── tailwind.config.js          # Tailwind configuration
├── package.json                # Dependencies
└── README.md                   # Project overview
```

#### Key Files

| File | Purpose |
|------|---------|
| `docusaurus.config.js` | Site title, URL, i18n, theme, plugins |
| `sidebars.js` | Documentation sidebar structure |
| `tailwind.config.js` | Tailwind customization |
| `src/css/custom.css` | Global CSS, Infima overrides, animations |
| `examples/aiken.toml` | Aiken project dependencies |

---

### Development Workflow

#### Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server with hot reload |
| `npm run build` | Build production site to `build/` |
| `npm run serve` | Serve production build locally |
| `npm run clear` | Clear Docusaurus cache |
| `npm run swizzle` | Customize Docusaurus components |

#### Aiken Commands (in `examples/` directory)

| Command | Description |
|---------|-------------|
| `aiken build` | Compile validators to Plutus |
| `aiken check` | Run all tests |
| `aiken fmt` | Format Aiken code |
| `aiken docs` | Generate documentation |

#### Development Workflow Steps

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Make changes** (docs, components, or examples)

4. **Verify build**
   ```bash
   npm run build
   ```

5. **Test Aiken changes (if applicable)**
   ```bash
   cd examples && aiken check
   ```

6. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: your descriptive message"
   git push origin feature/your-feature
   ```

7. **Open pull request**

---

### Coding Standards

#### TypeScript/React Component Patterns

##### Component Structure

```typescript
// src/components/ComponentName/index.tsx

// 1. Imports (external, then internal)
import React from 'react';
import { motion } from 'framer-motion';
import { IconName } from 'lucide-react';

// 2. Type definitions
interface ComponentProps {
  title: string;
  description?: string;
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

// 3. Component definition (use React.FC<Props>)
const ComponentName: React.FC<ComponentProps> = ({
  title,
  description,
  isActive = false,
  onClick,
  children,
}) => {
  // 4. Hooks (useState, useEffect, etc.)
  const [state, setState] = React.useState(false);

  // 5. Event handlers
  const handleClick = () => {
    if (onClick) onClick();
    setState(true);
  };

  // 6. Render
  return (
    <div
      className="component-wrapper"
      role="region"
      aria-labelledby={`${title}-heading`}
    >
      <h2 id={`${title}-heading`}>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
};

// 7. Export
export default ComponentName;
```

##### Component Best Practices

| Practice | Description |
|----------|-------------|
| TypeScript | Always use TypeScript for new components |
| Functional Components | Use `React.FC<Props>` pattern |
| Props Interface | Define clear prop types |
| Default Props | Use destructuring defaults |
| Accessibility | Include ARIA attributes |
| Semantic HTML | Use appropriate HTML elements |

#### CSS/Tailwind Conventions

##### Utility Class Order

Follow this order for consistency:

```html
<div class="
  /* 1. Layout */
  flex flex-col items-center justify-center
  /* 2. Sizing */
  w-full max-w-lg h-auto min-h-screen
  /* 3. Spacing */
  p-4 m-2 gap-4
  /* 4. Typography */
  text-lg font-bold text-white
  /* 5. Background/Border */
  bg-gray-900 border border-white rounded-lg
  /* 6. Effects */
  shadow-lg opacity-90
  /* 7. Transitions */
  transition-all duration-300
  /* 8. States */
  hover:bg-gray-800 focus:outline-none
  /* 9. Responsive */
  md:flex-row md:text-xl lg:px-8
">
```

##### Custom CSS Guidelines

```css
/* Section comment format */
/* ============================================
   SECTION NAME
   ============================================ */

/* Use BEM-like naming for custom classes */
.component-name { }
.component-name__element { }
.component-name--modifier { }

/* Always include focus states */
.interactive-element:focus-visible {
  outline: 3px solid #5CE1E6;
  outline-offset: 2px;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none !important;
  }
}
```

##### CSS Variables

Use project-defined CSS variables:

```css
/* Available variables */
--bg-primary: #0F1B2A;
--bg-secondary: #112030;
--bg-card: #13253A;
--color-cyan: #5CE1E6;
--color-cyan-dark: #2BBAC0;
--color-cyan-light: #A3DCE2;
--text-heading: #FFFFFF;
--text-body: #DDE6ED;
```

#### Aiken Smart Contract Patterns

##### Validator Structure

```aiken
//// Validator Name
//// Brief description in Vietnamese and/or English

use aiken/collection/list
use cardano/transaction.{OutputReference, Transaction}

// ============================================
// TYPES
// ============================================

/// Datum type with documentation
pub type MyDatum {
  owner: ByteArray,
  deadline: Int,
  amount: Int,
}

/// Redeemer type for spending actions
pub type MyRedeemer {
  Action1
  Action2
  Action3
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/// Helper function with documentation
fn helper_function(tx: Transaction, value: ByteArray) -> Bool {
  list.has(tx.extra_signatories, value)
}

// ============================================
// MAIN VALIDATOR
// ============================================

validator my_validator {
  spend(
    datum: Option<MyDatum>,
    redeemer: MyRedeemer,
    _input: OutputReference,
    tx: Transaction,
  ) {
    expect Some(d) = datum

    when redeemer is {
      Action1 -> // validation logic
      Action2 -> // validation logic
      Action3 -> // validation logic
    }
  }

  else(_) {
    fail
  }
}
```

##### Test File Pattern

```aiken
// lib/validator_test.ak

use validators/my_validator.{MyDatum, MyRedeemer, my_validator}

// Success test
test my_validator_action1_succeeds() {
  let datum = MyDatum { owner: #"abc123", deadline: 100, amount: 1000 }
  let redeemer = Action1
  my_validator.spend(Some(datum), redeemer, mock_ref(), mock_tx()) == True
}

// Failure test (expects False or error)
test my_validator_action1_fails_wrong_signer() fail {
  let datum = MyDatum { owner: #"abc123", deadline: 100, amount: 1000 }
  let redeemer = Action1
  my_validator.spend(Some(datum), redeemer, mock_ref(), bad_tx())
}
```

---

### Naming Conventions

#### Files and Directories

| Type | Convention | Example |
|------|------------|---------|
| Documentation files | `NN_Title_Name.md` | `01_Installation.md`, `05_Variable_Constant.md` |
| Documentation directories | `NN-kebab-case/` | `01-the-aiken-foundation/`, `02-cardano-architecture/` |
| React components (TSX) | `PascalCase.tsx` | `Hero.tsx`, `QuestTimeline.tsx` |
| React components (JSX) | `PascalCase.js` | `YouTubeVideo.js` |
| TypeScript modules | `camelCase.ts` | `types.ts`, `constants.ts` |
| JavaScript utilities | `camelCase.js` | `tracking.js`, `firebase.js` |
| CSS files | `kebab-case.css` | `custom.css`, `styles.module.css` |
| Configuration files | `kebab-case.ext` | `docusaurus.config.js`, `tailwind.config.js` |
| Aiken validators | `snake_case.ak` | `escrow.ak`, `nft_policy.ak` |
| Aiken test files | `*_test.ak` | `escrow_test.ak`, `syntax_test.ak` |

#### Components and Variables

| Type | Convention | Example |
|------|------------|---------|
| React components | PascalCase | `HeroSection`, `FeatureCard` |
| Component props | camelCase | `isActive`, `onClick`, `userName` |
| Event handlers | `handle` + Event | `handleClick`, `handleSubmit` |
| Boolean variables | `is`/`has`/`can` prefix | `isLoading`, `hasError`, `canSubmit` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_ITEMS`, `API_URL` |
| CSS classes | kebab-case | `hero-section`, `feature-card` |
| CSS BEM | `block__element--modifier` | `card__title--highlighted` |

#### Documentation Naming

| Element | Convention | Example |
|---------|------------|---------|
| Part folders | `NN-kebab-case/` | `01-the-aiken-foundation/` |
| Lesson files | `NN_Title.md` | `01_Installation.md` |
| Index files | `index.md` | `docs/01-the-aiken-foundation/index.md` |
| Number prefix | Two-digit, zero-padded | `01`, `02`, `13` |
| Separator (files) | Underscore | `05_Variable_Constant.md` |
| Separator (dirs) | Hyphen | `02-cardano-architecture/` |

---

### Lesson Submission Template

#### YAML Frontmatter (Required)

```yaml
---
title: "Lesson Title in Vietnamese"
sidebar_position: 1
slug: /optional-custom-url
description: "Brief description for SEO (1-2 sentences)"
---
```

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Display title (Vietnamese) |
| `sidebar_position` | Yes | Order in sidebar (1-based) |
| `slug` | No | Custom URL path |
| `description` | Recommended | SEO meta description |

#### Complete Lesson Template

Copy and customize this template for new lessons:

```markdown
---
title: Tieu de bai hoc
sidebar_position: N
description: "Mo ta ngan gon cho SEO"
---

# Tieu de bai hoc

Doan mo dau gioi thieu noi dung bai hoc (1-2 cau).

## Muc tieu hoc tap

Sau bai hoc nay, ban se:

- Muc tieu 1
- Muc tieu 2
- Muc tieu 3

---

## Phan 1: Gioi thieu

Noi dung gioi thieu khai niem...

### Khai niem co ban

Giai thich khai niem...

:::tip Meo
Meo huu ich hoac best practice.
:::

---

## Phan 2: Noi dung chinh

Noi dung chi tiet...

### Vi du code

```aiken
// Mo ta code bang tieng Viet
fn example_function(a: Int, b: Int) -> Int {
  a + b
}
```

:::info Thong tin
Thong tin bo sung hoac giai thich them.
:::

### Bang tom tat

| Cot 1 | Cot 2 | Cot 3 |
|-------|-------|-------|
| Gia tri 1 | Gia tri 2 | Gia tri 3 |
| Gia tri 4 | Gia tri 5 | Gia tri 6 |

---

## Phan 3: Thuc hanh

### Bai tap 1: [Ten bai tap]

Yeu cau bai tap...

```aiken
// Code khung cho bai tap
fn your_solution() {
  // TODO: Hoan thanh code
  todo
}
```

:::warning Luu y
Canh bao hoac luu y quan trong.
:::

---

## Tom tat

- Diem chinh 1
- Diem chinh 2
- Diem chinh 3

## Cau hoi on tap

1. Cau hoi 1?
2. Cau hoi 2?
3. Cau hoi 3?

---

**Tiep theo**: [Bai N+1 - Tieu de](./NN_Next_Lesson.md)
```

#### Admonition Types

Use Docusaurus admonitions for callouts:

```markdown
:::tip Title
Helpful tip or best practice.
:::

:::info Information
General information or context.
:::

:::warning Luu y
Important warning or caution.
:::

:::danger Nguy hiem
Critical warning about potential issues.
:::

:::note Ghi chu
Additional notes or clarifications.
:::
```

#### Code Block Guidelines

| Language | Identifier | Use Case |
|----------|------------|----------|
| Aiken | `aiken` | Smart contract code |
| Bash/Shell | `bash` | Command-line instructions |
| JavaScript | `javascript` | Frontend code |
| TypeScript | `typescript` | Typed frontend code |
| JSON | `json` | Configuration, data |
| TOML | `toml` | Aiken project configuration |
| YAML | `yaml` | Frontmatter, CI/CD |
| PowerShell | `powershell` | Windows commands |

---

### Testing Guidelines

#### Docusaurus Build Testing

```bash
# Full production build (required before PR)
npm run build

# Serve and test production build
npm run serve
```

#### Build Verification Checklist

- [ ] Build completes without errors
- [ ] No broken links warnings (check console)
- [ ] All pages render correctly
- [ ] Images load properly
- [ ] Navigation works as expected

#### Aiken Test Guidelines

```bash
cd examples

# Build contracts
aiken build

# Run all tests
aiken check

# Format code
aiken fmt
```

#### Test Coverage Requirements

| Validator | Minimum Tests |
|-----------|---------------|
| Simple validators | 3-5 tests |
| Complex validators | 10+ tests |
| Minting policies | 3-5 tests |

#### Test Naming Conventions

```aiken
// Pattern: <function>_<scenario>_<expected_result>

test escrow_complete_succeeds() { ... }
test escrow_complete_fails_wrong_signer() fail { ... }
test escrow_cancel_before_deadline_succeeds() { ... }
test escrow_refund_after_deadline_succeeds() { ... }
```

---

### Debugging Tips

#### Docusaurus Issues

**Build fails with module not found**
```bash
# Clear cache and reinstall
npm run clear
rm -rf node_modules package-lock.json
npm install
```

**Hot reload not working**
```bash
# Restart dev server
npm run clear && npm start
```

**Broken links error**
- Check relative paths in markdown files
- Verify file names match exactly (case-sensitive)
- Use `./` prefix for same-directory links

#### Aiken Issues

**Compilation errors**
```bash
# Check syntax
aiken fmt

# Verbose build output
aiken build --verbose
```

**Test failures**
```bash
# Run specific test
aiken check --match "test_name"

# Verbose test output
aiken check --verbose
```

#### Browser DevTools

| Issue | Debug Method |
|-------|--------------|
| Layout problems | Inspect element, check CSS |
| JavaScript errors | Console tab |
| Network issues | Network tab |
| Performance | Performance tab |

---

### Common Issues and Solutions

#### Issue: "Command not found: aiken"

**Cause**: Aiken not in PATH

**Solution**:
```bash
# Add to ~/.bashrc or ~/.zshrc
export PATH="$HOME/.aiken/bin:$PATH"

# Reload shell
source ~/.bashrc  # or ~/.zshrc
```

#### Issue: Build fails with memory error

**Cause**: Node.js heap limit exceeded

**Solution**:
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### Issue: Vietnamese characters display incorrectly

**Cause**: File encoding issue

**Solution**:
- Ensure files are saved as UTF-8
- Check editor encoding settings
- Verify `lang="vi"` in HTML

#### Issue: Tailwind classes not applying

**Cause**: Classes not in safelist or purged

**Solution**:
1. Check `tailwind.config.js` content paths
2. Add dynamic classes to safelist
3. Restart dev server

#### Issue: Images not loading

**Cause**: Incorrect path or missing file

**Solution**:
- Use `/img/filename.png` for static images
- Verify file exists in `static/img/`
- Check case sensitivity

#### Issue: Sidebar not updating

**Cause**: Cache or config issue

**Solution**:
```bash
npm run clear
# Check sidebars.js for errors
npm start
```

#### Issue: Aiken tests pass locally but fail in CI

**Cause**: Version mismatch or environment difference

**Solution**:
- Check Aiken version in CI matches local
- Verify `aiken.toml` dependencies
- Check for platform-specific issues

---

### Additional Resources

#### Project Documentation

- [Code Standards](./docs-project/code-standards.md) - Detailed coding conventions
- [Project Overview](./docs-project/project-overview-pdr.md) - Vision and roadmap
- [Codebase Summary](./docs-project/codebase-summary.md) - Technical overview
- [System Architecture](./docs-project/system-architecture.md) - Architecture diagrams

#### External Documentation

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Aiken Language Guide](https://aiken-lang.org/language-tour)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
- [Cardano Developer Portal](https://developers.cardano.org/)

#### Community

- [Discord](https://discord.gg/ub6atE94v4)
- [GitHub Discussions](https://github.com/CardanoAikenVN/aiken-vn/discussions)

---

### Getting Help

If you encounter issues not covered here:

1. Search existing [GitHub Issues](https://github.com/CardanoAikenVN/aiken-vn/issues)
2. Check [GitHub Discussions](https://github.com/CardanoAikenVN/aiken-vn/discussions)
3. Ask in [Discord](https://discord.gg/ub6atE94v4)
4. Open a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
