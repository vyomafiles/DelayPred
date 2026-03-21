# UK Transport Delay Predictor

A React-based web application for predicting transport delays in the UK.

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` file (copy from `.env.example`):

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Project Structure

- `/src/api` - API client and service definitions
- `/src/components` - React components (common, layout, features)
- `/src/constants` - Application constants
- `/src/hooks` - Custom React hooks
- `/src/pages` - Page components
- `/src/store` - Zustand state management
- `/src/styles` - Global styles and CSS
- `/src/utils` - Utility functions

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier

## Technologies

- React 18
- Vite
- Tailwind CSS
- React Router
- Zustand
- React Hook Form
- Axios

## License

MIT
