# To-Do List Web Application

## Overview

A modern, full-stack to-do list application built with React, Express, and TypeScript. The application provides a clean, productivity-focused interface for managing daily tasks with features for adding, completing, and deleting tasks. Built using a RESTful API architecture with shadcn/ui components for a polished user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing (instead of React Router)

**UI Component System:**
- shadcn/ui component library (New York style variant)
- Radix UI primitives for accessible, unstyled component foundations
- Tailwind CSS for utility-first styling with custom design tokens
- Design follows productivity app patterns (Todoist, Things, Microsoft To-Do)

**State Management:**
- TanStack Query (React Query) v5 for server state management
- Custom query client configuration with specific error handling
- Optimistic updates and automatic cache invalidation on mutations

**Styling Approach:**
- Tailwind CSS with custom configuration for design system consistency
- CSS variables for theming (light/dark mode support)
- Custom elevation system (elevate-1, elevate-2) for hover/active states
- System font stack (Inter, SF Pro, Segoe UI)

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- ESM module system throughout the application
- Custom middleware for request logging and JSON parsing with raw body capture

**API Design:**
- RESTful endpoints under `/api` namespace
- Standard CRUD operations for task management:
  - GET `/api/tasks` - Retrieve all tasks
  - POST `/api/tasks` - Create new task
  - PUT `/api/tasks/:id` - Update existing task
  - DELETE `/api/tasks/:id` - Delete task

**Data Validation:**
- Zod for runtime type validation
- Schema validation integrated with Drizzle ORM
- Type-safe request/response handling

**Storage Layer:**
- Abstracted storage interface (IStorage) for flexibility
- In-memory storage implementation (MemStorage) as default
- Prepared for PostgreSQL integration via Drizzle ORM
- UUID-based task identification

### Data Schema

**Task Entity:**
```typescript
{
  id: string (UUID)
  text: string (required)
  completed: boolean (default: false)
}
```

**Schema Management:**
- Drizzle ORM for database schema definition
- PostgreSQL dialect configured
- Migration support via drizzle-kit
- Type-safe database queries with automatic TypeScript inference

### External Dependencies

**Database:**
- Configured for PostgreSQL via `@neondatabase/serverless`
- Connection string expected in `DATABASE_URL` environment variable
- Drizzle ORM as the query builder and migration tool

**UI Component Libraries:**
- Radix UI - Comprehensive set of accessible component primitives
- Lucide React - Icon library for consistent iconography
- class-variance-authority - For managing component variants
- tailwind-merge & clsx - For conditional className composition

**Development Tools:**
- Replit-specific plugins for development:
  - Runtime error modal overlay
  - Cartographer (code mapping)
  - Development banner
- esbuild for production server bundling
- tsx for TypeScript execution in development

**Form & Data Handling:**
- React Hook Form with Hookform Resolvers for form state management
- date-fns for date manipulation utilities
- Zod for schema validation across frontend and backend

### Build & Deployment

**Development Mode:**
- Vite dev server with HMR (Hot Module Replacement)
- Express server runs with tsx for TypeScript execution
- Concurrent client and server development

**Production Build:**
- Frontend: Vite builds optimized React bundle to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Static file serving from the built public directory

**Environment Configuration:**
- `NODE_ENV` for environment detection
- `DATABASE_URL` for database connection (required)
- `REPL_ID` for Replit-specific features

### Design System

**Typography Scale:**
- App titles: text-2xl to text-3xl with semibold weight
- Task text: text-base with normal weight
- Inputs: text-sm for placeholders
- System fonts prioritized for native feel

**Layout System:**
- Max-width container: 2xl (672px)
- Consistent spacing scale: 2, 4, 6, 8 units
- Responsive padding adjustments (py-12 desktop, py-8 mobile)
- Component gaps standardized at gap-4

**Component Patterns:**
- Card-based task items with subtle elevation
- Rounded corners (lg variant = 9px)
- Touch-friendly targets (minimum h-12 for inputs)
- Checkbox-text-delete layout for task items