# React Admin Dashboard

Production-style admin dashboard built with React, TypeScript, TanStack Query, Axios interceptors, and shadcn-style UI components.

## Live Deployment

- Vercel: https://react-admin-dashboard-nu-virid.vercel.app/

## Live Features

- User listing from `dummyjson.com`
- Debounced search
- Pagination (server-driven)
- Server-side sorting via table headers (`sortBy` + `order`)
- Dark/light mode toggle with persistent theme mode
- Centralized theme token store in one file (`src/app/theme-store.tsx`)
- Centralized route definitions in `src/app/router.tsx`
- User detail dialog + dedicated route page (`/user/:id`)
- Loading, error, and empty states
- Global error boundary fallback
- Lazy-loaded pages for route-level code splitting

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
  components/theme/    # theme toggle UI
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
- API modules are split by domain and consumed through TanStack Query hooks.

3. Feature-first structure
- User-related code is grouped together in `src/features/users`, making it easier to scale new domains later.

4. Centralized theming
- Brand colors and dark/light mode tokens are managed from one place (`src/app/theme-store.tsx`).

5. Global error handling
- Error boundary prevents total app crash and shows fallback UI.
- Query client logs errors globally.

## Performance Considerations

- Debounced search (`useDebounce`) to reduce unnecessary calls
- Server pagination to avoid loading large datasets
- API-level sorting to avoid client-side re-sorting on large data
- `keepPreviousData` for smoother page transitions
- Route-level lazy loading via `React.lazy`
- Memoized user table component to reduce re-renders
- Shimmer skeleton loaders for table and detail page

## Assumptions / Trade-offs

- DummyJSON API is used for speed and predictable pagination/search behavior.
- Routes include dashboard (`/`) and user details (`/user/:id`).
- File sizes are kept small and modular so each unit remains easy to review and maintain.

## Deployment Notes

- Live URL: https://react-admin-dashboard-nu-virid.vercel.app/
- Deploy target: Vercel or Netlify.
- For multi-route SPAs, configure a rewrite to `index.html` to avoid refresh 404s.
- Ensure environment variable `VITE_API_BASE_URL` is set in deployment settings.
