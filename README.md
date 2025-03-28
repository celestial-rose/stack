# 🌌🌹 @celestial-rose/stack
## Hono w/ tRPC - D1 w/ Drizzle - NextJS 15 w/ Better Auth

<div align="center">
  <h3>The First Full-Stack Meta-Framework that lets you ship for FREE</h3>
  <p>Type-safe • Serverless • Developer-friendly • Cloudflare Deployed</p>
  <p><em>The ultimate combination in a template that has never been made before, in a monorepo</em></p>
</div>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#️-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-opinionated-decisions">Opinionated Decisions</a> •
  <a href="#-acknowledgements">Acknowledgements</a> •
  <a href="#-why-celestial-in-2025">Why Celestial?</a> •
  <a href="#️-roadmap">Roadmap</a> •
  <a href="#-license">License</a>
</p>

## ✨ Features 

- **🔋 Batteries Included**: Everything configured and ready to go - no setup hassle
- **🚀 Complete Platform**: Everything you need in one place - powered by Cloudflare's ecosystem
- **🔒 Full Type Safety**: End-to-end TypeScript with tRPC for reliable API communication
- **⚡ Peak Performance**: Optimized architecture from frontend to database
- **🔐 Secure by Default**: Ready-to-use authentication with Better Auth
- **📊 Data Ready**: Built-in database with Drizzle ORM and D1
- **🎨 Modern Interface**: Latest tech with NextJS 15.2.3, React 19, and Tailwind CSS 4
- **🧰 Streamlined Development**: Biome and Bun for a smooth coding experience

### ⭐ What you're getting out-of-the-box 📦

