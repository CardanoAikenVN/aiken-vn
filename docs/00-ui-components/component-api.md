---
title: Component API Reference
sidebar_label: Component API
---

# UI Component API Reference

Complete API documentation for all Aiken-VN landing page components.

## QuestTimeline

Main timeline container component for displaying sequential quests.

**Location:** `/src/components/LandingPage/QuestTimeline.tsx`

### Props

```typescript
interface QuestTimelineProps {
  quests: Quest[];
  startIndex?: number;
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `quests` | `Quest[]` | Yes | Array of quest objects to display |
| `startIndex` | `number` | No | Starting number for challenge numbering (default: 1) |

### Type Definitions

```typescript
interface Quest {
  id: string;
  number: number;
  title: string;
  description: string;
  colorTheme: string;
  illustrationType: 'token' | 'staking' | 'vendor' | 'lending' | 'wallet' | 'nft';
  imageAlt: string;
}
```

### Usage Example

```tsx
import QuestTimeline from '@/components/LandingPage/QuestTimeline';
import { Quest } from '@/components/LandingPage/types';

const quests: Quest[] = [
  {
    id: 'quest-1',
    number: 1,
    title: 'Getting Started with Tokens',
    description: 'Introduction to tokenization on Cardano blockchain',
    colorTheme: 'text-[#B6F2B6]',
    illustrationType: 'token',
    imageAlt: 'Token illustration'
  },
  {
    id: 'quest-2',
    number: 2,
    title: 'Staking Rewards',
    description: 'Learn how staking works and earn rewards',
    colorTheme: 'text-[#C6A8FF]',
    illustrationType: 'staking',
    imageAlt: 'Staking illustration'
  }
];

export default function App() {
  return <QuestTimeline quests={quests} />;
}
```

### Rendering Output

- Renders a vertical timeline with centered line at 33.33% from left
- Creates QuestCard component for each quest
- Adds horizontal dividers between cards
- Line and dividers hidden on mobile, visible on desktop (768px+)

### Performance

- No re-renders unless `quests` array changes
- Suitable for memoization with React.memo

---

## QuestCard

Individual card component for displaying quest information and illustration.

**Location:** `/src/components/LandingPage/QuestCard.tsx`

### Props

```typescript
interface QuestCardProps {
  quest: Quest;
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `quest` | `Quest` | Yes | Quest object containing all card data |

### Type Definitions

See QuestTimeline section for `Quest` interface definition.

### Usage Example

```tsx
import QuestCard from '@/components/LandingPage/QuestCard';
import { Quest } from '@/components/LandingPage/types';

const quest: Quest = {
  id: 'quest-1',
  number: 1,
  title: 'Token Basics',
  description: 'Learn the fundamentals of tokenization',
  colorTheme: 'text-[#B6F2B6]',
  illustrationType: 'token',
  imageAlt: 'Retro pixel art token illustration'
};

export default function CardDisplay() {
  return <QuestCard quest={quest} />;
}
```

### Rendering Output

- Left section (40% width on desktop): Challenge number, title, description, button
- Right section (60% width on desktop): Retro pixel art illustration
- Timeline dot on left (desktop only) at 33.33% horizontal position
- Interactive hover/focus states with scale animations

### Illustration Types

QuestCard automatically renders different illustrations based on `illustrationType`:

| Type | Title | Color | Icon |
|------|-------|-------|------|
| `token` | TOKENIZATION | `#B6F2B6` (green) | Coins |
| `staking` | STAKING APP | `#C6A8FF` (purple) | Gem |
| `vendor` | TOKEN VENDOR | `#FFD8A8` (orange) | Hammer |
| `lending` | OVER LENDING | `#FFF79A` (yellow) | Anchor |
| `wallet` | (Custom title) | `#FFD8A8` (orange) | Wallet |
| `nft` | (Custom title) | `#B6F2B6` (green) | FileCode |

### Button Behavior

- Button text: "BẮT ĐẦU `{ICON_LABEL}`" (in Vietnamese)
- Link target: `#quest-{quest.id}` (hash anchor)
- Accessible with keyboard navigation and focus ring
- Scales on hover and focus with smooth animation

---

## PixelButton

Pixel-styled button component for retro aesthetic.

**Location:** `/src/components/LandingPage/PixelComponents.tsx`

### Props

```typescript
interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  [key: string]: any;  // Accepts standard button HTML attributes
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Button content (text or elements) |
| `onClick` | `function` | No | Click handler |
| (HTML attributes) | `any` | No | Standard button attributes (className, id, etc.) |

### Usage Example

```tsx
import { PixelButton } from '@/components/LandingPage/PixelComponents';

export function MyComponent() {
  return (
    <PixelButton onClick={() => console.log('Clicked!')}>
      Click Me!
    </PixelButton>
  );
}
```

### Styling

- Retro pixel aesthetic with box-shadow effects
- Responsive sizing
- Includes hover and active states
- Accessible focus states

---

## Starfield

Animated background starfield component for visual depth.

**Location:** `/src/components/LandingPage/Starfield.tsx`

### Props

```typescript
interface StarfieldProps {
  density?: number;    // Star density (0.1 - 1.0, default: 0.3)
  speed?: number;      // Animation speed (default: 1.0)
  color?: string;      // Star color (default: 'white')
}
```

### Usage Example

```tsx
import Starfield from '@/components/LandingPage/Starfield';

export function Background() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Starfield density={0.5} speed={0.8} color="white" />
      {/* Content over starfield */}
    </div>
  );
}
```

---

## OnboardingTrain

Interactive onboarding/tutorial component with visual train metaphor.

**Location:** `/src/components/LandingPage/OnboardingTrain.tsx`

### Props

```typescript
interface OnboardingTrainProps {
  steps: OnboardingStep[];
  onComplete?: () => void;
}

