---
title: Quest Timeline - Speedrun Design Pattern
sidebar_label: Quest Timeline
---

# Quest Timeline - Speedrun Design Pattern

## Overview

The Quest Timeline is a visual component that displays a series of sequential quests or challenges in a stylized timeline format. It implements the **Speedrun design pattern**, which features an asymmetrical layout with a centered timeline and alternating content distribution.

**Component Location:** `/src/components/LandingPage/QuestTimeline.tsx`

## Design Pattern: Speedrun

The Speedrun pattern creates a visually engaging timeline by:
- Positioning a vertical line at the center-left (33.33% from left edge)
- Placing timeline dots on the vertical line with content on either side
- Using a 40/60 content-to-illustration split
- Adding horizontal dividers between sections

### Visual Structure

```
Desktop Layout (≥768px):
┌─────────────────────────────────────────────────────┐
│ Content (40%)       │●        Illustration (60%)   │
│ ├─ Challenge #      │                              │
│ ├─ Title            │         [Visual Art]          │
│ ├─ Description      │                               │
│ └─ Button           │                               │
├─────────────────────────────────────────────────────┤
│ Content (40%)      │●        Illustration (60%)    │
│                    │                               │
└─────────────────────────────────────────────────────┘

Mobile Layout (<768px):
┌──────────────────────┐
│ Content              │
│ ├─ Challenge #       │
│ ├─ Title             │
│ ├─ Description       │
│ └─ Button            │
│ [Visual Art]         │
├──────────────────────┤
│ Content              │
│ [Visual Art]         │
└──────────────────────┘
```

## Technical Implementation

### QuestTimeline Component

**Purpose:** Container component that manages multiple quest cards and renders the central timeline line.

**Props:**
```typescript
interface QuestTimelineProps {
  quests: Quest[];
  startIndex?: number;  // Optional starting number for challenges
}
```

**Key Features:**

1. **Vertical Line (Desktop Only)**
   - Position: `left-1/3` (33.33% from left edge)
   - Width: `2px` (subtle but visible)
   - Color: `white/20` (20% opacity for non-obtrusive styling)
   - Height: Full container height
   - Hidden on mobile (`hidden md:block`)

```tsx
<div
  className="hidden md:block absolute left-1/3 top-0 bottom-0 w-[2px] bg-white/20"
  aria-hidden="true"
  role="presentation"
></div>
```

2. **Horizontal Dividers**
   - Appear between quest cards (not after the last one)
   - Color: `white/10` (10% opacity for subtle separation)
   - Full width with max constraint for visual balance
   - Width: `max-w-5xl` prevents stretching on very wide screens

```tsx
{quests.map((quest, index) => (
  <React.Fragment key={quest.id}>
    <QuestCard quest={quest} />
    {index < quests.length - 1 && (
      <div
        className="border-t border-white/10 mx-auto w-full max-w-5xl"
        aria-hidden="true"
      />
    )}
  </React.Fragment>
))}
```

3. **Container Constraints**
   - Max width: `max-w-7xl` prevents content from becoming too wide
   - Responsive padding: `px-4` on mobile for proper spacing
   - Centered with `mx-auto`

### QuestCard Component

**Purpose:** Individual quest card displaying challenge information and illustration.

**Props:**
```typescript
interface QuestCardProps {
  quest: Quest;
}

interface Quest {
  id: string;
  number: number;
  title: string;
  description: string;
  colorTheme: string;           // Tailwind color class (e.g., 'text-[#B6F2B6]')
  illustrationType: string;     // 'token', 'staking', 'vendor', 'lending', 'wallet', 'nft'
  imageAlt: string;             // Alt text for accessibility
}
```

**Layout Structure:**

1. **Article Wrapper**
   - Relative positioning for timeline dot
   - Group context for hover/focus states
   - Vertical spacing: `py-16` (mobile) / `py-24` (desktop)

```tsx
<article className="relative py-16 md:py-24 group">
```

2. **Timeline Dot (Desktop Only)**
   - Position: `left-1/3 -translate-x-1/2` (centered on vertical line)
   - Size: `8px × 8px` outer, `3px × 3px` inner
   - Color: `#066C78` (teal primary) with white border
   - Hidden on mobile (`hidden md:flex`)
   - Interactive scale: `group-hover:scale-125`