- [x] Frontend (Next.js) and Backend (Hono) setup ✅
- [x] CDN, HTTPS, custom domains, auto-scaling ✅
- [x] Database with D1 and ORM with Drizzle ✅
- [x] Authentication with Better Auth ✅
- [ ] Blob storage (coming soon with R2) ⏳
- [x] Email system with Resend (⏳ soon AWS SES) ✅ 
- [ ] Payment processing integration ⏳
- [x] Built-in analytics through Cloudflare ✅
- [x] Real-time monitoring and logs through Cloudflare ✅
- [x] Development tools (CI/CD, staging environments) ✅
- [x] Secure secrets management ⏳ (very soon)

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15.2.3](https://github.com/vercel/next.js)**: The latest version with improved performance and features
- **[React 19](https://github.com/facebook/react)**: With enhanced server components and improved developer experience
- **[Tailwind CSS 4](https://github.com/tailwindlabs/tailwindcss)**: Utility-first CSS framework with the latest optimizations
- **[shadcn/ui](https://github.com/shadcn-ui/ui)**: Accessible component library built on Radix UI primitives
- **[tRPC Client](https://github.com/trpc/trpc)**: Type-safe API calls with Tanstack Query for data fetching

### Backend
- **[Hono](https://github.com/honojs/hono)**: Lightweight, fast web framework for Cloudflare Workers
- **[tRPC Server](https://github.com/trpc/trpc)**: Type-safe API layer integrated with Hono
- **[Better Auth](https://github.com/better-auth/better-auth)**: Comprehensive authentication and authorization
- **[Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)**: Type-safe database access for D1
- **[Cloudflare D1](https://developers.cloudflare.com/d1)**: Distributed SQL database built on SQLite

### Development
- **[TypeScript](https://github.com/microsoft/TypeScript)**: For type safety across the entire application
- **[Bun](https://github.com/oven-sh/bun)**: Fast JavaScript runtime and package manager
- **[Biome 2.0](https://github.com/biomejs/biome)**: Modern, fast linter and formatter replacing ESLint and Prettier
- **[Wrangler](https://github.com/cloudflare/workers-sdk)**: Cloudflare's CLI for development and deployment


## 🚀 Getting Started

### 1. Project Setup

```bash
# Clone the repository
git clone https://github.com/celestial-rose/stack.git

# Navigate to the project
cd stack

# Install dependencies
bun install

# Create a Cloudflare Account: Sign up at cloudflare.com if you don't already have an account.
# No need to install Wrangler globally: Wrangler is included as a project dependency.

# Authenticate Wrangler: Connect Wrangler to your Cloudflare account.
bun wrangler:login

# Set up the database (very important step because this prepares the whole env for you by injecting the database name in important files)
bun setup-db
```

### 2. Environment Configuration

Run the environment setup script:
```bash
bun setup-env
```

This script will:
1. Copy all example environment files to their actual environment files if they don't exist yet
2. Generate a random secret for `BETTER_AUTH_SECRET` and update it in all environment files

After running the script, you may want to update other environment variables:
- Set up a [Resend](https://resend.com) account for email services and add your API key *(optional: only for sending OTP for auth)*
- Update domain-related variables if you're using a custom domain

### 3. Running in Development Mode

```bash
# Start both API and web servers concurrently
bun dev

# Or start them individually
bun dev:api  # Starts the API server on http://localhost:8787
bun dev:web  # Starts the Next.js server on http://localhost:3000
```

The development server will:
- Start the API server using Wrangler on http://localhost:8787
- Start the Next.js web server on http://localhost:3000
- Connect to a local D1 database for development

### 4. Database Management

After running the development server, you can use `bun fix-db` to synchronize your database.
> This is a current workaround as we couldn't manage to share the same locally simulated D1 MiniFlare database in wrangler.

```bash
# Fix database synchronization issues after running the dev server
bun fix-db

# Generate migrations after schema changes
bun generate

# Apply migrations to local development database
bun migrate

# Apply migrations to production database
bun migrate:prod
```

### 5. Deployment Process

> **⚠️ IMPORTANT: Security Disclaimer**  
> Never commit secrets or API keys to git. While the current setup uses wrangler.jsonc for configuration (which may contain secrets), you should **never push wrangler.jsonc with secrets to production**. A better approach using Wrangler CLI for secret management is being explored. In the meantime, consider adding wrangler.jsonc to your .gitignore file if it contains sensitive information.

1. Ensure your Cloudflare account is set up and you're authenticated with Wrangler.

2. Update your production environment variables:
   - Update the domain information in `packages/api/wrangler.jsonc` and `packages/web/wrangler.jsonc`
   - Set the correct values for `BETTER_AUTH_URL`, `BETTER_AUTH_COOKIES_DOMAIN`, etc.

3. Deploy your application:
   ```bash
   # Deploy both API and web concurrently
   bun deploy:all
   
   # Or deploy them individually
   bun deploy:api  # Deploys only the API
   bun deploy:web  # Deploys only the web frontend
   ```

4. After deployment, your application will be available at your configured domains:
   - API: https://api.your-domain.dev (or your custom domain)
   - Web: https://your-domain.dev (or your custom domain)

#### OpenNext for Cloudflare

This project uses [OpenNext](https://open-next.js.org/) to deploy Next.js applications to Cloudflare. OpenNext is an open-source adapter that enables Next.js applications to run on various serverless platforms, including Cloudflare Workers.

Special thanks to [Dax Raad](https://twitter.com/thdxr) and the [SST team](https://sst.dev) for creating and maintaining OpenNext, which makes it possible to deploy Next.js applications to Cloudflare's edge network with minimal configuration.

The integration is handled through the [`@opennextjs/cloudflare`](https://github.com/sst/open-next) package, which:
- Builds your Next.js application for Cloudflare Workers
- Handles asset management and routing
- Optimizes for Cloudflare's edge runtime environment

## 📁 Repository Structure

The @celestial-rose/stack is organized as a monorepo with a clear separation of concerns:

```
celestial-rose-stack/
├── packages/              # Main code packages
│   ├── api/               # Backend API (Hono + tRPC)
│   │   ├── src/
│   │   │   ├── db/        # Database schema and connection
│   │   │   ├── lib/       # Utility functions and helpers
│   │   │   ├── migrations/# Database migrations
│   │   │   └── trpc/      # tRPC router and route handlers
│   │   └── wrangler.jsonc # Cloudflare Workers configuration
│   │
│   ├── shared/            # Shared code between frontend and backend
│   │   └── src/
│   │       ├── constants/ # Shared constants
│   │       ├── lib/       # Shared utility functions
│   │       ├── types/     # Shared TypeScript types
│   │       └── utils/     # Shared utility functions
│   │
│   └── web/               # Frontend Next.js application
│       ├── public/        # Static assets
│       └── src/
│           ├── app/       # Next.js app router pages
│           ├── auth/      # Authentication components
│           ├── components/# React components
│           ├── lib/       # Frontend utility functions
│           ├── styles/    # Global styles
│           └── trpc/      # tRPC client setup
│
├── scripts/               # Utility scripts for setup and maintenance
│   ├── setup-db.ts        # Database setup script
│   └── setup-env.ts       # Environment setup script
│
├── biome.jsonc            # Biome configuration
├── drizzle.config.ts      # Drizzle ORM configuration
├── package.json           # Root package.json with workspace config
├── tsconfig.json          # TypeScript configuration
└── wrangler.jsonc         # Root Cloudflare Workers configuration
```

### Key Components

- **API Package**: Contains the Hono server with tRPC integration, database schema, and API routes. This is deployed to Cloudflare Workers.
  
- **Web Package**: Contains the Next.js frontend application with React components, pages, and styles. This is deployed to Cloudflare Pages via OpenNext.
  
- **Shared Package**: Contains code shared between the frontend and backend, such as types, constants, and utility functions. This ensures type safety across the entire application.

- **Scripts**: Utility scripts for setting up the database and environment variables.

### Type Safety Across Packages

One of the key benefits of this monorepo structure is the end-to-end type safety:

1. Database schema is defined in `packages/api/src/db/schema.ts`
2. This schema is used to generate TypeScript types
3. These types are shared via the shared package
4. The frontend can use these types for form validation and data display
5. tRPC ensures that API calls are type-safe from frontend to backend

## Troubleshooting

### Common Issues

1. **Wrangler Authentication Issues**
   ```
   Error: You need to login to Cloudflare first.
   ```
   Solution: Run `bun wrangler:login` and follow the authentication flow.

2. **Database Connection Errors**
   ```
   Error: D1_ERROR: database not found
   ```
   Solution: Ensure you've run `bun setup-db` and that the database ID in your wrangler.jsonc files matches.

3. **Environment Variable Issues**
   ```
   Error: Missing environment variable: BETTER_AUTH_SECRET
   ```
   Solution: Check that you've copied and updated all the necessary .env files as described in the Environment Configuration section.

4. **Port Conflicts**
   ```
   Error: Port 3000 is already in use
   ```
   Solution: Stop any other services using the port or change the port in your Next.js configuration.

5. **Deployment Failures**
   ```
   Error: Failed to deploy to Cloudflare
   ```
   Solution: Check your Cloudflare account permissions and ensure your wrangler.jsonc configuration is correct.

## 🧠 Opinionated Decisions

The @celestial-rose/stack makes several opinionated technical decisions to optimize for developer experience and deployment efficiency:

- **No Better Auth migrations → Full Drizzle schema**: We use Drizzle for all database schema management, including auth tables, for a unified approach to database management.
- **No Drizzle-kit push → Wrangler execute**: Direct database operations through Wrangler for better integration with Cloudflare's ecosystem.
- **Bun over npm/yarn/pnpm**: Significantly faster package management and runtime execution.
- **Biome over ESLint/Prettier**: Single tool for linting and formatting with better performance.
- **Monorepo structure**: Shared types and utilities across frontend and backend for maximum type safety.
- **Edge-first architecture**: Built for Cloudflare Workers from the ground up, not adapted afterward.
- **tRPC over REST/GraphQL**: End-to-end type safety without the need for code generation or schemas.
- **shadcn/ui over component libraries**: Unstyled, accessible components that you own and can customize.
- **D1 over other databases**: Native integration with Cloudflare Workers and zero configuration needed.


## 🙏 Acknowledgements

Special thanks to Theo [@theo](https://twitter.com/theo) for laying the foundation with the revolutionary [T3 Stack](https://create.t3.gg/). Also grateful to [tRPC](https://trpc.io/) and [Tanstack Query](https://tanstack.com/query) for building such amazing libraries that make type-safe development a joy.


## 💫 Why Celestial in 2025?

### Batteries Included
No more reinventing the wheel or setting up boilerplate for every project. Everything you need is included and preconfigured, making it your one-stop solution for modern web development.

### Free Deployment Until You Scale
Deploy on Cloudflare's free tier and scale only when you need to. The entire stack is optimized to work within Cloudflare's free tier limits, allowing you to ship production-ready applications without upfront costs.

### Developer Experience Matters
We've carefully selected tools that make development a joy - from Biome's lightning-fast linting to tRPC's end-to-end type safety and Bun's ultra-fast package management.

### Performance is Non-Negotiable
Every component of the stack is optimized for performance, from React 19 to Hono's lightweight API framework.

### Scalability Without Complexity
The modular architecture allows your applications to grow without becoming unwieldy, with clear patterns for organizing code.

## 🗺️ Roadmap

The @celestial-rose/stack is continuously evolving. Here are the key features and improvements planned for future releases:

### Enhanced SST Integration
- While we already use OpenNext for Cloudflare deployment, future plans include deeper SST integration:
  - Eliminate dependency on Wrangler for deployments
  - Use AWS SES for more control over email delivery
  - Manage all Cloudflare bindings through SST configuration
  - Simplify multi-environment deployments (dev, staging, prod)

### Performance Enhancements
- Hono rate limiting for API protection
- Further optimizations for Cloudflare's free tier limits
- Enhanced caching strategies for static assets

### Developer Experience
- Improved local development environment
- More comprehensive documentation and examples
- CLI tool for scaffolding new features and components

### Additional Features
- Enhanced authentication options (OAuth providers, SAML)
- Real-time capabilities with WebSockets
- File storage integration with R2
- Analytics and monitoring tools
- Emails with AWS SES
- Payment maybe ?

We welcome contributions and suggestions for the roadmap. Feel free to open issues or pull requests with your ideas!

## 📄 License

@celestial-rose/stack is [MIT licensed](./LICENSE).