interface OnboardingStep {
  id: string;
  title: string;
  content: string;
  position?: 'left' | 'right' | 'center';
}
```

### Usage Example

```tsx
import OnboardingTrain from '@/components/LandingPage/OnboardingTrain';

const steps = [
  {
    id: 'step-1',
    title: 'Welcome',
    content: 'Let\'s learn about Cardano...',
    position: 'center'
  },
  {
    id: 'step-2',
    title: 'Blockchain Basics',
    content: 'Understanding the fundamentals...',
    position: 'right'
  }
];

export function Onboarding() {
  return (
    <OnboardingTrain
      steps={steps}
      onComplete={() => console.log('Done!')}
    />
  );
}
```

---

## Common Types

All components use the following shared types:

```typescript
// Main quest data structure
interface Quest {
  id: string;                    // Unique identifier
  number: number;               // Sequential challenge number
  title: string;                // Quest title
  description: string;          // Quest description
  colorTheme: string;           // Tailwind color class
  illustrationType: string;     // Illustration type for rendering
  imageAlt: string;             // Alt text for accessibility
}

// Quest illustration types (type-safe)
type IllustrationType =
  | 'token'
  | 'staking'
  | 'vendor'
  | 'lending'
  | 'wallet'
  | 'nft';
```

---

## Event Handlers

### QuestCard

- **Button click:** Navigate to anchor `#quest-{quest.id}`
- **Hover:** Timeline dot scales to 125%, illustration lifts and scales
- **Focus (keyboard):** Same animations as hover for accessibility

### PixelButton

- **Click:** Fires `onClick` handler if provided
- **Focus:** Shows focus ring (configurable)
- **Active:** Press state with visual feedback

---

## Styling and Customization

### Tailwind Classes Used

All components use standard Tailwind CSS utilities:

```css
/* Layout */
flex, flex-col, flex-row, gap-*, px-*, py-*, w-*, h-*

/* Colors */
bg-*, text-*, border-*, opacity-*

/* Positioning */
relative, absolute, left-*, top-*, z-*

/* Responsive */
md:*, lg:*, xl:*, 2xl:*

/* Interactive */
hover:*, focus:*, group-hover:*, group-focus-within:*

/* Animation */
transition-*, duration-*, scale-*, translate-*
```

### Custom Classes

Components define custom Tailwind classes in `globals.css`:

```css
.text-shadow-retro   /* Retro pixel art text shadow */
.pixel-shadow        /* Pixelated shadow effect */
```

---

## Accessibility Features

### ARIA Labels

```tsx
aria-hidden="true"              // Decorative elements
aria-label="..."                // Descriptive labels for screen readers
role="presentation"             // Non-semantic role
role="img"                      // Image content
```

### Keyboard Navigation

- All interactive elements reachable via Tab
- Focus rings visible with custom colors
- Enter/Space activates buttons
- Escape closes modals (if applicable)

### Screen Reader Support

- Semantic HTML: `<article>`, `<h3>`, `<p>`, `<a>`, `<button>`
- Descriptive text for all buttons
- Image alt text for illustrations
- Proper heading hierarchy

---

## Dependencies

### External Libraries

```json
{
  "react": "^19.0.0",
  "lucide-react": "latest",      // Icons (Coins, Gem, Hammer, etc.)
  "framer-motion": "latest"      // Animations (in some components)
}
```

### Internal Dependencies

```tsx
import { Quest } from './types';
import { PixelButton } from './PixelComponents';
import { Check, Coins, Gem, Hammer, Anchor, Wallet, FileCode } from 'lucide-react';
```

---

## Testing

### Unit Tests Example

```typescript
import { render, screen } from '@testing-library/react';
import QuestCard from '@/components/LandingPage/QuestCard';
import { Quest } from '@/components/LandingPage/types';

describe('QuestCard', () => {
  const mockQuest: Quest = {
    id: 'test-1',
    number: 1,
    title: 'Test Quest',
    description: 'Test description',
    colorTheme: 'text-[#B6F2B6]',
    illustrationType: 'token',
    imageAlt: 'Test alt text'
  };

  it('renders quest title', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
  });

  it('renders challenge number', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByLabelText('Challenge số 1')).toBeInTheDocument();
  });

  it('renders button with correct aria-label', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByLabelText('Bắt đầu Test Quest - Challenge 1')).toBeInTheDocument();
  });
});
```

---

**Last Updated:** 2025-12-05
**Version:** 1.0.0
**Status:** Production Ready
