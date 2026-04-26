# Kohi Coffee

Kohi Coffee is a polished React + Vite demo for AI-assisted coffee bean analysis. The app lets you upload a bean photo, add roast metadata, run a simulated analysis, and review a detailed results report with quality scoring, defect insights, flavor predictions, and brew recommendations.

## Features

- Landing page with product-style marketing content and clear calls to action.
- Image upload flow with drag-and-drop support and roast metadata fields.
- Animated analysis screen that simulates step-by-step inspection.
- Results dashboard with quality scoring, defect summaries, a flavor radar chart, and brew recipe guidance.
- Batch history dashboard for browsing previous scans.
- Local session persistence for pending scans and saved analysis history.

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- shadcn/ui components
- Recharts
- Sonner

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- Bun or npm

### Install dependencies

```bash
bun install
```

If you prefer npm:

```bash
npm install
```

### Run the app locally

```bash
bun dev
```

Or with npm:

```bash
npm run dev
```

## Available Scripts

- `bun dev` or `npm run dev` - start the development server.
- `bun build` or `npm run build` - create a production build.
- `bun preview` or `npm run preview` - preview the production build locally.
- `bun lint` or `npm run lint` - run ESLint across the project.
- `bun test` or `npm run test` - run the Vitest test suite.
- `bun test:watch` or `npm run test:watch` - run tests in watch mode.

## Project Structure

- `src/pages` - route-level screens for the landing flow, upload flow, analysis, results, and dashboard.
- `src/components` - shared layout pieces and UI primitives.
- `src/lib` - mock analysis generation, storage helpers, type definitions, and shared utilities.
- `src/test` - test setup and example tests.

## Notes

- The analysis flow currently uses mock data generated in the browser to keep the experience fast and self-contained.
- Uploaded images and analysis results are stored locally in session storage and browser storage for the duration of the demo.