```tsx
<div
  className="hidden md:flex absolute left-1/3 top-24 w-8 h-8 bg-[#066C78] border-4 border-white rounded-full z-20 items-center justify-center group-hover:scale-125 group-focus-within:scale-125 transition-transform -translate-x-1/2"
  aria-hidden="true"
  role="presentation"
>
  <div className="w-3 h-3 bg-white rounded-full"></div>
</div>
```

3. **Flex Container (Left/Right Split)**
   - Mobile: Stacks vertically (`flex-col`)
   - Desktop: Side-by-side (`md:flex-row`)
   - Gap: `gap-12` (mobile) / `gap-16` (desktop)
   - Centered alignment for responsive balance

```tsx
<div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
```

4. **Left Section - Content (40% Desktop)**
   - Width: `w-full` (mobile) / `md:w-[40%]` (desktop)
   - Padding: `md:pr-12` (desktop right padding)
   - Contains: Challenge number, title, description, button
   - Alignment: `items-start` for left-aligned content

```tsx
<div className="w-full md:w-[40%] flex flex-col gap-6 items-start md:pr-12">
  {/* Challenge content */}
</div>
```

5. **Right Section - Illustration (60% Desktop)**
   - Width: `w-full` (mobile) / `md:w-[60%]` (desktop)
   - Padding: `md:pl-12` (desktop left padding)
   - Height: `min-h-[300px]` minimum height
   - Contains: Title art rendering and decorative background blob
   - Alignment: `justify-center` (mobile) / `md:justify-start` (desktop)

```tsx
<div className="w-full md:w-[60%] flex justify-center md:justify-start items-center relative min-h-[300px] md:pl-12">
  {/* Illustration content */}
</div>
```

## Responsive Design

### Breakpoints

| Screen Size | Behavior | Timeline |
|-------------|----------|----------|
| Mobile (&lt;768px) | Content stacks vertically | Hidden |
| Desktop (≥768px) | Content side-by-side 40/60 | Visible |
| Large (≥1024px) | Same layout, more breathing room | Visible |
| Extra Large (≥1280px) | Max width constraint prevents stretching | Visible |

### Spacing System

```css
/* Vertical spacing per card */
py-16      /* Mobile: 64px (4rem) */
py-24      /* Desktop: 96px (6rem) */

/* Horizontal gaps between content and illustration */
gap-12     /* Mobile: 48px (3rem) */
md:gap-16  /* Desktop: 64px (4rem) */

/* Content/illustration padding */
md:pr-12   /* Content right padding: 48px (3rem) */
md:pl-12   /* Illustration left padding: 48px (3rem) */

/* Divider max width */
max-w-5xl  /* 64rem (1024px) */

/* Container max width */
max-w-7xl  /* 80rem (1280px) */
```

## Accessibility

### ARIA Labels and Roles

```tsx
// Decorative elements marked as non-semantic
<div aria-hidden="true" role="presentation"></div>

// Challenge number with descriptive label
<span aria-label={`Challenge số ${quest.number}`}>
  Challenge #{quest.number}
</span>

// Button with full descriptive text
<a aria-label={`Bắt đầu ${quest.title} - Challenge ${quest.number}`}>
  BẮT ĐẦU {getIconLabel().toUpperCase()}
</a>

// Illustration with alt text
<div role="img" aria-label={quest.imageAlt}>
  {renderTitleArt()}
</div>
```

### Keyboard Navigation

- All buttons are keyboard accessible with focus rings
- Focus ring color: `focus:ring-4 focus:ring-[#B6F2B6]`
- Focus offset: `focus:ring-offset-2 focus:ring-offset-[#8f3aff]`
- Interactive elements scale on focus: `group-focus-within:scale-125`

### Screen Reader Support

- Semantic HTML elements: `<article>`, `<h3>`, `<p>`, `<a>`
- Descriptive button text in Vietnamese: "BẮT ĐẦU `{TYPE}`"
- Challenge numbers and icons have proper labels

## Color Palette

