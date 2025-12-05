---
title: Responsive Design Guidelines
sidebar_label: Responsive Guidelines
---

# Responsive Design Guidelines

Design patterns and guidelines for creating responsive, accessible UI components in Aiken-VN.

## Breakpoint Strategy

The landing page uses Tailwind CSS breakpoints:

```css
sm: 640px    /* Small phones */
md: 768px    /* Tablets and small laptops */
lg: 1024px   /* Desktop */
xl: 1280px   /* Large desktop */
2xl: 1536px  /* Extra large screens */
```

### Current Usage

- **Mobile-first approach:** Base styles apply to all devices
- **Desktop enhancements:** `md:` prefix for tablet+ screens
- **Large screens:** `lg:` prefix for additional spacing
- **Never resize:** Very large screens use `max-w-*` constraints

## Quest Timeline Responsive Behavior

### Mobile (&lt;768px)

```
┌────────────────────────┐
│ [Full width: px-4]     │
│                        │
│ Content                │
│ ├─ Challenge #         │
│ ├─ Title               │
│ ├─ Description         │
│ └─ Button              │
│                        │
│ [Illustration]         │
│ (Stacked below)        │
│                        │
├────────────────────────┤
│                        │
│ Content                │
│ [Illustration]         │
│                        │
└────────────────────────┘

Features:
- Full-width layout
- Padding: px-4 (1rem on each side)
- Content and illustration stack vertically
- Timeline line: HIDDEN
- Timeline dot: HIDDEN
- Spacing: py-16 (4rem vertical)
- Gap: gap-12 (3rem between content and illustration)
```

### Tablet (768px - 1023px)

```
┌──────────────────────────────────┐
│     [px-4 responsive]            │
│                                  │
│ [40% Content] │ [60% Illustration]
│ Challenge #   │●    [Art]       │
│ Title         │                 │
│ Description   │                 │
│ Button        │                 │
│               │                 │
├──────────────────────────────────┤
│ [40% Content] │ [60% Illustration]
│               │●    [Art]       │
│               │                 │
└──────────────────────────────────┘

Features:
- Side-by-side layout (40/60 split)
- Padding: px-4 (1rem on each side)
- Timeline line: VISIBLE (at left-1/3)
- Timeline dot: VISIBLE
- Spacing: py-24 (6rem vertical)
- Gap: gap-16 (4rem between sections)
- Content padding: pr-12 (3rem right)
- Illustration padding: pl-12 (3rem left)
```

### Desktop (1024px+)

```
┌────────────────────────────────────────────┐
│  [px-4 responsive, max-w-7xl centered]    │
│                                            │
│ [40% Content]    │ [60% Illustration]     │
│ Challenge #      │●    [Art]              │
│ Title            │     (Larger visual)    │
│ Description      │                        │
│ Button           │                        │
│                  │                        │
├────────────────────────────────────────────┤
│ [40% Content]    │ [60% Illustration]     │
│ Challenge #      │●    [Art]              │
│                  │                        │
└────────────────────────────────────────────┘

Features:
- Same 40/60 split as tablet
- Max width: max-w-7xl (80rem)
- Centered with mx-auto
- Timeline line: VISIBLE
- Timeline dot: VISIBLE
- Spacing: py-24 (6rem vertical)
- Gap: gap-16 (4rem between sections)
```

## Spacing System

### Vertical Spacing (Height)

```css
/* Quest cards */
py-16   /* 64px on mobile */
py-24   /* 96px on desktop (md:) */

/* Horizontal dividers */
/* No additional padding, inherits from card */

/* Content sections */
gap-6   /* 1.5rem between elements */
```

### Horizontal Spacing (Width)

```css
/* Container padding */
px-4    /* 1rem on all sides */
mx-auto /* Center container */

/* Content/illustration gap */
gap-12     /* 3rem on mobile */
gap-16     /* 4rem on desktop */

/* Section padding */
pr-12   /* 3rem right padding (content) */
pl-12   /* 3rem left padding (illustration) */

/* Container constraints */
max-w-7xl /* 80rem max width */
max-w-5xl /* 64rem for dividers */
```

## Typography Responsiveness

### Challenge Numbers
```css
font-['Press_Start_2P']
text-xs           /* Mobile: 0.75rem */
opacity-90
```

### Challenge Titles
```css
font-['DM_Sans']
text-2xl          /* Mobile: 1.5rem */
md:text-3xl       /* Desktop: 1.875rem */
font-bold
tracking-tight
```

### Descriptions
```css
text-lg
line-relaxed
opacity-90
font-light
```

### Illustration Titles (Pixel Art)
```css
text-5xl          /* Mobile: 3rem */
md:text-7xl       /* Desktop: 4.5rem */
leading-tight
```

## Image and Illustration Sizing

### Quest Card Illustration Container

```css
/* Minimum height */
min-h-[300px]     /* At least 300px */

/* Desktop specific */
md:w-[60%]        /* 60% of parent width */
md:justify-start   /* Align left on desktop */

/* Mobile specific */
w-full            /* Full width */
justify-center    /* Center horizontally */
```

### Background Blob

```css
w-64 h-64         /* 16rem × 16rem */
rounded-full      /* Circular */
opacity-10        /* Subtle background */
blur-3xl          /* Heavy blur */
```

## Interactive Elements

### Timeline Dot

```css
/* Size */
w-8 h-8           /* 32px × 32px outer */
w-3 h-3           /* 12px × 12px inner dot */

/* Position */
left-1/3          /* 33.33% from left */
top-24            /* 6rem from top */
-translate-x-1/2  /* Center on line */

/* Desktop only */
hidden md:flex    /* Hidden on mobile */

/* Interactions */
group-hover:scale-125        /* 125% on hover */
group-focus-within:scale-125 /* 125% on focus */
transition-transform         /* Smooth animation */
```

