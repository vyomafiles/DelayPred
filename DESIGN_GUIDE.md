# Landing Page Visual Guide

## Color Palette

### Primary Colors (Blue)

- Primary 50: #eff6ff (Lightest)
- Primary 500: #3b82f6 (Main)
- Primary 600: #2563eb (Hover)
- Primary 900: #1e3a8a (Darkest)

### Secondary Colors (Purple/Pink)

- Secondary 500: #a855f7 (Main)
- Secondary 900: #581c87 (Dark)

### Semantic Colors

- Success: #10b981 (Green)
- Warning: #f59e0b (Amber)
- Error: #ef4444 (Red)

## Typography

### Font Families

- **Sans (Body)**: Inter
- **Display (Headings)**: Poppins

### Font Sizes

- H1: 48px (mobile) → 72px (desktop)
- H2: 36px
- H3: 24px
- Body: 16px
- Small: 14px

## Section Breakdown

### 1. Header Navigation

```
Logo | Home | Features | How It Works | Testimonials | Pricing | Sign In | Get Started
```

- Sticky position with shadow
- Mobile hamburger menu
- Z-index: 50

### 2. Hero Section

```
┌─────────────────────────────────┐
│ Gradient Background             │
│ "Never Miss Your Transport..."  │
│ Search Form + CTA Buttons       │
│ Stats Grid                      │
└─────────────────────────────────┘
```

- Full viewport height
- Animated background
- Integrated search form

### 3. Features Section

```
┌─────────┬─────────┬─────────┐
│ Feature │ Feature │ Feature │
├─────────┼─────────┼─────────┤
│ Feature │ Feature │ Feature │
└─────────┴─────────┴─────────┘
+ Benefits Comparison Section
```

- 6 cards in 3 columns
- Color-coded backgrounds
- Hover effects

### 4. How It Works

```
┌──────────┬──────────┬──────────┬──────────┐
│ Step 1   │   →    │ Step 2   │   →    │ Step 3   │   →    │ Step 4   │
└──────────┴──────────┴──────────┴──────────┘
```

- 4 step cards
- Connected indicators
- Icon + description

### 5. Testimonials

```
┌──────────┬──────────┬──────────┬──────────┐
│ Quote 1  │ Quote 2  │ Quote 3  │ Quote 4  │
│ ⭐⭐⭐⭐⭐ │ ⭐⭐⭐⭐⭐ │ ⭐⭐⭐⭐  │ ⭐⭐⭐⭐⭐ │
└──────────┴──────────┴──────────┴──────────┘
```

- 4 testimonial cards
- Star ratings
- User avatars

### 6. Pricing

```
┌──────────┬──────────────┬──────────┐
│ Basic    │ Pro          │ Enterprise│
│ Free     │ £4.99/month  │ Custom   │
│ Features │ Features     │ Features │
└──────────┴──────────────┴──────────┘
+ FAQ Section
```

- 3 pricing tiers
- Highlighted "Most Popular"
- Feature comparison

### 7. CTA Section

```
┌─────────────────────────────────┐
│ "Ready to Master Your Commute?" │
│ Email Subscription Form          │
│ Stats Grid (50K+, 95%, 5M+)     │
└─────────────────────────────────┘
```

- Gradient background
- Email capture
- Trust indicators

## Interactive Elements

### Buttons

- **Primary**: Blue background with white text
- **Secondary**: White background with blue text
- **Variants**: sm, md, lg sizes
- **Hover**: Color darkening, slight scale

### Form Inputs

- **Style**: Transparent with border
- **Focus**: Blue ring and border
- **Error**: Red styling
- **Placeholder**: Light gray text

### Cards

- **Shadow**: Light shadow on hover
- **Border**: Light gray border
- **Padding**: 24px (p-6)
- **Rounded**: 8px (rounded-lg)

## Animations

### CSS Animations

- `fade-in`: 0.5s ease-in-out
- `slide-up`: 0.5s ease-out
- `slide-down`: 0.5s ease-out

### Hover Effects

- Cards: `shadow-lg` on hover
- Links: Color change
- Buttons: Background darkening

## Spacing System

### Container

- Max width: 80rem (1280px)
- Horizontal padding: 1rem (mobile), 2rem (desktop)
- Vertical padding: 5rem (section default)

### Grid Gaps

- 8 units (32px) between items

### Element Spacing

- Headings: 1.5rem below
- Paragraphs: 2rem below
- Buttons: 2rem below

## Responsive Breakpoints

- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3-4 columns)

## Performance Metrics

- **Lighthouse Score**: 90+
- **Page Load**: < 2 seconds
- **Mobile Score**: 85+
- **Accessibility**: 95+

## Accessibility Features

- Semantic HTML structure
- ARIA labels on buttons
- Keyboard navigation support
- Color contrast ratios > 4.5:1
- Touch-friendly targets (44px+)

## SEO Optimizations

- Semantic heading hierarchy
- Meta descriptions
- Open Graph tags
- Mobile-friendly viewport
- Structured data (JSON-LD)

## Browser Compatibility

| Browser | Support          |
| ------- | ---------------- |
| Chrome  | ✅ Latest        |
| Firefox | ✅ Latest        |
| Safari  | ✅ Latest        |
| Edge    | ✅ Latest        |
| IE 11   | ❌ Not supported |

## Mobile Considerations

- Full-width layout
- Touch-friendly buttons (48px+ height)
- Simplified forms
- Optimized images
- Vertical scrolling focus
- Mobile menu for navigation

## Dark Mode (Future)

Dark mode styling can be added by:

1. Adding dark mode variants to Tailwind config
2. Implementing theme toggle in Header
3. Updating component dark: prefixes

Example:

```jsx
<h2 className="text-gray-900 dark:text-white">Heading</h2>
```
