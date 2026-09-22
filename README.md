# Elite Bathrooms

[elitebathrooms.com](https://www.elitebathrooms.com)

Custom Next.js website for Elite Bathrooms — a Tacoma-based bathroom
remodeling specialist. Built from scratch as a greenfield replacement for
the previous WordPress site.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Jobber integration

The estimate flow (`/get-a-quote`) is designed to connect to Jobber, but
the production Jobber integration is not yet configured. Lead submissions
currently post to `/api/estimate` (`src/app/api/estimate/route.ts`), which
validates and logs the request — that route is the intended isolation
boundary for the real Jobber connection once credentials are available.
