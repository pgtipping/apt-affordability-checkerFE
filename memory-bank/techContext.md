# Technical Context: Apartment Cost Analyzer [Updated: 2025-04-11 04:11 AM]

## Core Technologies

- **Frontend Framework**: React 17+
- **Bundler**: Webpack (via Create React App)
- **Styling**: CSS Modules
- **Testing**: Jest + React Testing Library
- **View Components**: Specialized components like RentEstimateView

## Development Setup

- **Node.js**: Required (version specified in package.json)
- **Package Manager**: npm (lock file present)
- **Scripts**:
  - `start`: Development server
  - `build`: Production build
  - `test`: Run tests
  - `eject`: Eject from CRA

## Key Dependencies

- **react**: ^17.0.2
- **react-dom**: ^17.0.2
- **react-scripts**: 4.0.3
- **web-vitals**: ^1.0.1
- **Potential New Dependencies**:
  - Charting library (for RentEstimateView)
  - Serverless framework (for migration)

## Technical Constraints

- **Browser Support**: Modern browsers (ES6+)
- **Performance**: Client-side calculations only
- **State Management**: Context API only (no Redux)
- **Styling**: No CSS-in-JS libraries detected
- **Serverless Considerations**:
  - Must maintain current frontend functionality
  - Need to handle AI service endpoints

## Development Practices

- **Component Structure**: Atomic design principles
- **Testing**: Component tests in **tests** folders
- **Code Quality**: ESLint + Prettier likely configured
- **New View Components**:
  - Follow existing patterns
  - Maintain separation of concerns
  - Use CSS Modules for styling
