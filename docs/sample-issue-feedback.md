# Sample Issue Feedback

10 realistic feedback samples for the Vietnamese Aiken repo, using 3 issue templates: Bug Report, Feature Request, Lesson Feedback.

---

## 1. [Bug]: Part 4 FT lesson uses hardcoded admin key instead of parameterized config

- **Template:** Bug Report
- **Area:** Smart Contract Examples (Aiken)
- **Description:** In Part 4 lesson (`docs/04-minting-tokens-nfts/02_mint_tokens_nfts.md`, line 69-99), the Simple FT validator uses a hardcoded `const admin_pkh: ByteArray = #"abc123..."` directly in the code. However, the actual example in `examples/validators/simple_ft.ak` correctly uses a parameterized approach with `pub type FTConfig { admin_pkh: ByteArray }` and `validator simple_ft(config: FTConfig)`. The lesson teaches an insecure and inflexible pattern — hardcoding keys means redeploying the entire contract to change the admin, and using a placeholder value like `#"abc123..."` could confuse learners into thinking that's a real key format.
- **Steps to Reproduce:**
  1. Open `docs/04-minting-tokens-nfts/02_mint_tokens_nfts.md`
  2. See "Ví dụ: Simple FT" code block (line 69) — uses `const admin_pkh`
  3. Compare with `examples/validators/simple_ft.ak` — uses `FTConfig` parameter
- **Expected Behavior:** The lesson code should match the example code and use the parameterized `FTConfig` pattern to teach best practices for key management in validators.
- **Environment:** N/A — documentation content issue

---

## 2. [Lesson Feedback]: Missing Windows installation instructions

- **Template:** Lesson Feedback
- **Part:** Part 1: The Aiken Foundation
- **Lesson Number:** 01
- **Feedback Type:** Missing content
- **Feedback:** The Installation lesson only covers macOS/Linux setup using `aikup`. It lacks detailed instructions for Windows (WSL2 setup, Rust toolchain on Windows). Many Vietnamese students use Windows, so this section is essential.
- **Additional Context:** Reference WSL2 guide at https://aiken-lang.org/installation-instructions

---

## 3. [Feature]: Add interactive code playground for Aiken

- **Template:** Feature Request
- **Area:** Documentation Site
- **Description:** Embed an interactive code playground within the docs so learners can run Aiken code directly without local installation. Could use iframe or a WebAssembly-based editor.
- **Motivation:** Lowers the barrier for newcomers. Many people want to try Aiken before installing it. Docs like Rust (play.rust-lang.org) and Solidity (Remix) provide playgrounds that significantly increase engagement.
- **Alternatives Considered:** Add external link to an Aiken playground, or provide a Gitpod/Codespace configuration.

---

## 4. [Lesson Feedback]: Source code comments are in Portuguese instead of Vietnamese or English

- **Template:** Lesson Feedback
- **Part:** Part 1: The Aiken Foundation
- **Lesson Number:** 01
- **Feedback Type:** Incorrect information
- **Feedback:** The source code files `src/theme/Root.js` and `src/clientModules/sidebarToggle.js` contain comments and console logs written in Portuguese (e.g., "Verificar se já foi injetado", "Elemento encontrado, criando botão", "Escutar eventos de popstate"). This is a Vietnamese Aiken documentation project — all code comments should be in Vietnamese or English for consistency. There are 28 Portuguese strings across these two files.
- **Additional Context:** Likely leftover from the original Uberhub Mentorias project (Firebase project is named "mentorias-uberhub"). Should be translated to Vietnamese or English.

---

## 5. [Bug]: Landing page community avatars return 404 errors

- **Template:** Bug Report
- **Area:** Landing Page
- **Description:** The Community stats section displays an avatar stack fetched from `picsum.photos`. Some images return 404 or load slowly, resulting in broken/empty avatar images on the landing page.
- **Steps to Reproduce:**
  1. Open the homepage at `/`
  2. Scroll down to the Community section
  3. Observe the avatar stack — some images appear broken
