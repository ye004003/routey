# ROUTEY - Travel/Location Discovery App

## Overview

ROUTEY is a mobile-first travel and location discovery application built as a single-page React application with an Express backend. The app appears designed to help users explore destinations, activities, and routes in Korea (based on stock images referencing Korean locations like palaces, cafes, and Han River).

The application follows a client-server architecture with a shared schema layer, using TypeScript throughout the entire stack.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming, supporting light/dark modes
- **Build Tool**: Vite with HMR support

The frontend is located in `client/` with path aliases:
- `@/*` → `./client/src/*`
- `@shared/*` → `./shared/*`
- `@assets` → `./attached_assets`

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with tsx for development
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Storage**: Abstracted storage interface (`IStorage`) with in-memory implementation (`MemStorage`) - designed to be swapped for database storage

The server handles both API routes and serves the static frontend in production.

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Validation**: Zod schemas generated from Drizzle schemas via `drizzle-zod`
- **Migrations**: Output to `./migrations` directory

Current schema includes a basic `users` table with id, username, and password fields.

### Build System
- **Development**: Vite dev server with Express backend running together
- **Production Build**: 
  - Client: Vite builds to `dist/public`
  - Server: esbuild bundles to `dist/index.cjs` with selective dependency bundling for faster cold starts

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI/Component Libraries
- **Radix UI**: Full suite of accessible, unstyled primitives
- **shadcn/ui**: Pre-styled components using Radix + Tailwind
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel/slider functionality
- **cmdk**: Command palette component
- **Vaul**: Drawer component
- **react-day-picker**: Calendar/date picker

### Form & Validation
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Zod resolver for form validation
- **Zod**: Schema validation

### Replit-Specific Plugins
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicator