# UK Transport Delay Management System - Landing Page

## Overview

A stunning, fully responsive landing page for the UK Transport Delay Management System built with React, Tailwind CSS, and modern best practices.

## Features Implemented

### 1. **Hero Section**

- Eye-catching gradient background with animated elements
- Live statistics showcase (50K+ users, 95% accuracy, 5M+ journeys)
- Integrated search form (From, To, Transport Type, Time)
- Dual CTA buttons with clear call-to-action
- Mobile-responsive design

### 2. **Features Section**

- 6 powerful feature cards with icons
- Gradient backgrounds for visual appeal
- Detailed comparison showing 83% improvement
- Real metrics and benefits highlighted
- Historical analytics and accuracy showcase

### 3. **How It Works Section**

- 4-step process visualization
- Icon-based navigation
- Progressive disclosure of information
- Connected step indicators on desktop

### 4. **Testimonials Section**

- 4 real user testimonials
- Star ratings (4-5 stars)
- User avatars and roles
- Diverse use cases showcased

### 5. **Pricing Section**

- 3-tier pricing model (Basic, Pro, Enterprise)
- Feature comparison
- Visual highlight for most popular plan
- FAQ section with common questions
- Flexible payment options

### 6. **Call-to-Action (CTA) Section**

- Eye-catching gradient background
- Email subscription form
- Trust indicators with statistics
- Multiple action buttons

### 7. **Navigation**

- Sticky header with logo
- Mobile hamburger menu
- Navigation links to sections
- Sign In / Get Started buttons

## File Structure

```
src/
├── components/
│   ├── features/landing/
│   │   ├── Hero/
│   │   ├── Features/
│   │   ├── HowItWorks/
│   │   ├── Testimonials/
│   │   ├── Pricing/
│   │   └── CTA/
│   └── layout/
│       ├── Header/
│       └── Footer/
└── pages/
    └── Landing/
        └── LandingPage.jsx
```

## Getting Started

### Prerequisites

```bash
Node.js v18+
npm v9+
```

### Installation

1. Navigate to project directory:

```bash
cd c:\Users\ilyas\Downloads\vyoma
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open your browser:

```
http://localhost:3000
```

## Environment Setup

The project uses environment variables for configuration. Create a `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_ENABLE_DEBUG=true
VITE_APP_NAME=UK Transport Delay Predictor
```

## Tailwind CSS Configuration

The landing page uses custom Tailwind configuration with:

- **Primary Colors**: Blue gradient (50-900)
- **Secondary Colors**: Purple/Pink gradient
- **Animations**: Fade-in and slide-up effects
- **Custom Components**: Buttons, cards, containers

## Component Details

### Hero Component (`Hero.jsx`)

- Full-screen gradient background
- Animated background elements
- Live search form
- Key statistics display
- Responsive on all devices

### Features Component (`Features.jsx`)

- 6-feature grid layout
- Icon + description cards
- Benefit comparison section
- Color-coded feature categories

### HowItWorks Component (`HowItWorks.jsx`)

- 4-step process visualization
- Connected indicator lines (desktop)
- Icon-based step representation
- Clear descriptions

### Testimonials Component (`Testimonials.jsx`)

- 4-column grid (responsive)
- Star ratings
- User profile information
- Quote styling

### Pricing Component (`Pricing.jsx`)

- 3-tier pricing model
- Feature comparison
- FAQ section
- "Most Popular" badge highlight

### CTA Component (`CTA.jsx`)

- Gradient background
- Email subscription
- Statistics showcase
- Action buttons

## Responsive Design

All components are fully responsive:

- **Mobile**: Single column, full width
- **Tablet**: 2 columns where appropriate
- **Desktop**: 3-4 columns with optimal spacing

## Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: { /* Blue colors */ },
  secondary: { /* Purple colors */ },
}
```

### Change Content

Update component files directly:

- Text content in component JSX
- Images in `public/` directory
- Icons from `lucide-react`

### Add Sections

1. Create new component in `src/components/features/landing/`
2. Add to `LandingPage.jsx` imports
3. Include in the return statement

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Format code
npm run format
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading components
- Optimized images
- CSS animations instead of JavaScript
- Minimal bundle size
- Fast HMR with Vite

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Mobile-friendly touch targets

## Future Enhancements

- [ ] Add more testimonials with real data
- [ ] Integrate actual API for predictions
- [ ] Add animation library (Framer Motion)
- [ ] Implement form validation
- [ ] Add blog section
- [ ] Add FAQ page
- [ ] Add contact form

## Support

For questions or issues, refer to:

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

## License

MIT