- **Expected Behavior:** All avatars should display correctly, or show a fallback placeholder when images fail to load.
- **Environment:** macOS 15, Safari 18, Vietnamese network (picsum.photos may be blocked/slow)

---

## 6. [Feature]: Add lesson on Multi-signature Validators

- **Template:** Feature Request
- **Area:** New Lesson / Content
- **Description:** Add Part 6 or an advanced lesson on multi-signature validators — requiring multiple signatures to execute a transaction. This is a common pattern in DeFi and treasury management on Cardano.
- **Motivation:** After learning escrow (Part 5), learners need to continue with more complex patterns. Multi-sig is essential knowledge for building DAOs and managing community funds.
- **Alternatives Considered:** Could be added as an extension to Part 5 instead of creating a new Part.

---

## 7. [Lesson Feedback]: eUTxO model explanation lacks visual diagrams

- **Template:** Lesson Feedback
- **Part:** Part 2: Cardano Architecture
- **Lesson Number:** 02
- **Feedback Type:** Unclear explanation
- **Feedback:** The UTxO vs Account model (Ethereum) comparison is not visual enough. Should add a diagram illustrating the UTxO flow: Input → Validator → Output. Currently it is text-only, making it hard to understand for blockchain beginners.
- **Additional Context:** Could use Mermaid diagrams (already enabled in docusaurus.config.js) to create visual flows directly in the lesson.

---

## 8. [Bug]: Duplicate sidebar toggle logic between Root.js and sidebarToggle.js

- **Template:** Bug Report
- **Area:** Documentation Site (Docusaurus)
- **Description:** The sidebar toggle injection logic is duplicated across two files: `src/theme/Root.js` and `src/clientModules/sidebarToggle.js`. Both files read from `localStorage.getItem('sidebar-collapsed')`, both use MutationObserver to watch DOM changes, and both attempt to inject/manage the sidebar toggle button. This causes race conditions where the toggle button may be injected twice or the state may conflict between the two implementations.
- **Steps to Reproduce:**
  1. Open browser DevTools console on any docs page
  2. Observe duplicate `[SidebarToggle]` and `[Tracking]` console logs
  3. Both Root.js and sidebarToggle.js compete to manage sidebar state
- **Expected Behavior:** Sidebar toggle logic should exist in only one place to avoid race conditions and reduce bundle size.
- **Environment:** Any browser, any OS

---

## 9. [Feature]: Add dark mode toggle for landing page

- **Template:** Feature Request
- **Area:** Landing Page / UI
- **Description:** The landing page currently has a fixed dark theme (retro pixel-art). Add a toggle to switch to light mode, synchronized with the Docusaurus theme toggle when navigating into docs.
- **Motivation:** Some users prefer light mode, especially when reading documentation during the day. Currently, transitioning from the landing page (dark) to docs (potentially light) creates an inconsistent UX.
- **Alternatives Considered:** Keep dark-only for the landing page but add a smooth transition when switching to the docs theme.

---

## 10. [Lesson Feedback]: i18n directory is empty — no Vietnamese locale translations for Docusaurus UI

- **Template:** Lesson Feedback
- **Part:** Part 1: The Aiken Foundation
- **Lesson Number:** 01
- **Feedback Type:** Missing content
- **Feedback:** The `docusaurus.config.js` sets the default locale to Vietnamese (`vi`), but the `i18n/` directory is completely empty. This means all Docusaurus UI elements (sidebar labels, pagination buttons like "Next"/"Previous", search placeholder, "Edit this page", etc.) remain in English instead of Vietnamese. The tutorial content is Vietnamese but the surrounding UI is not, creating a mixed-language experience.
- **Additional Context:** Run `npm run write-translations -- --locale vi` to generate the translation files, then translate the JSON entries. See https://docusaurus.io/docs/i18n/tutorial for the official guide.
