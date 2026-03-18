# React Admin Dashboard

Production-style admin dashboard built with React, TypeScript, TanStack Query, Axios interceptors, and shadcn-style UI components.

## Live Features

- User listing from `dummyjson.com`
- Debounced search
- Pagination (server-driven)
- User detail dialog
- Loading, error, and empty states
- Global error boundary fallback
- Lazy-loaded page for route-level code splitting

## Tech Stack

- React + TypeScript + Vite
- TanStack Query (state + async cache)
- Axios (interceptors for request/response logging and error normalization)
- React Router
- Tailwind CSS + shadcn-style component primitives
- Radix Dialog

## Folder Structure

```text
src/
  app/                 # app-level providers and error boundary
  components/ui/       # shadcn-style reusable UI primitives
  features/users/      # user domain logic (types, hooks, feature UI)
  hooks/               # shared hooks (debounce)
  lib/api/             # axios client + API modules
  pages/               # route pages (lazy-loaded)
```

## Environment Variables

Create `.env` from `.env.example`:

```bash
VITE_API_BASE_URL=https://dummyjson.com
```

## Setup

```bash
npm install
npm run dev
```

## Build & Quality

```bash
npm run lint
npm run build
npm run preview
```

## Architecture Decisions

1. TanStack Query for state management
- Handles caching, refetching, stale data, and loading/error states with less boilerplate than Context or Redux for this use case.

2. API layer separated from UI
- Axios client and interceptors live in `src/lib/api` so components stay presentation-focused.

3. Feature-first structure
- User-related code is grouped together in `src/features/users`, making it easier to scale new domains later.

4. Global error handling
- Error boundary prevents total app crash and shows fallback UI.
- Query client logs errors globally.

## Performance Considerations

- Debounced search (`useDebounce`) to reduce unnecessary calls
- Server pagination to avoid loading large datasets
- `keepPreviousData` for smoother page transitions
- Route-level lazy loading via `React.lazy`
- Memoized user table component to reduce re-renders

## Assumptions / Trade-offs

- DummyJSON API is used for speed and predictable pagination/search behavior.
- One primary dashboard route is implemented for this assignment scope.
- File sizes are kept small and modular so each unit remains easy to review and maintain.

## Deployment Notes

- Deploy to Vercel or Netlify.
- For multi-route SPAs, configure a rewrite to `index.html` to avoid refresh 404s.
- Ensure environment variable `VITE_API_BASE_URL` is set in deployment settings.
