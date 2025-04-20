# Create React App Vite [![Typecheck](https://github.com/bbkpr/instamunchadmin/actions/workflows/typecheck.yml/badge.svg)](https://github.com/bbkpr/instamunchadmin/actions/workflows/typecheck.yml) [![Test](https://github.com/bbkpr/instamunchadmin/actions/workflows/test.yml/badge.svg)](https://github.com/bbkpr/instamunchadmin/actions/workflows/test.yml) [![Build](https://github.com/bbkpr/instamunchadmin/actions/workflows/build.yml/badge.svg)](https://github.com/bbkpr/instamunchadmin/actions/workflows/build.yml) [![Lint](https://github.com/bbkpr/instamunchadmin/actions/workflows/lint.yml/badge.svg)](https://github.com/bbkpr/instamunchadmin/actions/workflows/lint.yml)

### pnpm

```sh
cd myapp
pnpm install
pnpm validate
pnpm start
```

### Commands

```sh
pnpm dev             # start development server
pnpm start           # start development server
pnpm validate        # run test,lint,build,typecheck concurrently
pnpm test            # run vitest
pnpm test:ui         # run vitest with a web UI
pnpm test:watch      # run vitest in watch mode
pnpm lint            # run eslint
pnpm lint:fix        # run eslint with --fix option
pnpm typecheck       # run TypeScript compiler check
pnpm build           # build production bundle to 'dist' directly
pnpm prettier        # run prettier for json|yml|css|md|mdx files
pnpm clean           # remove 'node_modules' 'yarn.lock' 'dist' completely
pnpm serve           # launch server for production bundle in local
```

# Project Structure

The InstaMunch Admin frontend is a React application built with Vite and TypeScript that provides a management interface for the InstaMunch vending machine system.

## Key Directories

- `src/`: Contains the application source code:
  - `components/`: Reusable UI components
  - `contexts/`: React context providers
  - `graphql/`: GraphQL queries, mutations, and Apollo client setup
  - `hooks/`: Custom React hooks
  - `pages/`: Page components organized by feature
  - `styles/`: CSS and styling files
  - `utils/`: Utility functions
  - `generated/`: Auto-generated GraphQL types and operations
- `public/`: Static assets
- `mocks/`: Mock data for testing and development

## Technologies Used

- React with TypeScript
- Apollo Client for GraphQL data fetching
- React Router for navigation
- Vite for fast development and building
- Vitest for testing

# Integration with Backend

The InstaMunch Admin frontend connects to the InstaMunch backend through its GraphQL API.

## Setup Requirements

1. Ensure the backend is running (see the backend README.md for setup instructions)
2. Copy `.env.sample` to `.env` and set the correct environment variables
3. Set `VITE_GRAPHQL_URI` to match your backend GraphQL endpoint (default: http://localhost:4000)

## Backend Integration Details

- **GraphQL Connection**: The admin panel connects to the backend GraphQL API via Apollo Client (configured in `src/graphql/apolloClient.ts`)
- **Authentication**:
  - JWT tokens are used for authentication
  - Tokens are stored in the browser's localStorage
  - The Apollo Client adds the token to the Authorization header for all requests
- **Code Generation**:
  - Run `pnpm run codegen` to generate TypeScript types from the backend GraphQL schema
  - This ensures type safety between frontend and backend

## Role-Based Access Control

The admin interface respects the permission system defined in the backend:

- Different UI elements are conditionally rendered based on the user's permissions
- The backend's `@requirePermission` directive ensures unauthorized actions are blocked
- Available roles include:
  - TECHNICIAN: Managing machine inventory
  - OPERATOR: Managing machines and items
  - ADMINISTRATOR: Full system access

## Developing Against the Backend

To work effectively with the backend:

1. Start the backend server first (`npm start` in the backend directory)
2. Start the frontend development server (`pnpm dev`)
3. Changes to the GraphQL schema require running `pnpm run codegen` to update TypeScript types
4. The Apollo Client DevTools extension for Chrome/Firefox is helpful for debugging GraphQL operations
