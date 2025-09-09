# Overview

This is a business management dashboard application designed for a Portuguese/Angolan company. The system manages clients, projects, quotes, leads, and portfolio items with features like budget calculation and real-time data visualization. Built as a full-stack web application with modern React frontend and Express backend.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for dashboard, clients, projects, calculator, leads, portfolio, and admin
- **UI Components**: Shadcn/ui component library with Radix UI primitives for accessible components
- **Styling**: TailwindCSS with custom design system using CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management with custom query client configuration
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Data Fetching**: Custom API layer with fetch-based requests and error handling

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured routes for CRUD operations
- **Development**: Hot reloading with Vite integration in development mode
- **File Uploads**: Multer middleware for handling image uploads with file type validation and size limits
- **Storage Pattern**: Abstract storage interface (IStorage) allowing for flexible data persistence implementations

## Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Database Client**: Neon Database serverless driver (@neondatabase/serverless)
- **Validation**: Drizzle-Zod integration for runtime type validation from database schemas
- **Tables**: Five main entities - clients, projects, quotes, leads, and portfolio_items with UUID primary keys

## Authentication and Authorization
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **Security**: No explicit authentication system visible in current codebase (may be implemented separately)

## External Dependencies
- **Database Provider**: Neon (serverless PostgreSQL)
- **Development Platform**: Replit with custom plugins for error handling and cartographer integration
- **Font Services**: Google Fonts (Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Icon Libraries**: Lucide React for general icons, React Icons for social media icons
- **Time Handling**: date-fns library for date manipulation and formatting with Angola timezone support