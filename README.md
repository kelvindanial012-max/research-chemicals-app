# ChemPort MVP

ChemPort is a compliance-forward marketplace that distributes research-only chemicals to universities, labs, and R&D teams. The MVP focuses on transparency (COA / MSDS access), trustworthy supplier profiles, a searchable catalog, and a lightweight dashboard with batch tracking.

## Tech Stack

- [Next.js 16 (App Router)](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com) with custom design tokens for the ChemPort palette
- [Supabase](https://supabase.com/) (Postgres + Auth + Storage) via the `@supabase/ssr` helpers
- [Stripe Checkout](https://stripe.com/docs/payments/checkout) for payments
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for validated forms
- [React Markdown](https://github.com/remarkjs/react-markdown) for the Knowledge Base detail pages
- API routes for checkout and contact, ready to be wired up to Stripe webhooks and Resend/Mail providers

## Project Structure

```
src/
  app/                # App router routes (marketing pages, dashboard, APIs)
  components/         # UI primitives + feature components
  data/               # Mock data used when Supabase env vars are missing
  lib/                # Supabase helpers, site config, utilities, data service
supabase/schema.sql   # Tables + RLS policies for Supabase
```

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Copy the environment template and provide values

   ```bash
   cp .env.local.example .env.local
   ```

   | Variable | Purpose |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Required to read catalog, FAQ, and article content from Supabase |
   | `SUPABASE_SERVICE_ROLE_KEY` | Needed for privileged server actions (batch logging) |
   | `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Enables live Checkout sessions via `/api/checkout` |
   | `NEXT_PUBLIC_SITE_URL` | Used for Stripe success/cancel URLs |
   | `RESEND_API_KEY` | Optional for wiring `/api/contact` to email |

   > Without Supabase or Stripe keys, the app falls back to the mock data in `src/data/mock-data.ts` and prints helpful notices in the UI.

3. Run the dev server

   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` to browse the catalog, knowledge base, FAQ, dashboard, and contact form.

## Supabase Setup

1. Create a Supabase project and run the SQL in `supabase/schema.sql`.
2. Enable Row Level Security (included in the script) and configure policies if you change table names.
3. Seed data either manually or by using the arrays in `src/data/mock-data.ts`.
4. Add the Supabase env vars to `.env.local`.

### Auth

- `src/app/login/actions.ts` uses `@supabase/ssr` server actions so cookies stay in sync.
- Protecting `/dashboard` can be done by adding `middleware.ts` and checking `supabase.auth.getUser()`. For the MVP the route renders a friendly message if Supabase isn’t configured yet.

## Stripe Checkout

- The `/api/checkout` route creates a Checkout Session using the product info from the catalog.
- Replace the inline price data with real `price` IDs once Stripe products exist.
- Add a webhook (`checkout.session.completed`) to ingest orders back into Supabase.

## Pages & Features

- `/` – Hero, trust metrics, featured products, knowledge base teaser, B2B CTA.
- `/products` – Catalog with filters for category, supplier, and availability.
- `/products/[slug]` – Detail page with pricing, supplier docs, and checkout button.
- `/knowledge-base` & `/knowledge-base/[slug]` – Articles rendered via Markdown.
- `/faq`, `/about`, `/contact` – Compliance, story, and intake form.
- `/login` – Supabase auth-ready form.
- `/dashboard` – Metrics, orders table, batch tracker table + form (writes via Supabase service role when configured).

## Data Flow

- `src/lib/data-service.ts` tries Supabase first and automatically falls back to the local mock data when env vars are absent.
- Server actions (`login`, `batch logging`) rely on Supabase helpers so secrets never leave the server.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the project |

## Next Steps

1. Connect Supabase Storage for COA/MSDS uploads and swap the placeholder document URLs.
2. Add middleware-based auth guard for `/dashboard` once Supabase is live.
3. Replace mock data with real tables via `supabase-js` edge functions or RLS-safe queries.
4. Wire `/api/contact` to Resend/Mailgun + Slack for notifications.
5. Add automated tests (Playwright + Vitest) once flows stabilize.
