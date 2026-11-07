# Roadmap

## Done (code)
- [x] App points at the lanonasis Supabase project with its publishable key
- [x] Sign-in page (email + GitHub) and sidebar sign in / sign out
- [x] GitHub key handed to the server and stored encrypted; old browser copy migrated and deleted
- [x] "Break down an issue" — AI turns a synced GitHub issue into prioritized subtasks to add to the board
- [x] Flow concierge (floating bubble + /chat) — real AI, sees tasks, can add/update/break down tasks and open pages; one conversation saved to the account

## Blocked — needs Lovable's Supabase link switched to lanonasis (currently ptnrwrgzrsbocgxlpvhd)
- [ ] Run `supabase/pending/001_github_and_concierge.sql` through the migration tool
- [ ] Create secrets on lanonasis: LOVABLE_API_KEY (lovable_api_key--create), GITHUB_TOKEN_ENCRYPTION_KEY (generate_secret)
- [ ] Deploy github-connection, issue-subtasks, concierge-chat; confirm SUPABASE_SECRET_KEYS is available to functions
- [ ] End-to-end test: sign in, connect GitHub, sync, break down an issue, chat with Flow (incl. a task action), reload and confirm history
