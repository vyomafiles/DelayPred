# Implementation Details & Developer Guide

## Project Structure

```
vyoma/
├── public/
│   ├── favicon.ico
│   ├── images/
│   └── transport-icons/
├── src/
│   ├── api/
│   │   ├── client.js
│   │   ├── endpoints.js
│   │   └── services/
│   │       ├── authService.js
│   │       ├── predictionService.js
│   │       └── routeService.js
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Spinner/
│   │   │   └── ErrorBoundary/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── PageLayout/
│   │   └── features/
│   │       └── landing/
│   │           ├── Hero/
│   │           ├── Features/
│   │           ├── HowItWorks/
│   │           ├── Testimonials/
│   │           ├── Pricing/
│   │           └── CTA/
│   ├── constants/
│   │   ├── routes.js
│   │   ├── appConfig.js
│   │   ├── apiEndpoints.js
│   │   └── validationSchemas.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useApi.js
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   └── usePrediction.js
│   ├── pages/
│   │   ├── Landing/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   └── NotFound/
│   ├── store/
│   │   ├── authStore.js
│   │   ├── predictionStore.js
│   │   └── uiStore.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── animations.css
│   │   └── variables.css
│   ├── utils/
│   │   ├── cn.js
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   ├── helpers.js
│   │   └── dateUtils.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .env.local
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Component Architecture

### Layered Component Structure

```
Pages (Route Containers)
    ↓
PageLayout (Header + Footer wrapper)
    ↓
Feature Components (Features, HowItWorks, etc.)
    ↓
Layout Components (Header, Footer)
    ↓
Common Components (Button, Card, Input, etc.)
```

### Component Composition Example

```jsx
// LandingPage.jsx - Combines all landing page sections
export function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
    </>
  );
}

// App.jsx - Wraps with PageLayout
<Route
  path="/"
  element={
    <PageLayout>
      <LandingPage />
    </PageLayout>
  }
/>;
```

## State Management with Zustand

### Store Structure

```javascript
// stores/authStore.js
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email, password) => {
    /* ... */
  },
  logout: () => {
    /* ... */
  },
}));

// Usage in component
const { user, isAuthenticated, login } = useAuthStore();
```

### Store Types

1. **authStore.js**: User authentication state
2. **predictionStore.js**: Prediction management
3. **uiStore.js**: UI state (modals, notifications)

## Styling Architecture

### Tailwind CSS Layers

```css
@layer base {
} /* Base HTML elements */
@layer components {
} /* Reusable component classes */
@layer utilities {
} /* Custom utility classes */
```

### Custom Components in Tailwind

```css
@layer components {
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white /* ... */;
  }
}
```

## API Integration Layer

### Client Configuration

```javascript
// api/client.js
const client = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: APP_CONFIG.apiTimeout,
});

client.interceptors.request.use(/* add auth token */);
client.interceptors.response.use(/* handle errors */);
```

### Service Layer

```javascript
// api/services/predictionService.js
export const predictionService = {
  create: (data) => client.post(API_ENDPOINTS.PREDICTIONS.CREATE, data),
  list: (params) => client.get(API_ENDPOINTS.PREDICTIONS.LIST, { params }),
  get: (id) => client.get(API_ENDPOINTS.PREDICTIONS.GET.replace(':id', id)),
};
```

### Usage in Components

```javascript
const { data, loading, error, execute } = useApi(predictionService.list);

useEffect(() => {
  execute();
}, []);
```

## Routing Structure

### Route Configuration

```javascript
// constants/routes.js
export const ROUTES = {
  HOME: '/',
  AUTH_LOGIN: '/auth/login',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '/404',
};

// App.jsx
<Routes>
  <Route
    path={ROUTES.HOME}
    element={
      <PageLayout>
        <LandingPage />
      </PageLayout>
    }
  />
  <Route
    path={ROUTES.NOT_FOUND}
    element={
      <PageLayout>
        <NotFoundPage />
      </PageLayout>
    }
  />
</Routes>;
```

## Environment Variables

### Configuration

```env
# .env.example
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_TIMEOUT=10000
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
VITE_APP_NAME=UK Transport Delay Predictor
VITE_APP_VERSION=1.0.0
```

### Usage

```javascript
// constants/appConfig.js
export const APP_CONFIG = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
```

## Custom Hooks

### useAuth Hook

```javascript
export function useAuth() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  return { user, isAuthenticated, login, logout };
}

// Usage
const { user, logout } = useAuth();
```

### useApi Hook

```javascript
const { data, loading, error, execute } = useApi(apiFunction);

// Automatically handles loading, error, and data states
```

### useDebounce Hook

```javascript
const debouncedValue = useDebounce(searchInput, 300);

// Used for search inputs to avoid excessive API calls
```

## Component Best Practices

### Button Component Example

```jsx
// components/common/Button/Button.jsx
export const Button = React.forwardRef(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    />
  )
);

// Usage
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>;
```

### Card Component Example

```jsx
// components/common/Card/Card.jsx
export const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div className={cn('rounded-lg border bg-white', className)} {...props}>
    {children}
  </div>
));

// Usage
<Card className="p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>;
```

## Form Handling

### React Hook Form Integration

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../constants/validationSchemas';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

## Error Handling

### ErrorBoundary Component

```jsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### API Error Handling

```javascript
try {
  const data = await predictionService.create(formData);
} catch (error) {
  setError(error.response?.data?.message || 'An error occurred');
}
```

## Performance Optimization

### Code Splitting

```javascript
// Lazy load route components
const Dashboard = lazy(() => import('../pages/Dashboard'));

<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>;
```

### Memoization

```javascript
// Memoize expensive components
export const HeroSection = memo(function Hero() {
  return <div>...</div>;
});
```

### Image Optimization

```jsx
<img src="/image.jpg" alt="Description" loading="lazy" width="800" height="600" />
```

## Testing Strategy

### Component Tests

```javascript
// Button.test.jsx
describe('Button Component', () => {
  it('renders with primary variant', () => {
    render(<Button variant="primary">Click</Button>);
    expect(screen.getByText('Click')).toBeInTheDocument();
  });
});
```

## Build & Deployment

### Build Process

```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

### Build Output

- Optimized bundles in `/dist`
- Source maps for debugging
- CSS minified and inlined

## Development Workflow

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Git Workflow

```bash
# Feature branch
git checkout -b feature/new-feature

# Commit changes
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

## Debugging

### React DevTools

- Install React DevTools extension
- Inspect component props and state
- Trace component renders

### Network Debugging

- Use Browser DevTools Network tab
- Monitor API calls and responses
- Check performance metrics

### Console Logging

```javascript
if (APP_CONFIG.enableDebug) {
  console.log('Debug info:', data);
}
```

## Future Enhancements

### Phase 2

- [ ] Implement authentication pages
- [ ] Add dashboard with predictions
- [ ] Real-time delay notifications

### Phase 3

- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Integration with transit APIs

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)