```css
/* Vertical timeline line */
.timeline-line {
  background-color: rgba(255, 255, 255, 0.2);  /* white/20 */
}

/* Timeline dot */
.timeline-dot {
  background-color: #066C78;  /* Primary teal */
  border-color: white;        /* 4px border */
}

/* Horizontal dividers */
.divider {
  border-color: rgba(255, 255, 255, 0.1);  /* white/10 */
}

/* Content text colors by quest type */
.token-theme { color: #B6F2B6; }     /* Light green */
.staking-theme { color: #C6A8FF; }   /* Light purple */
.vendor-theme { color: #FFD8A8; }    /* Light orange */
.lending-theme { color: #FFF79A; }   /* Light yellow */
```

## Animations and Interactions

### Hover Effects

```tsx
// Timeline dot scales on hover
group-hover:scale-125

// Illustration lifts and scales slightly
group-hover:-translate-y-2
group-hover:scale-105

// Smooth transition
transition-transform duration-500
```

### Focus States

```tsx
// Same as hover for keyboard navigation
group-focus-within:scale-125
group-focus-within:-translate-y-2
group-focus-within:scale-105
```

## Implementation Example

```tsx
// Basic usage
import QuestTimeline from '@/components/LandingPage/QuestTimeline';
import { Quest } from '@/components/LandingPage/types';

const quests: Quest[] = [
  {
    id: 'quest-1',
    number: 1,
    title: 'Token Basics',
    description: 'Learn about tokenization on Cardano...',
    colorTheme: 'text-[#B6F2B6]',
    illustrationType: 'token',
    imageAlt: 'Token illustration'
  },
  // ... more quests
];

export function QuestSection() {
  return <QuestTimeline quests={quests} />;
}
```

## Customization Guide

### Changing Timeline Position

To adjust the timeline position, update both components:

1. **QuestTimeline.tsx:** `left-1/3` class
2. **QuestCard.tsx:** `left-1/3` class in timeline dot

Examples:
- `left-1/4` (25% from left)
- `left-1/3` (33.33% from left - current)
- `left-2/5` (40% from left)

### Adjusting Content/Illustration Split

Modify the width classes in **QuestCard.tsx**:

```tsx
// Current: 40/60 split
<div className="w-full md:w-[40%]">  {/* Change to md:w-[35%], md:w-[45%], etc. */}
<div className="w-full md:w-[60%]">  {/* Adjust accordingly */}

// Example: 50/50 split
<div className="w-full md:w-[50%]">
<div className="w-full md:w-[50%]">
```

### Changing Spacing

Update spacing classes in both components:

```tsx
// QuestCard.tsx
<article className="relative py-16 md:py-24 group">  {/* Change py-16/py-24 */}
<div className="flex flex-col md:flex-row gap-12 md:gap-16">  {/* Change gap-12/gap-16 */}
<div className="w-full md:w-[40%] ... md:pr-12">  {/* Change md:pr-12 */}
<div className="w-full md:w-[60%] ... md:pl-12">  {/* Change md:pl-12 */}
```

## Performance Considerations

- Timeline line uses CSS positioning (no JavaScript required)
- Animations use `transition-transform` (GPU-accelerated)
- Group context for hover states avoids class proliferation
- Component is memoization-friendly (can add React.memo if needed)

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | Fully supported |
| Firefox | 88+ | Fully supported |
| Safari | 14+ | Fully supported |
| Edge | 90+ | Fully supported |

All features use standard CSS and CSS positioning that works across modern browsers.

## Troubleshooting

### Timeline Line Not Visible

**Issue:** Vertical line doesn't appear on desktop.
**Solution:** Check that parent container has `md:block` visible and background isn't solid.

### Timeline Dot Misaligned

**Issue:** Dot doesn't center on the vertical line.
**Solution:** Ensure `left-1/3 -translate-x-1/2` is applied to the dot element.

### Content/Illustration Overlap

**Issue:** Content and illustration overlap on smaller desktop screens.
**Solution:** Adjust `md:gap-16` or width percentages in the flex container.

### Responsive Layout Issues

**Issue:** Layout doesn't stack properly on mobile.
**Solution:** Verify `flex-col md:flex-row` is on the main container.

---

**Last Updated:** 2025-12-05
**Version:** 1.0.0
**Status:** Production Ready
