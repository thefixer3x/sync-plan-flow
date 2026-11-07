# Project rules

- Backend is the user's own Supabase project "lanonasis" (ref mxtsdgkwzjzlttpotole); the browser client hardcodes its URL + publishable key in `src/integrations/supabase/client.ts` because the project's legacy anon/service keys are disabled.
- Server functions authenticate callers in code (`verify_jwt = false`) via `_shared/supabaseAdmin.ts`, which prefers `SUPABASE_SECRET_KEYS` over the legacy service role key — legacy keys are disabled on this project.
- App tables live in `public` with an `spf_` prefix; the database is shared with other apps, and the `spf` schema is not exposed to the Data API.
- Third-party access tokens (GitHub) are stored only server-side, AES-GCM encrypted with a server secret, in tables with no browser grants; the browser never persists them.
- Tasks stay local-first in IndexedDB (`src/store/db.ts`); the concierge sends a task snapshot with each message and its actions run in the browser (`src/lib/concierge/tools.ts`) so they work on local data.
- AI calls go through Lovable AI Gateway from Supabase Edge Functions using the AI SDK Responses provider (`supabase/functions/_shared/responses.ts`); keep `store: false` and reasoning options on every call.
- Chat UI uses AI Elements in `src/components/ai-elements/`; streamdown is limited to the `code` plugin to keep the bundle small.
- `supabase/pending/` holds SQL not yet applied because the linked project differs; submit it unchanged through the migration tool once linked.
