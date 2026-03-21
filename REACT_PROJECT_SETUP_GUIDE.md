# UK Transport Delay Predictor - Complete React Setup Guide

## Table of Contents
1. [Initial Project Setup](#1-initial-project-setup)
2. [Folder Structure](#2-folder-structure)
3. [Core Configuration](#3-core-configuration)
4. [Routing Foundation](#4-routing-foundation)
5. [Component Architecture](#5-component-architecture)
6. [State Management](#6-state-management)
7. [Development Workflow](#7-development-workflow)
8. [Best Practices & Guidelines](#8-best-practices--guidelines)

---

## 1. Initial Project Setup

### Prerequisites
```bash
# Ensure you have Node.js (v18+) and npm installed
node --version  # Should be v18.0.0 or higher
npm --version   # Should be v9.0.0 or higher
```

### Step 1: Create React App with Vite

We'll use **Vite** instead of Create React App for faster development and better performance.

```bash
# Create new Vite + React project
npm create vite@latest uk-transport-predictor -- --template react

# Navigate to project
cd uk-transport-predictor

# Install dependencies
npm install
```

**Why Vite?**
- ⚡ Lightning-fast Hot Module Replacement (HMR)
- 📦 Optimized build output
- 🎯 Better developer experience
- 🔧 Simpler configuration than CRA

### Step 2: Install Essential Dependencies

```bash
# Routing
npm install react-router-dom

# HTTP Client
npm install axios

# State Management
npm install zustand

# Form Handling & Validation
npm install react-hook-form zod @hookform/resolvers

# UI Components & Styling
npm install tailwindcss postcss autoprefixer
npm install clsx tailwind-merge

# Icons
npm install lucide-react

# Charts & Visualizations (for dashboard later)
npm install recharts

# Date handling
npm install date-fns

# Utilities
npm install lodash-es
```

### Step 3: Install Dev Dependencies

```bash
# TypeScript (optional but recommended)
npm install -D typescript @types/react @types/react-dom

# Linting & Formatting
npm install -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y

# Path aliases
npm install -D @types/node
```

---

## 2. Folder Structure

### Complete Directory Architecture

```
uk-transport-predictor/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── images/
│       ├── hero-bg.jpg
│       └── transport-icons/
├── src/
│   ├── api/                    # API integration layer
│   │   ├── client.js          # Axios instance configuration
│   │   ├── endpoints.js       # API endpoint definitions
│   │   └── services/
│   │       ├── authService.js
│   │       ├── predictionService.js
│   │       └── routeService.js
│   │
│   ├── assets/                 # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/             # Reusable components
│   │   ├── common/            # Shared across entire app
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Button.test.jsx
│   │   │   │   └── index.js
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Spinner/
│   │   │   └── ErrorBoundary/
│   │   │
│   │   ├── layout/            # Layout components
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Navigation.jsx
│   │   │   │   └── index.js
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── PageLayout/
│   │   │
│   │   └── features/          # Feature-specific components
│   │       ├── landing/
│   │       │   ├── Hero/
│   │       │   ├── Features/
│   │       │   ├── HowItWorks/
│   │       │   └── Testimonials/
│   │       ├── auth/
│   │       │   ├── LoginForm/
│   │       │   ├── SignupForm/
│   │       │   └── ForgotPassword/
│   │       └── dashboard/     # For later
│   │           ├── PredictionCard/
│   │           ├── RouteSearch/
│   │           └── DelayChart/
│   │
│   ├── constants/              # Application constants
│   │   ├── routes.js          # Route paths
│   │   ├── apiEndpoints.js    # API URLs
│   │   ├── appConfig.js       # App configuration
│   │   └── validationSchemas.js
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useApi.js
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   └── usePrediction.js
│   │
│   ├── pages/                  # Page components (route containers)
│   │   ├── Landing/
│   │   │   ├── LandingPage.jsx
│   │   │   └── index.js
│   │   ├── About/
│   │   ├── HowItWorks/
│   │   ├── Features/
│   │   ├── Contact/
│   │   ├── Auth/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── index.js
│   │   ├── Dashboard/         # For later
│   │   └── NotFound/
│   │
│   ├── store/                  # State management (Zustand)
│   │   ├── authStore.js
│   │   ├── predictionStore.js
│   │   └── uiStore.js
│   │
│   ├── styles/                 # Global styles
│   │   ├── index.css          # Tailwind imports + global styles
│   │   ├── animations.css
│   │   └── variables.css
│   │
│   ├── utils/                  # Utility functions
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   ├── helpers.js
│   │   ├── dateUtils.js
│   │   └── cn.js             # classname utility
│   │
│   ├── App.jsx                 # Main App component
│   ├── main.jsx               # Entry point
│   └── router.jsx             # Route configuration
│
├── .env.example               # Environment variables template
├── .env.local                # Local environment variables
├── .eslintrc.cjs             # ESLint configuration
├── .prettierrc               # Prettier configuration
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

### Reasoning Behind Structure

**1. `/api` directory:**
- Centralizes all backend communication
- Makes it easy to switch APIs or mock data
- Clear separation from business logic

**2. `/components` three-tier structure:**
- `common/`: Pure, reusable UI components (Button, Input, etc.)
- `layout/`: Application layout components (Header, Footer, etc.)
- `features/`: Domain-specific, smart components

**3. `/pages` as route containers:**
- Each page corresponds to a route
- Pages compose components, they don't contain complex logic
- Easy to add new pages without refactoring

**4. `/hooks` for reusability:**
- Extract common stateful logic
- Makes components cleaner
- Easy to test in isolation

**5. `/store` for global state:**
- Zustand stores are simple and performant
- Each store handles a specific domain
- Easy to scale as app grows

---

## 3. Core Configuration

### 3.1 Tailwind CSS Setup

```bash
# Initialize Tailwind
npx tailwindcss init -p
```

**`tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Main primary
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          500: '#a855f7',  // Main secondary
          900: '#581c87',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

**`src/styles/index.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply scroll-smooth;
  }
  
  body {
    @apply font-sans antialiased bg-gray-50 text-gray-900;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-display font-semibold;
  }
}

@layer components {
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }
  
  .btn-secondary {
    @apply bg-white hover:bg-gray-50 text-primary-600 font-medium py-2 px-4 rounded-lg border border-primary-300 transition-colors duration-200;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### 3.2 Environment Variables

**`.env.example`:**
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_TIMEOUT=10000

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true

# Application
VITE_APP_NAME=UK Transport Delay Predictor
VITE_APP_VERSION=1.0.0
```

**`.env.local`** (create this, not committed to git):
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_ENABLE_DEBUG=true
```

**Usage in code:**
```javascript
// src/constants/appConfig.js
export const APP_CONFIG = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  apiTimeout: import.meta.env.VITE_API_TIMEOUT,
  appName: import.meta.env.VITE_APP_NAME,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
```

### 3.3 ESLint Configuration

**`.eslintrc.cjs`:**
```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: '18.2',
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off', // If using TypeScript
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}
```

### 3.4 Prettier Configuration

**`.prettierrc`:**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 3.5 Vite Configuration

**`vite.config.js`:**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@api': path.resolve(__dirname, './src/api'),
      '@store': path.resolve(__dirname, './src/store'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
```

---

## 4. Routing Foundation

### 4.1 Route Constants

**`src/constants/routes.js`:**
```javascript
export const ROUTES = {
  // Public Routes
  HOME: '/',
  ABOUT: '/about',
  HOW_IT_WORKS: '/how-it-works',
  FEATURES: '/features',
  CONTACT: '/contact',
  
  // Auth Routes
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  
  // Protected Routes (Dashboard - for later)
  DASHBOARD: '/dashboard',
  PREDICTIONS: '/dashboard/predictions',
  ROUTES_SEARCH: '/dashboard/routes',
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',
  
  // Utility
  NOT_FOUND: '*',
};

export const isProtectedRoute = (pathname) => {
  return pathname.startsWith('/dashboard');
};
```

### 4.2 Router Configuration

**`src/router.jsx`:**
```javascript
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

// Layouts
import RootLayout from '@components/layout/RootLayout';
import DashboardLayout from '@components/layout/DashboardLayout';

// Public Pages
import LandingPage from '@pages/Landing';
import AboutPage from '@pages/About';
import HowItWorksPage from '@pages/HowItWorks';
import FeaturesPage from '@pages/Features';
import ContactPage from '@pages/Contact';

// Auth Pages
import LoginPage from '@pages/Auth/LoginPage';
import SignupPage from '@pages/Auth/SignupPage';
import ForgotPasswordPage from '@pages/Auth/ForgotPasswordPage';

// Dashboard Pages (for later)
// import DashboardPage from '@pages/Dashboard';
// import PredictionsPage from '@pages/Predictions';

// Utility Pages
import NotFoundPage from '@pages/NotFound';

// Protected Route Wrapper
import ProtectedRoute from '@components/common/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      // Public Routes
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.HOW_IT_WORKS,
        element: <HowItWorksPage />,
      },
      {
        path: ROUTES.FEATURES,
        element: <FeaturesPage />,
      },
      {
        path: ROUTES.CONTACT,
        element: <ContactPage />,
      },
      
      // Auth Routes
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <SignupPage />,
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
    ],
  },
  
  // Dashboard Routes (Protected) - FOR LATER
  // {
  //   path: ROUTES.DASHBOARD,
  //   element: (
  //     <ProtectedRoute>
  //       <DashboardLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     {
  //       index: true,
  //       element: <DashboardPage />,
  //     },
  //     {
  //       path: 'predictions',
  //       element: <PredictionsPage />,
  //     },
  //   ],
  // },
  
  // Catch-all 404
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);
```

### 4.3 Main App Entry

**`src/App.jsx`:**
```javascript
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import ErrorBoundary from '@components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
```

**`src/main.jsx`:**
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 4.4 Layout Components

**`src/components/layout/RootLayout/RootLayout.jsx`:**
```javascript
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

**`src/components/layout/RootLayout/index.js`:**
```javascript
export { default } from './RootLayout';
```

---

## 5. Component Architecture

### 5.1 Component Design Principles

**1. Single Responsibility:** Each component does one thing well
**2. Composition over Inheritance:** Build complex UIs from simple components
**3. Props Down, Events Up:** Unidirectional data flow
**4. Smart vs Dumb Components:**
   - **Container (Smart):** Handle logic, state, API calls
   - **Presentational (Dumb):** Receive props, render UI

### 5.2 Example Common Component

**`src/components/common/Button/Button.jsx`:**
```javascript
import { forwardRef } from 'react';
import { cn } from '@utils/cn';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-primary-600 border border-primary-300',
    outline: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
```

**`src/components/common/Button/index.js`:**
```javascript
export { default } from './Button';
```

### 5.3 Utility for Class Names

**`src/utils/cn.js`:**
```javascript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

### 5.4 Example Page Component

**`src/pages/Landing/LandingPage.jsx`:**
```javascript
import Hero from '@components/features/landing/Hero';
import Features from '@components/features/landing/Features';
import HowItWorks from '@components/features/landing/HowItWorks';
import CallToAction from '@components/features/landing/CallToAction';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
    </div>
  );
}
```

**`src/pages/Landing/index.js`:**
```javascript
export { default } from './LandingPage';
```

### 5.5 Example Feature Component

**`src/components/features/landing/Hero/Hero.jsx`:**
```javascript
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '@components/common/Button';
import { ROUTES } from '@constants/routes';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container-custom py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Never Miss Your Train Again
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 animate-fade-in delay-100">
            Predict transport delays before they happen. Smart, accurate, and built for UK commuters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
            <Button
              as={Link}
              to={ROUTES.SIGNUP}
              size="lg"
              variant="secondary"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              as={Link}
              to={ROUTES.HOW_IT_WORKS}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Learn How It Works
            </Button>
          </div>
        </div>
      </div>
      
      {/* Optional: Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] bg-center" />
      </div>
    </section>
  );
}
```

---

## 6. State Management

### 6.1 Why Zustand?

For this project, **Zustand** is recommended over Redux because:
- ✅ Simpler API (less boilerplate)
- ✅ Smaller bundle size
- ✅ No providers needed
- ✅ Easy to integrate with existing code
- ✅ Perfect for small to medium apps

### 6.2 Auth Store Example

**`src/store/authStore.js`:**
```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@api/services/authService';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const data = await authService.login(credentials);
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
          return data;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      signup: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const data = await authService.signup(userData);
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
          return data;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      logout: () => {
        authService.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
```

### 6.3 Using Store in Components

```javascript
import useAuthStore from '@store/authStore';

export default function LoginPage() {
  const { login, isLoading, error } = useAuthStore();
  
  const handleSubmit = async (formData) => {
    try {
      await login(formData);
      // Redirect to dashboard
    } catch (err) {
      // Error is already in store
    }
  };
  
  // Component JSX...
}
```

### 6.4 When to Use Different State Solutions

| Use Case | Solution | Example |
|----------|----------|---------|
| Component-local state | `useState` | Form input values, toggles |
| Derived state | `useMemo`, `useCallback` | Filtered lists, computations |
| Server state | React Query or SWR | API data, caching |
| Global app state | Zustand | Auth, theme, user preferences |
| URL state | React Router params/search | Filters, pagination |

---

## 7. Development Workflow

### 7.1 Running the Development Server

```bash
# Start dev server
npm run dev

# The app will open at http://localhost:3000
```

### 7.2 Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### 7.3 Linting & Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Run Prettier
npx prettier --write "src/**/*.{js,jsx,css,md}"
```

### 7.4 Git Workflow

**`.gitignore`:**
```
# Dependencies
node_modules/

# Production build
dist/

# Environment variables
.env.local
.env.*.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

**Recommended Commit Convention:**
```bash
# Feature
git commit -m "feat: add login page"

# Bug fix
git commit -m "fix: resolve authentication redirect issue"

# Documentation
git commit -m "docs: update README with setup instructions"

# Styling
git commit -m "style: improve responsive design for hero section"

# Refactor
git commit -m "refactor: extract form validation logic to hooks"
```

### 7.5 Package.json Scripts

**`package.json`:**
```json
{
  "name": "uk-transport-predictor",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext js,jsx --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,css,md}\""
  }
}
```

---

## 8. Best Practices & Guidelines

### 8.1 Component Best Practices

**✅ DO:**
```javascript
// Use descriptive names
function TransportDelayCard({ route, delay }) { ... }

// Destructure props
function Hero({ title, subtitle }) { ... }

// Use prop types or TypeScript
function Button({ variant = 'primary', children }) { ... }

// Extract complex logic to hooks
function usePrediction(routeId) { ... }

// Keep components small and focused
function FeatureCard({ icon, title, description }) { ... }
```

**❌ DON'T:**
```javascript
// Avoid deeply nested components
// Avoid putting API calls directly in components
// Don't use inline styles (use Tailwind)
// Avoid useState for derived values (use useMemo)
```

### 8.2 Performance Optimization

```javascript
// 1. Lazy load routes
const DashboardPage = lazy(() => import('@pages/Dashboard'));

// 2. Memoize expensive computations
const filteredRoutes = useMemo(() => {
  return routes.filter(route => route.delay > 5);
}, [routes]);

// 3. Debounce search inputs
const debouncedSearch = useDebounce(searchTerm, 300);

// 4. Use React.memo for pure components
export default React.memo(FeatureCard);
```

### 8.3 API Integration Pattern

**`src/api/client.js`:**
```javascript
import axios from 'axios';
import { APP_CONFIG } from '@constants/appConfig';
import useAuthStore from '@store/authStore';

const apiClient = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: APP_CONFIG.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default apiClient;
```

**`src/api/services/authService.js`:**
```javascript
import apiClient from '../client';

export const authService = {
  login: async (credentials) => {
    return await apiClient.post('/auth/login', credentials);
  },
  
  signup: async (userData) => {
    return await apiClient.post('/auth/signup', userData);
  },
  
  logout: () => {
    // Clear local storage, etc.
    localStorage.removeItem('auth-storage');
  },
  
  getCurrentUser: async () => {
    return await apiClient.get('/auth/me');
  },
};
```

### 8.4 Custom Hook Example

**`src/hooks/useAuth.js`:**
```javascript
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@store/authStore';
import { ROUTES } from '@constants/routes';

export default function useAuth() {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, logout, signup } = useAuthStore();

  const handleLogin = async (credentials) => {
    await login(credentials);
    navigate(ROUTES.DASHBOARD);
  };

  const handleSignup = async (userData) => {
    await signup(userData);
    navigate(ROUTES.DASHBOARD);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
  };
}
```

### 8.5 Error Boundary

**`src/components/common/ErrorBoundary/ErrorBoundary.jsx`:**
```javascript
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry for the inconvenience. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### 8.6 Accessibility Guidelines

```javascript
// Always use semantic HTML
<nav> not <div>
<button> not <div onClick>

// Add ARIA labels
<button aria-label="Close menu">×</button>

// Ensure keyboard navigation
<a href="#main" className="sr-only">Skip to main content</a>

// Use proper heading hierarchy
<h1> → <h2> → <h3> (don't skip levels)

// Provide alt text for images
<img src="..." alt="UK transport map showing delay predictions" />
```

---

## 9. Next Steps

### Phase 1: Landing Pages (Current Focus)

1. **Set up project structure** (this guide)
2. **Create static pages:**
   - Landing page with Hero, Features, How It Works
   - About page
   - Features page
   - Contact page
3. **Build authentication pages:**
   - Login page
   - Signup page
   - Forgot password page
4. **Test responsiveness** across devices

### Phase 2: Dashboard (Later)

1. Add protected routes
2. Create dashboard layout
3. Build prediction components
4. Integrate with ML backend
5. Add data visualization

---

## 10. Quick Reference Cheat Sheet

### Adding a New Page

```bash
# 1. Create page component
mkdir src/pages/NewPage
touch src/pages/NewPage/NewPage.jsx
touch src/pages/NewPage/index.js

# 2. Add route constant in src/constants/routes.js
export const ROUTES = {
  ...
  NEW_PAGE: '/new-page',
}

# 3. Add route in src/router.jsx
{
  path: ROUTES.NEW_PAGE,
  element: <NewPage />,
}

# 4. Add navigation link in Header component
<Link to={ROUTES.NEW_PAGE}>New Page</Link>
```

### Adding a New Component

```bash
# Create component folder
mkdir -p src/components/common/NewComponent
touch src/components/common/NewComponent/NewComponent.jsx
touch src/components/common/NewComponent/index.js

# Use in pages
import NewComponent from '@components/common/NewComponent';
```

### Adding API Endpoint

```javascript
// 1. Add to src/api/services/newService.js
export const newService = {
  getData: () => apiClient.get('/endpoint'),
};

// 2. Use in component
import { newService } from '@api/services/newService';
const data = await newService.getData();
```

---

## Conclusion

This setup guide provides a **production-ready, scalable foundation** for your UK Transport Delay Predictor project. The structure supports:

- ✅ Easy addition of new pages (10-15+ without refactoring)
- ✅ Clear separation of concerns
- ✅ Maintainable and testable code
- ✅ Modern development practices
- ✅ Excellent developer experience

**You're now ready to start building!** 🚀

---

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Router v6](https://reactrouter.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Lucide Icons](https://lucide.dev/)
