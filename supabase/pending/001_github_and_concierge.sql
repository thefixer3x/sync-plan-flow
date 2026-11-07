-- To run on the lanonasis project (mxtsdgkwzjzlttpotole) once Lovable is linked to it.

-- Encrypted GitHub access keys, one per signed-in user. Server functions only.
CREATE TABLE public.spf_github_connections (
  user_id uuid PRIMARY KEY,
  token_ciphertext text NOT NULL,
  github_login text,
  avatar_url text,
  html_url text,
  scopes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.spf_github_connections TO service_role;
ALTER TABLE public.spf_github_connections ENABLE ROW LEVEL SECURITY;
-- No policies: browsers can never read or write this table.

-- Flow concierge: one conversation per user.
CREATE TABLE public.spf_concierge_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  message_id text NOT NULL,
  role text NOT NULL,
  parts jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, message_id)
);
CREATE INDEX spf_concierge_messages_user_created_idx ON public.spf_concierge_messages (user_id, created_at);
GRANT SELECT, DELETE ON public.spf_concierge_messages TO authenticated;
GRANT ALL ON public.spf_concierge_messages TO service_role;
ALTER TABLE public.spf_concierge_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read their own concierge messages"
  ON public.spf_concierge_messages FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users clear their own concierge messages"
  ON public.spf_concierge_messages FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.spf_touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER spf_github_connections_touch BEFORE UPDATE ON public.spf_github_connections
  FOR EACH ROW EXECUTE FUNCTION public.spf_touch_updated_at();
CREATE TRIGGER spf_concierge_messages_touch BEFORE UPDATE ON public.spf_concierge_messages
  FOR EACH ROW EXECUTE FUNCTION public.spf_touch_updated_at();
