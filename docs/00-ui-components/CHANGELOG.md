# Changelog - UI Components

All notable changes to the Aiken-VN UI components are documented here.

## [1.0.0] - 2025-12-05

### Added

#### QuestTimeline Component
- Initial production release of QuestTimeline component
- Vertical timeline line positioned at `left-1/3` (33.33% from left)
- Horizontal dividers between quest cards (`border-white/10`)
- Full responsive design support (mobile stack, desktop 40/60 split)
- Desktop-only timeline visualization (hidden on mobile)
- Proper container constraints with `max-w-7xl`

#### QuestCard Component
- Individual quest card display with timeline dot
- Timeline dot positioned at `left-1/3 -translate-x-1/2` (perfectly centered on line)
- 40/60 content-to-illustration split on desktop
- Responsive stacked layout on mobile
- Illustration types: token, staking, vendor, lending, wallet, nft
- Interactive states: hover/focus with scale animations
- Decorative background blob with blur effect

#### Accessibility Features
- ARIA labels for all interactive elements
- Screen reader support with semantic HTML
- Keyboard navigation with focus rings
- Color contrast meets WCAG 2.1 AA standards
- Decorative elements properly marked with `aria-hidden`

#### Documentation
- Complete Quest Timeline design pattern documentation
- Component API reference with type definitions
- Responsive design guidelines with breakpoint specifications
- Changelog for tracking updates

### Technical Details

#### QuestTimeline.tsx
- File: `/src/components/LandingPage/QuestTimeline.tsx`
- Lines: 40
- Dependencies: React, QuestCard, types
- Tailwind Classes: container, mx-auto, px-4, max-w-7xl, flex, flex-col, hidden, md:block, absolute, left-1/3, top-0, bottom-0, w-[2px], bg-white/20, border-t, border-white/10

#### QuestCard.tsx
- File: `/src/components/LandingPage/QuestCard.tsx`
- Lines: 155
- Dependencies: React, PixelButton, Lucide React icons
- Tailwind Classes: relative, py-16, md:py-24, hidden, md:flex, absolute, left-1/3, w-8, h-8, -translate-x-1/2, z-20, group-hover:scale-125, flex-col, md:flex-row, gap-12, md:gap-16, w-full, md:w-[40%], md:pr-12, md:w-[60%], md:pl-12, min-h-[300px]

### Performance Improvements
- Optimized CSS positioning (no complex calc() expressions)
- Simplified Tailwind utilities
- GPU-accelerated transitions (transition-transform)
- No JavaScript required for positioning

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Testing Status
- ✅ Build compilation successful
- ✅ Visual testing passed (desktop, tablet, mobile)
- ✅ Responsive behavior verified
- ✅ Accessibility compliance verified
- ✅ Interactive animations working

---

## Version History Summary

### Before v1.0.0

#### Known Issues (Fixed)
- Timeline line positioned at `left-[calc(1rem+27px)]` - too close to content
- Timeline dot at `left-[-43px]` - misaligned with line
- Missing horizontal dividers between sections
- Improper content/illustration spacing
- Layout not matching Speedrun design pattern

#### Changes Made
1. **Vertical Line Repositioning**
   - From: `left-[calc(1rem+27px)]` (50px + 16px margin)
   - To: `left-1/3` (33.33% of container)
   - Also adjusted width from `w-1` to `w-[2px]`
   - Changed opacity from `bg-white/30` to `bg-white/20`

2. **Timeline Dot Alignment**
   - From: `left-[-43px]` (arbitrary pixel positioning)
   - To: `left-1/3 -translate-x-1/2` (percentage-based with transform)
   - Increased size from `w-6 h-6` to `w-8 h-8`
   - Inner dot increased from `w-2 h-2` to `w-3 h-3`

3. **Layout Refactoring**
   - Introduced explicit width percentages: `md:w-[40%]` and `md:w-[60%]`
   - Added padding: `md:pr-12` (content) and `md:pl-12` (illustration)
   - Adjusted gaps: `gap-12` (mobile) to `gap-16` (desktop)

4. **Structural Enhancements**
   - Added horizontal dividers between quest cards
   - Proper React Fragment handling with keys
   - Improved spacing with `py-16 md:py-24`

---

## Future Planned Features

### Potential Enhancements
- [ ] SVG animated line drawing on scroll
- [ ] Progress indicator showing completion percentage
- [ ] Different timeline dot colors by quest type
- [ ] Parallax effects for illustrations
- [ ] Smooth scroll behavior for anchor links

### Maintenance Considerations
- Timeline positioning at `left-1/3` is synchronized between both components
- Content/illustration split (40/60) should remain consistent for visual harmony
- Spacing values tied to Tailwind scale - update both components if changed
- Quest count optimization: Current spacing optimized for 6-8 quests

---

## Deprecation Notes

None at this time. All current features are production-ready.

---

## Migration Guide

### From Previous Version

If you were using earlier versions of QuestTimeline/QuestCard:

1. **Update Quest Data Structure**
   ```typescript
   // Old (if different) → New
   interface Quest {
     id: string;           // Required
     number: number;       // Required
     title: string;        // Required
     description: string;  // Required
     colorTheme: string;   // Required - e.g., 'text-[#B6F2B6]'
     illustrationType: string; // Required - see types
     imageAlt: string;     // Required - for accessibility
   }
   ```

2. **Update Component Usage**
   ```tsx
   // Old way (if different)
   <QuestTimeline quests={quests} />

   // New way (same - no breaking changes)
   <QuestTimeline quests={quests} />
   ```

3. **Verify Styling**
   - Check that parent containers allow `max-w-7xl`
   - Ensure sufficient horizontal space for responsive breakpoints
   - Verify background/theme colors work with new spacing

---

## Known Limitations

1. **Quest Count:** Optimized spacing for 6-8 quests. Adjust `py-16 md:py-24` if more quests added.
2. **Very Small Screens:** Responsive design begins at 640px. Below that uses mobile stacking.
3. **Illustration Sizing:** Pixel art illustrations scale with text size (text-5xl/7xl). Custom illustrations may need adjustment.

---

## Reporting Issues

If you find issues with QuestTimeline or QuestCard:

1. Check if it's already listed in "Known Limitations"
2. Verify responsive breakpoint behavior (< 768px vs ≥ 768px)
3. Check browser compatibility (use supported browsers)
4. Report with:
   - Browser/version
   - Screen resolution
   - Steps to reproduce
   - Expected vs actual behavior

---

**Last Updated:** 2025-12-05
**Current Version:** 1.0.0
**Maintenance:** Active