### Buttons

```css
/* Text content */
flex items-center gap-2  /* Flex layout with icon and text */

/* Focus states */
focus:outline-none
focus:ring-4
focus:ring-[#B6F2B6]   /* Green ring */
focus:ring-offset-2
focus:ring-offset-[#8f3aff]  /* Purple background */
rounded-lg

/* Custom button styling from PixelButton component */
```

## Alignment Patterns

### Content Section (Left 40%)

```css
w-full md:w-[40%]         /* Full on mobile, 40% on desktop */
flex flex-col             /* Vertical flex layout */
gap-6                     /* Space between elements */
items-start               /* Left-aligned on desktop */
md:pr-12                  /* Right padding on desktop */
```

### Illustration Section (Right 60%)

```css
w-full md:w-[60%]         /* Full on mobile, 60% on desktop */
flex justify-center       /* Center on mobile */
md:justify-start          /* Align left on desktop */
items-center              /* Vertical centering */
relative                  /* For positioning */
min-h-[300px]             /* Minimum height */
md:pl-12                  /* Left padding on desktop */
```

## Container Constraints

### Timeline Container

```css
container mx-auto px-4 max-w-7xl

/* Breakdown */
container          /* Container query context */
mx-auto            /* Center horizontally */
px-4               /* 1rem padding on each side */
max-w-7xl          /* Max width 80rem (1280px) */
```

### Divider Max Width

```css
max-w-5xl          /* 64rem (1024px) */
mx-auto            /* Center */
w-full             /* Full container width (up to max) */
```

## Responsive Image Handling

### Background Blob

```css
/* Always visible */
absolute           /* Positioned absolutely */
w-64 h-64          /* 16rem × 16rem (fixed size) */
rounded-full
opacity-10
blur-3xl

/* Responsive positioning */
/* Parent uses relative positioning */
/* Blob centered within parent */
```

### Pixel Art Title Illustrations

```css
/* Always responsive to font size */
text-5xl md:text-7xl

/* Containers within scale accordingly */
w-16 h-16  /* Icon/element sizing */
```

## Testing Responsive Behavior

### Desktop Checklist (≥768px)

- [ ] Timeline line visible at 33.33% horizontal position
- [ ] Timeline dots centered on line
- [ ] Content area takes 40% width
- [ ] Illustration area takes 60% width
- [ ] Horizontal dividers between cards
- [ ] Proper spacing (gap-16, py-24)
- [ ] Hover animations work (dot scales, illustration lifts)

### Mobile Checklist (&lt;768px)

- [ ] Content stacks vertically above illustration
- [ ] Timeline line hidden
- [ ] Timeline dots hidden
- [ ] Full-width layout with px-4 padding
- [ ] Content and illustration properly spaced (gap-12, py-16)
- [ ] Text sizes readable (text-2xl title, text-lg description)
- [ ] Button clickable and accessible
- [ ] No horizontal scrolling

### Tablet Checklist (768px - 1023px)

- [ ] Side-by-side layout begins (40/60 split)
- [ ] Timeline appears
- [ ] Spacing transitions properly
- [ ] No layout shift between mobile and tablet
- [ ] Responsive fonts scale correctly

## Performance Optimization

### CSS Efficiency

- Use standard Tailwind utilities
- Avoid custom media queries where possible
- Leverage Tailwind's responsive variants
- Minimize JavaScript for layout changes

### Mobile-First Benefits

- Reduces CSS size (only additions needed)
- Better performance on mobile devices
- Progressive enhancement approach
- Easier to maintain

## Common Issues and Solutions

### Issue: Content Overlaps Illustration on Tablet

**Cause:** Incorrect width percentages or gap sizes

**Solution:**
```tsx
// Ensure both widths add up to ~100% (with gap)
<div className="w-full md:w-[40%]">  // 40%
<div className="w-full md:w-[60%]">  // 60%
// Gap: md:gap-16 (4rem) = 6.25% of parent effectively

// Verify padding doesn't add to widths
md:pr-12  // Padding inside the 40%
md:pl-12  // Padding inside the 60%
```

### Issue: Timeline Line Misaligned on Some Screens

**Cause:** Browser zoom or inconsistent viewport units

**Solution:** Use `left-1/3` (percentage) rather than pixel values

### Issue: Text Too Small on Mobile

**Cause:** Base size not suitable for mobile

**Solution:** Use mobile-first sizes, add larger sizes for desktop
```css
text-2xl       /* Mobile base */
md:text-3xl    /* Desktop larger */
```

### Issue: Illustration Doesn't Fit on Mobile

**Cause:** Fixed dimensions or inappropriate min-height

**Solution:** Use responsive sizing and adjust min-height
```css
min-h-[300px]  /* Ensure minimum space */
w-full         /* Responsive width */
```

## Design System Consistency

### Applied Globally

- **Color Palette:** Defined in tailwind.config.js
- **Spacing Scale:** 4px base unit (Tailwind default)
- **Typography Scale:** Standard Tailwind sizes + custom fonts
- **Breakpoints:** Standard Tailwind breakpoints
- **Transitions:** 500ms duration for smooth animations

### Component-Level Consistency

- All cards use same spacing system
- Timeline positioning unified across components
- Interactive states consistent (scale-125, duration-500)
- ARIA labels follow same pattern

---

**Last Updated:** 2025-12-05
**Version:** 1.0.0
**Status:** Production Ready
