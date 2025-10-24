# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Payload CMS 3.x template built on Next.js 15. It uses SQLite as the database adapter and includes a minimal setup with Users (auth-enabled) and Media (uploads) collections.

## Development Commands

### Running the application

- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm devsafe` - Clean rebuild (removes .next directory and starts dev server)
- `pnpm build` - Production build
- `pnpm start` - Start production server

### Testing

- `pnpm test` - Run all tests (integration + e2e)
- `pnpm test:int` - Run integration tests only (Vitest)
- `pnpm test:e2e` - Run end-to-end tests (Playwright)

Integration tests are located in `tests/int/**/*.int.spec.ts` and use Vitest with jsdom.
E2E tests are located in `tests/e2e/**/*.e2e.spec.ts` and use Playwright.

### Code quality

- `pnpm lint` - Run ESLint

### Payload utilities

- `pnpm generate:types` - Regenerate TypeScript types from Payload config (outputs to `src/payload-types.ts`)
- `pnpm generate:importmap` - Generate import map for admin panel
- `pnpm payload` - Access Payload CLI

## Architecture

### Next.js App Router Structure

The project uses Next.js App Router with route groups to separate concerns:

- **(frontend)** route group: Public-facing pages
  - `src/app/(frontend)/page.tsx` - Homepage
  - `src/app/(frontend)/layout.tsx` - Frontend layout

- **(payload)** route group: Admin panel and API routes
  - `src/app/(payload)/admin/[[...segments]]/page.tsx` - Admin panel (catch-all route)
  - `src/app/(payload)/api/[...slug]/route.ts` - Payload REST API
  - `src/app/(payload)/api/graphql/route.ts` - GraphQL API endpoint
  - `src/app/(payload)/api/graphql-playground/route.ts` - GraphQL playground

### Payload Configuration

Main config: `src/payload.config.ts`

- Uses SQLite adapter (configured via `DATABASE_URI` env var)
- Lexical rich text editor
- Sharp for image processing
- Collections are imported from `src/collections/`

### Collections

Collections are defined in `src/collections/` directory:

- `Users.ts` - Auth-enabled collection with email as title field
- `Media.ts` - Upload collection with public read access and required alt text

Each collection exports a `CollectionConfig` object that defines the schema, access control, hooks, and other configuration.

### TypeScript Path Aliases

- `@/*` → `./src/*`
- `@payload-config` → `./src/payload.config.ts`

### Generated Files

- `src/payload-types.ts` - Auto-generated TypeScript types from Payload collections (regenerate with `pnpm generate:types`)
- `src/app/(payload)/admin/importMap.js` - Auto-generated import map for admin UI

**Note:** Currently, `src/payload-types.ts` shows as modified in git. This is normal during development as it regenerates when collections change.

## Environment Variables

Required variables (see `.env.example`):

- `DATABASE_URI` - SQLite database connection string (e.g., `file:./local.db` or MongoDB URI if switching adapters)
- `PAYLOAD_SECRET` - Secret key for Payload auth and encryption

## Package Manager

This project uses pnpm (version 9 or 10 required). Node.js 18.20.2+ or 20.9.0+ is required.

## Database

Currently configured to use SQLite via `@payloadcms/db-sqlite`. The example env shows MongoDB URI format, but the actual config uses SQLite adapter. If using MongoDB, the adapter needs to be changed in `src/payload.config.ts`.
