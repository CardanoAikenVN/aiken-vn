# Code Standards

This document defines the coding conventions, patterns, and guidelines for the Vietnamese Aiken documentation project.

---

## File Naming Conventions

### Documentation Files

Documentation files follow a numbered, descriptive naming pattern:

```
NN_Descriptive_Title.md
```

| Element | Convention | Example |
|---------|------------|---------|
| Number prefix | Two-digit, zero-padded | `01`, `02`, `13` |
| Separator | Underscore | `_` |
| Title | PascalCase or snake_case | `Installation`, `Control_flow` |
| Extension | `.md` | Required |

**Correct Examples:**
- `01_Installation.md`
- `05_Variable_Constant.md`
- `07_Custom_type.md`

**Incorrect Examples:**
- `1_Installation.md` (single digit)
- `01-Installation.md` (hyphen instead of underscore)
- `01_installation.md` (inconsistent casing)

### Directory Structure

Documentation directories use the format:

```
NN-descriptive-name/
```

| Element | Convention | Example |
|---------|------------|---------|
| Number prefix | Two-digit, zero-padded | `01`, `02` |
| Separator | Hyphen | `-` |
| Name | kebab-case | `the-aiken-foundation` |

**Examples:**
- `01-the-aiken-foundation/`
- `02-cardano-architecture/`
- `05-escrow-contract/`

### Source Code Files

| File Type | Convention | Example |
|-----------|------------|---------|
| React Components (TSX) | PascalCase | `QuestTimeline.tsx`, `Hero.tsx` |
| React Components (JSX) | PascalCase | `YouTubeVideo.js` |
| TypeScript modules | camelCase | `types.ts`, `constants.ts` |
| JavaScript utilities | camelCase | `tracking.js`, `firebase.js` |
| CSS files | kebab-case | `custom.css`, `styles.module.css` |
| Configuration files | kebab-case | `docusaurus.config.js` |

---

## Documentation Format

### Frontmatter Requirements

Every documentation file must include YAML frontmatter:

```yaml
---
title: "Human-readable title"
sidebar_position: 1
description: "Brief description for SEO and previews"
---
```

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Display title in sidebar and page header |
| `sidebar_position` | Yes | Order in sidebar (1-based) |
| `description` | Recommended | SEO meta description, previews |

**Complete Example:**

```yaml
---
title: "01. Cai Dat Moi Truong"
sidebar_position: 1
description: "Thiet lap moi truong phat trien hoan chinh de viet smart contract tren Cardano voi Aiken"
---
```

### Content Structure

Each lesson should follow this structure:

```markdown
# Lesson Title

> **Muc tieu**: Brief objective statement

---

## Section 1: Introduction

Content...

---

## Section 2: Main Content

Content with code examples...

---

## Section 3: Practice

### Exercise 1: Title
Instructions...

---

## Checklist

- [ ] Task 1
- [ ] Task 2

---

## Notes

:::warning Luu y
Important warning or note content.
:::

---

**Next**: [Next Lesson Title](./next_lesson.md)
```

### Code Block Guidelines

Use appropriate language identifiers:

| Language | Identifier | Use Case |
|----------|------------|----------|
| Aiken | `aiken` | Smart contract code |
| Bash/Shell | `bash` | Command-line instructions |
| JavaScript | `javascript` | Frontend code |
| TypeScript | `typescript` | Typed frontend code |
| JSON | `json` | Configuration, data |
| TOML | `toml` | Aiken project configuration |
| YAML | `yaml` | Frontmatter, CI/CD |
| Lua | `lua` | NeoVim configuration |
| Elisp | `elisp` | Emacs configuration |

**Example:**

````markdown
```aiken
fn add(a: Int, b: Int) -> Int {
  a + b
}
```

```bash
aiken build
```
````

### Admonition Usage

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
```

**Do NOT use ASCII art boxes.** Replace with:
- Markdown tables
- Bullet lists
- Admonitions

---

## Component Architecture Patterns

### React Component Structure

```typescript
// imports
import React from 'react';
import { motion } from 'framer-motion';
import { ComponentType } from './types';

// types (or import from types.ts)
interface ComponentProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

