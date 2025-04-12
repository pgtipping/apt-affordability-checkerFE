# Technical Context: Apartment Cost Analyzer [Updated: 2025-04-12]

## Core Technologies

- **Framework**: Next.js 14+ (React 18+)
- **Bundler**: Next.js built-in (replaces Webpack/CRA)
- **Styling**: CSS Modules, global styles in `styles/globals.css`
- **Testing**: Jest + React Testing Library
- **View Components**: Specialized components like RentEstimateView

## Development Setup

- **Node.js**: Required (version specified in package.json)
- **Package Manager**: npm (lock file present)
- **Scripts**:
  - `dev`: Next.js development server (serves frontend and API routes)
  - `build`: Next.js production build
  - `start`: Next.js production server
  - `test`: Run tests (Jest)
  - `lint`: Next.js linting

## Key Dependencies

- **next**: ^14.x
- **react**: ^18.x
- **react-dom**: ^18.x
- **web-vitals**: ^2.x
- **recharts**: For RentEstimateView charting
- **bootstrap**: For UI styling

## Technical Constraints

- **Browser Support**: Modern browsers (ES6+)
- **Performance**: Client-side calculations only
- **State Management**: Context API only (no Redux)
- **Styling**: No CSS-in-JS libraries detected
- **Serverless Considerations**:
  - All backend logic is implemented as Next.js API routes in `pages/api/`
  - Environment variables for API keys are managed via `.env.local` and Vercel dashboard

## Project Structure

- **pages/**: Next.js pages and API routes
  - `pages/index.js`: Main app entry point
  - `pages/_app.js`: Global providers and styles
  - `pages/api/`: Serverless API endpoints (migrated from `/api`)
- **components/**: All React components, including forms and views
- **context/**: Context API providers (FormContext)
- **services/**: Service modules (e.g., AIService, LocationService)
- **styles/**: Global and module CSS
- **public/**: Static assets

## Path Aliases

- Configured in `jsconfig.json` for robust, absolute imports:
  - `@/components/*`
  - `@/context/*`
  - `@/services/*`
  - `@/styles/*`
  - `@/utils/*`

## Development Practices

- **Component Structure**: Atomic design principles
- **Testing**: Component tests in **tests** folders
- **Code Quality**: ESLint + Prettier likely configured
- **New View Components**:
  - Follow existing patterns
  - Maintain separation of concerns
  - Use CSS Modules for styling
