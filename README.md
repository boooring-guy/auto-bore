<div align="center">

  <img src="./public/logos/logo-full.svg" alt="Auto-bore Logo" width="200" height="auto">

</div>

# Auto-bore

[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.44.7-FF6B6B?style=for-the-badge&logo=postgresql&logoColor=white)](https://orm.drizzle.team/)

[![Better Auth](https://img.shields.io/badge/Better_Auth-1.3.34-6C5CE7?style=for-the-badge&logo=shield&logoColor=white)](https://www.better-auth.com/)

[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![tRPC](https://img.shields.io/badge/tRPC-11.7.1-2596BE?style=for-the-badge&logo=trpc&logoColor=white)](https://trpc.io/)

[![Jotai](https://img.shields.io/badge/Jotai-2.15.1-FF6B35?style=for-the-badge&logo=jotai&logoColor=white)](https://jotai.org/)

[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> A modern, powerful workflow automation platform that helps you connect apps, services, and APIs to create automations that work for you 24/7.

## 🌟 Features

- **🔐 Secure Authentication** - Powered by Better Auth for complete user management

- **⚡ Visual Workflow Builder** - Drag-and-drop interface using React Flow for creating automations

- **🎨 Modern UI** - Beautiful interface using Radix UI and Tailwind CSS v4

- **📱 Responsive Design** - Works perfectly on desktop and mobile devices

- **🌙 Dark Mode** - Eye-friendly theme switching with next-themes

- **🔄 Real-Time Execution** - Background job processing with Inngest

- **🔍 Workflow Management** - Create, edit, and manage complex workflows with ease

- **📊 Execution Monitoring** - Track and monitor workflow executions in real-time

- **🔑 Credential Management** - Securely store and manage API credentials

- **🤖 AI Integration** - Built-in AI capabilities with multiple providers (OpenAI, Anthropic, Google)

- **💳 Subscription Management** - Integrated with Polar for subscription handling

- **🔔 Smart Notifications** - Real-time toast notifications with Sonner

- **📈 Analytics & Monitoring** - Track performance and optimize workflows

- **🛡️ Error Tracking** - Comprehensive error monitoring with Sentry

## 🚀 Tech Stack

**Core Framework & Language**

- **Frontend Framework**: [Next.js 16](https://nextjs.org/) with App Router

- **Language**: [TypeScript 5](https://www.typescriptlang.org/)

- **Runtime**: [React 19](https://reactjs.org/)

**Backend & Database**

- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Neon Serverless](https://neon.tech/)

- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM with excellent type safety

- **Authentication**: [Better Auth](https://www.better-auth.com/) - Complete authentication solution

**API & Communication**

- **API Layer**: [tRPC](https://trpc.io/) - End-to-end typesafe APIs

- **Background Jobs**: [Inngest](https://www.inngest.com/) - Reliable workflow execution

- **State Management**: [Jotai](https://jotai.org/) - Primitive and flexible state management

**UI & Styling**

- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components

- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework

- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)

- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library

- **Workflow Builder**: [React Flow](https://reactflow.dev/) - Node-based workflow editor

**Forms & Validation**

- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation

- **URL State Management**: [nuqs](https://nuqs.47ng.com/) - Type-safe URL search params

**AI & Integrations**

- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/) - Unified AI interface

- **AI Providers**: OpenAI, Anthropic, Google AI

- **Payments**: [Polar](https://polar.sh/) - Subscription management

**Developer Experience**

- **Error Tracking**: [Sentry](https://sentry.io/) - Application monitoring

- **Linting & Formatting**: [Biome](https://biomejs.dev/) - Fast formatter and linter

- **Package Manager**: [pnpm](https://pnpm.io/)

- **Utility Classes**: [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)

- **Process Management**: [mprocs](https://github.com/pvolok/mprocs) - Process manager for development

**Data Visualization**

- **Charts**: [Recharts](https://recharts.org/) - Composable charting library

- **Date Handling**: [date-fns](https://date-fns.org/) - Modern date utility library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)

- [pnpm](https://pnpm.io/) package manager

- [PostgreSQL](https://www.postgresql.org/) database (or use [Neon](https://neon.tech/) for serverless PostgreSQL)

- An [Inngest](https://www.inngest.com/) account (for background job processing)

- A [Polar](https://polar.sh/) account (for subscription management, optional)

- A [Sentry](https://sentry.io/) account (for error tracking, optional)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd auto-bore
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL=your_postgresql_connection_string

   # Better Auth
   BETTER_AUTH_SECRET=your_secret_key_here
   BETTER_AUTH_URL=http://localhost:3000

   # Inngest
   INNGEST_EVENT_KEY=your_inngest_event_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key

   # Polar (Optional)
   POLAR_ACCESS_TOKEN=your_polar_access_token

   # Sentry (Optional)
   SENTRY_DSN=your_sentry_dsn
   SENTRY_AUTH_TOKEN=your_sentry_auth_token

   # AI Providers (Optional)
   OPENAI_API_KEY=your_openai_key
   ANTHROPIC_API_KEY=your_anthropic_key
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_key
   ```

4. **Set up the database**

   ```bash
   # Generate migration files
   pnpm db:generate

   # Push schema to database (development)
   pnpm db:push

   # OR apply migrations (production)
   pnpm db:migrate
   ```

   For detailed database setup instructions, see [DATABASE_SETUP.md](./DATABASE_SETUP.md)

5. **Set up Better Auth**

   Generate the Better Auth schema:

   ```bash
   npx @better-auth/cli@latest generate
   ```

   For detailed authentication setup, see [BETTER_AUTH_SETUP.md](./BETTER_AUTH_SETUP.md)

6. **Run the development server**

   ```bash
   # Start all services (Next.js + Inngest)
   pnpm dev:all

   # OR start individually
   pnpm dev              # Next.js only
   pnpm inngest:dev      # Inngest dev server
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
auto-bore/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (dashboard)/       # Dashboard routes
│   │   │   ├── (editor)/      # Workflow editor
│   │   │   └── (manage)/      # Management pages
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Better Auth endpoints
│   │   │   ├── trpc/          # tRPC endpoints
│   │   │   └── inngest/       # Inngest webhooks
│   │   └── dashboard/         # Dashboard pages
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Radix UI components
│   │   ├── react-flows/      # React Flow components
│   │   └── entites/          # Entity management components
│   ├── modules/              # Feature modules
│   │   ├── auth/             # Authentication module
│   │   ├── dashboard/        # Dashboard module
│   │   ├── editor/           # Workflow editor module
│   │   ├── executions/       # Execution monitoring
│   │   ├── credentials/      # Credential management
│   │   ├── triggers/         # Workflow triggers
│   │   └── landing/          # Landing page
│   ├── lib/                  # Core libraries
│   │   ├── auth.ts          # Better Auth configuration
│   │   ├── db/              # Database schema and client
│   │   └── utils.ts         # Utility functions
│   ├── trpc/                # tRPC setup
│   │   ├── routers/         # tRPC routers
│   │   └── server.tsx       # tRPC server
│   ├── inngest/             # Inngest functions
│   ├── hooks/               # Custom React hooks
│   ├── atoms/               # Jotai atoms
│   └── config/              # Configuration files
├── public/                   # Static assets
├── drizzle/                  # Database migrations
└── ...config files
```

## 🚀 Deployment

### Production Build

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Environment Setup

Make sure to set all required environment variables in your production environment:

- Database connection string
- Better Auth secrets
- Inngest keys
- API keys for AI providers
- Sentry DSN (if using)

### Database Migrations

Before deploying, ensure all migrations are applied:

```bash
pnpm db:migrate
```

## 🧪 Scripts

- `pnpm dev` - Start Next.js development server
- `pnpm dev:all` - Start both Next.js and Inngest development servers
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome
- `pnpm db:generate` - Generate database migration files
- `pnpm db:migrate` - Apply database migrations
- `pnpm db:push` - Push schema changes to database (development)
- `pnpm db:studio` - Open Drizzle Studio for database management
- `pnpm inngest:dev` - Start Inngest development server

## 📚 Documentation

- [Database Setup](./DATABASE_SETUP.md) - Database configuration and migrations
- [Better Auth Setup](./BETTER_AUTH_SETUP.md) - Authentication configuration
- [Theme Setup](./THEME_SETUP.md) - Theme and styling configuration
- [Settings Usage](./SETTINGS_USAGE.md) - Application settings guide
- [Pagination & URL State](./PAGINATION_NUQS_GUIDE.md) - URL state management guide

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository

2. Create your feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all linting checks pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing React framework
- [Drizzle ORM](https://orm.drizzle.team/) for the excellent TypeScript ORM
- [Better Auth](https://www.better-auth.com/) for authentication solutions
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [tRPC](https://trpc.io/) for end-to-end typesafe APIs
- [Inngest](https://www.inngest.com/) for reliable background job processing
- [React Flow](https://reactflow.dev/) for the workflow builder
- [Jotai](https://jotai.org/) for atomic state management
- [React Hook Form](https://react-hook-form.com/) for form handling
- [Zod](https://zod.dev/) for schema validation
- [Lucide](https://lucide.dev/) for the icon library
- [Sonner](https://sonner.emilkowal.ski/) for toast notifications
- [Sentry](https://sentry.io/) for error tracking

## 📞 Support

If you have any questions or need help, please:

- Open an [issue](https://github.com/your-username/auto-bore/issues)
- Check the documentation in the `/docs` directory
- Review the setup guides in the root directory

---

Built with ❤️ using Next.js, React, and TypeScript
