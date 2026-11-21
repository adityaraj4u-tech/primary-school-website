# Supabase admin auth — setup guide

Admin-only. **No public sign-up.** Only users you create and add to `admin_users` can open `/admin`.

## 1. Create a Supabase project

1. Go to https://supabase.com → **New project**
2. Pick org, name, database password, region
3. Wait until the project is ready

## 2. Copy API keys

**Project Settings → API**

| Variable | Where it goes |
|----------|----------------|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
| `anon` `public` key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` key | `SUPABASE_SERVICE_ROLE_KEY` (server only — never in client code) |

### Local

```bash
cp .env.example .env.local
# paste values into .env.local
```

### Vercel

Project → **Settings → Environment Variables** → add the three vars for Production. Redeploy after saving.

## 3. Disable public sign-up

**Authentication → Providers → Email**

- Enable Email provider
- **Turn OFF** “Enable sign ups”
- Optional: enable **MFA** under Authentication → MFA (recommended)

## 4. Run the SQL migration

**SQL Editor → New query** → paste contents of `supabase/migrations/001_initial.sql` → **Run**

## 5. Create the first admin user

**Authentication → Users → Add user** (email + strong password)

Copy the user **UUID**, then in SQL Editor:

```sql
insert into public.admin_users (user_id, email)
values ('PASTE-USER-UUID-HERE', 'admin@yourschool.example');
```

## 6. Enable the feature flag

In `src/config/site.ts` set `enableSupabase: true`, then commit and push.

## 7. Sign in

Open `/admin/login` with the admin email and password.

## Security

- Public sign-up disabled
- `service_role` never in `NEXT_PUBLIC_*`
- Only trusted staff in `admin_users`
- Prefer MFA for admins
