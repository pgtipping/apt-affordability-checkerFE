# System Patterns: Apartment Cost Analyzer [Updated: 2025-04-12]

## Architectural Patterns

- **Component-Based Architecture**:
  - Clear separation between presentation and logic
  - Reusable form input components
  - Dedicated view components for results display
  - Specialized view components like RentEstimateView
  - Next.js Pages Router

## State Management

- **Context API**:
  - Central FormContext manages all application state
  - Provided in `pages/_app.js`
  - Provides state and handlers to child components
  - Follows React's unidirectional data flow
  - Extended to support rent estimation data

## Form Handling

- **Modular Input Components**:
  - Each input type has its own component
  - Consistent props interface
  - Located in `components/forms/`
  - Connected to FormContext for state management

## Component Relationships

```mermaid
flowchart TD
    _app[pages/_app.js] --> index[pages/index.js]
    _app --> FormContext[FormContext.js]
    index --> Form[FormComponent.js]
    index --> Results[Results.js]

    Form --> Inputs[Various Input Components]
    FormContext --> Form
    FormContext --> Results
    Results --> Affordability[Affordability.js]
    Results --> CostDetails[CostDetails.js]
    Results --> RentEstimate[RentEstimateView.js]
```

## Design Principles

- **Single Responsibility**: Each component handles one specific task
- **Composition**: Complex components built from simpler ones
- **Consistent Styling**: CSS modules for component-specific styles
- **Extensibility**: New view components can be added without breaking existing ones
- **Path Aliases**: Used for all internal imports (e.g. `@/components`)
