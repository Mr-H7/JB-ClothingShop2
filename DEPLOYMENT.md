# JB Clothing Deployment

## 1) Install dependencies
```bash
npm install
```

## 2) Environment setup
1. Copy `.env.example` to `.env`.
2. Set `PORT`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY`.
3. Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and a long random `ADMIN_SESSION_SECRET`.

## 3) Supabase setup
1. Create a Supabase project.
2. Open the Supabase SQL editor.
3. Run the SQL in `supabase/schema.sql`.
4. Keep the service role key server-side only. Do not expose it in Vite/client env variables.

## 4) Build
```bash
npm run build
```

## 5) Start (production)
```bash
npm run start
```

## 6) Database note
- Form submissions, newsletter leads, and admin inbox/dashboard data use Supabase Postgres through the Express backend.
- Products remain a local catalog for now.
- WhatsApp remains the ordering flow. There is no backend checkout, profile, or orders system.
