# Connected-in-Start Project Overview

## Project Purpose

A TanStack-based web application with authentication setup using better-auth and shadcn/ui components.

## Tech Stack

- **Framework**: TanStack Start (React SSR framework)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: better-auth with email/password
- **UI**: shadcn/ui components with Radix UI + Tailwind CSS
- **State Management**: TanStack Query + TanStack Store
- **Routing**: TanStack Router (file-based)
- **Styling**: Tailwind CSS v4
- **Type Safety**: TypeScript with Zod validation
- **Environment**: @t3-oss/env-core
- **Package Manager**: pnpm

## Current Auth Setup Status

- better-auth server configuration in `src/lib/auth.ts`
- Auth client setup in `src/lib/auth-client.ts`
- Database schema for users, sessions, accounts, verifications
- API route handler at `/api/auth/$`
- Environment variables configured for auth

## Code Style & Conventions

- No semicolons, single quotes, trailing commas
- PascalCase components, kebab-case files
- Use `@/*` path aliases for src imports
- Use `interface` for object shapes, `type` for unions/utilities
- Use `cn()` utility for CSS classes
- Export functions and types separately

## Development Commands

- `pnpm dev` - Development server (port 3000)
- `pnpm build` - Production build
- `pnpm test` - Run tests (Vitest)
- `pnpm lint` - ESLint
- `pnpm format` - Prettier
- `pnpm check` - Format + lint
- `pnpm typecheck` - TypeScript check
- `pnpm db:generate` - Generate DB migrations
- `pnpm db:migrate` - Run migrations
- `pnpm db:studio` - Drizzle Studio

## Project Structure

- `src/routes/` - File-based routing
- `src/components/ui/` - shadcn/ui components
- `src/lib/` - Utilities and auth
- `src/db/schema/` - Database schemas
- `src/integrations/` - TanStack integrations
- `drizzle/` - Database migrations