// component
const ComponentName: React.FC<ComponentProps> = ({
  title,
  description,
  onClick
}) => {
  return (
    <div className="component-wrapper">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

// export
export default ComponentName;
```

### Component Organization

```
src/components/
├── ComponentName/
│   ├── index.tsx       # Main component
│   ├── SubComponent.tsx # Sub-components
│   ├── types.ts        # TypeScript types
│   ├── constants.ts    # Constants
│   └── styles.module.css # Component-specific styles (if needed)
```

### Landing Page Component Pattern

All landing page components follow these conventions:

1. **TypeScript**: Use `.tsx` extension with typed props
2. **Functional Components**: Use `React.FC<Props>` pattern
3. **Tailwind Styling**: Use utility classes inline
4. **Accessibility**: Include ARIA labels and roles

```typescript
const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section
      aria-labelledby={`${title}-heading`}
      className="py-12 px-4"
    >
      <h2
        id={`${title}-heading`}
        className="text-2xl font-bold text-white"
      >
        {title}
      </h2>
      {children}
    </section>
  );
};
```

---

## CSS/Styling Conventions

### Tailwind CSS Usage

1. **Utility-First**: Prefer utility classes over custom CSS
2. **Component Classes**: Extract repeated patterns to custom CSS
3. **Responsive Design**: Use responsive prefixes (`md:`, `lg:`)
4. **Dark Mode**: Use `[data-theme="dark"]` selector

**Utility Class Order:**

```html
<div class="
  {/* Layout */}
  flex flex-col items-center justify-center
  {/* Sizing */}
  w-full max-w-lg h-auto min-h-screen
  {/* Spacing */}
  p-4 m-2 gap-4
  {/* Typography */}
  text-lg font-bold text-white
  {/* Background/Border */}
  bg-gray-900 border border-white rounded-lg
  {/* Effects */}
  shadow-lg opacity-90
  {/* Transitions */}
  transition-all duration-300
  {/* States */}
  hover:bg-gray-800 focus:outline-none
  {/* Responsive */}
  md:flex-row md:text-xl
">
```

### Custom CSS Structure

```css
/* ============================================
   SECTION NAME
   ============================================ */

/* Subsection */
.selector {
  property: value;
}

/* Related element */
.selector__element {
  property: value;
}

/* State modifier */
.selector--modifier {
  property: value;
}
```

### CSS Variable Usage

Use CSS custom properties for theming:

```css
:root {
  /* Landing page theme colors */
  --bg-primary: #0F1B2A;
  --bg-secondary: #112030;
  --color-cyan: #5CE1E6;
  --text-heading: #FFFFFF;
  --text-body: #DDE6ED;
}

[data-theme="dark"] {
  /* Dark mode overrides */
}
```

### Accessibility Requirements

1. **Focus Indicators**: Visible focus states for all interactive elements
2. **Reduced Motion**: Respect `prefers-reduced-motion` preference
3. **Screen Reader**: Include `.sr-only` utility for hidden text
4. **Color Contrast**: Maintain WCAG AA contrast ratios

```css
/* Focus indicator */
a:focus-visible {
  outline: 3px solid #5CE1E6;
  outline-offset: 2px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Git Workflow and Branching Strategy

### Branch Naming

| Branch Type | Pattern | Example |
|-------------|---------|---------|
| Main | `main` | Production branch |
| Feature/Content | `part-N` | `part-1`, `part-2` |
| Hotfix | `fix/description` | `fix/broken-links` |

### Commit Message Guidelines

**Format:**

```
<type>: <subject>

[optional body]

[optional footer]
```

**Types:**

| Type | Description |
|------|-------------|
| `feat` | New feature or content |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, no code change |
| `refactor` | Code restructuring |
| `test` | Adding tests |
| `chore` | Maintenance tasks |

**Examples:**

```
feat: add Lesson 1, lesson 2 in Part 1

fix: correct broken links in installation guide

docs: update README with new project structure

style: format CSS with consistent indentation
```

### Pull Request Guidelines

1. **Title**: Clear, descriptive summary
2. **Description**: Include what changed and why
3. **Checklist**:
   - [ ] Build passes locally
   - [ ] No broken links
   - [ ] Follows code standards
   - [ ] Content reviewed for accuracy

### Collaborator Policy

**Important:** Only `jasong-03` should be added as a collaborator. Do not invite or add other collaborators to this repository.

---

## Content Guidelines

### Language Standards

- **Primary Language**: Vietnamese (100%)
- **Technical Terms**: Keep English technical terms with Vietnamese explanations
- **Code Comments**: English preferred for code compatibility

**Example:**

```aiken
// Dinh nghia ham cong hai so nguyen
// Define a function to add two integers
fn add(a: Int, b: Int) -> Int {
  a + b
}
```

### Table Formatting

Use Markdown tables for structured information:

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Link Conventions

- **Internal Links**: Use relative paths
- **External Links**: Use full URLs

```markdown
<!-- Internal -->
[Next Lesson](./02_Introduction.md)
[Part 2](../02-cardano-architecture/index.md)

<!-- External -->
[Aiken Documentation](https://aiken-lang.org)
```

---

## Quality Checklist

Before committing documentation changes, verify:

- [ ] Frontmatter is complete (title, sidebar_position, description)
- [ ] File naming follows `NN_Title.md` convention
- [ ] Code blocks have language identifiers
- [ ] No ASCII art boxes (use tables/lists instead)
- [ ] All links are valid (internal and external)
- [ ] Vietnamese content is accurate and clear
- [ ] Code examples compile/run correctly
- [ ] Accessibility considerations addressed

Before committing code changes, verify:

- [ ] TypeScript types are defined
- [ ] Components follow established patterns
- [ ] CSS follows utility-first approach
- [ ] Accessibility attributes included
- [ ] No console errors or warnings
- [ ] Build completes successfully

---

## Related Documentation

- [Project Overview and PDR](./project-overview-pdr.md)
- [Codebase Summary](./codebase-summary.md)
- [System Architecture](./system-architecture.md)
