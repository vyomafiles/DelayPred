# Vyoma — Claude Instructions

## Git & GitHub Rules

- **Never add yourself as co-author or contributor** in any commit, PR, or push. No `Co-Authored-By` trailers. No attribution lines. Ever.
- When pushing to GitHub, always use the vyomafiles token and ensure commits are authored as `vyomafiles <vyomafiles@users.noreply.github.com>`.
- The GitHub repo is: https://github.com/vyomafiles/DelayPred

## Project Overview

- **App name**: Vyoma (previously referred to as TransitPredict in old code — update any references found)
- **Purpose**: AI-powered TfL delay prediction platform for London commuters
- **Stack**: React + Vite + Tailwind CSS
- **GitHub**: https://github.com/vyomafiles/DelayPred (owner: vyomafiles)

## Design System

All pages must match the home/landing page theme:
- **Background**: `bg-white` with `bg-slate-50` alternating sections
- **Text**: `text-slate-900` headings, `text-slate-500` body, `text-slate-400` labels
- **Accent**: `blue-600` (#2563eb) for CTAs, icons, highlights
- **Fonts**: `font-display` (Cormorant Garamond) for headings with italic emphasis, DM Sans for body
- **Cards**: white with `border border-slate-200`, `rounded-xl`, subtle hover states
- **Hero texture**: dot-grid radial-gradient pattern (see Hero.jsx)
- **Buttons**: `rounded-full` pill style, `bg-blue-600 text-white` primary
- **Section labels**: `text-xs font-semibold text-blue-600 uppercase tracking-widest`
- **No dark themes, no purple/indigo gradients, no custom color schemes** on content pages

## File Structure (Key Pages)

```
src/pages/
  Landing/LandingPage.jsx
  Features/FeaturesPage.jsx
  HowItWorks/HowItWorksPage.jsx
  About/AboutPage.jsx
  Contact/ContactPage.jsx
  Auth/GetStartedPage.jsx
  Auth/SignInPage.jsx

src/components/
  features/landing/Hero/Hero.jsx       ← reference for design system
  features/landing/Features/Features.jsx
  layout/Header/Header.jsx
  layout/Footer/Footer.jsx
```

## Do Not

- Add `.claude/` directory contents to git (already in .gitignore)
- Add co-author attribution to commits
- Use purple/indigo gradients or dark backgrounds on content pages
- Create new guide/documentation .md files unless explicitly asked
