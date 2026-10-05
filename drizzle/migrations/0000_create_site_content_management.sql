CREATE TABLE public.site_content (
  id text PRIMARY KEY DEFAULT 'main' CHECK (id = 'main'),
  content jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(content) = 'object'),
  password_hash text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.site_content TO service_role;

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.get_published_site_content()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT content FROM public.site_content WHERE id = 'main';
$$;

CREATE OR REPLACE FUNCTION public.verify_site_admin_password(_password text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT COALESCE(
    (SELECT password_hash = encode(digest(_password, 'sha256'), 'hex')
     FROM public.site_content WHERE id = 'main'),
    false
  );
$$;

CREATE OR REPLACE FUNCTION public.publish_site_content(_password text, _content jsonb)
RETURNS timestamptz
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  _updated_at timestamptz;
BEGIN
  IF _password IS NULL OR NOT public.verify_site_admin_password(_password) THEN
    RAISE EXCEPTION 'Invalid admin password' USING ERRCODE = '42501';
  END IF;
  IF _content IS NULL OR jsonb_typeof(_content) <> 'object' THEN
    RAISE EXCEPTION 'Content must be a JSON object' USING ERRCODE = '22023';
  END IF;
  IF pg_column_size(_content) > 5000000 THEN
    RAISE EXCEPTION 'Content is too large' USING ERRCODE = '22023';
  END IF;
  UPDATE public.site_content
  SET content = _content, updated_at = now()
  WHERE id = 'main'
  RETURNING updated_at INTO _updated_at;
  IF _updated_at IS NULL THEN
    RAISE EXCEPTION 'Site content is not initialized' USING ERRCODE = '55000';
  END IF;
  RETURN _updated_at;
END;
$$;

CREATE OR REPLACE FUNCTION public.change_site_admin_password(_current_password text, _new_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  IF _current_password IS NULL OR NOT public.verify_site_admin_password(_current_password) THEN
    RAISE EXCEPTION 'Invalid admin password' USING ERRCODE = '42501';
  END IF;
  IF _new_password IS NULL OR char_length(_new_password) < 6 OR char_length(_new_password) > 200 THEN
    RAISE EXCEPTION 'Password must contain 6 to 200 characters' USING ERRCODE = '22023';
  END IF;
  UPDATE public.site_content
  SET password_hash = encode(digest(_new_password, 'sha256'), 'hex'), updated_at = now()
  WHERE id = 'main';
  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.get_published_site_content() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.verify_site_admin_password(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.publish_site_content(text, jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.change_site_admin_password(text, text) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.get_published_site_content() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.verify_site_admin_password(text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.publish_site_content(text, jsonb) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.change_site_admin_password(text, text) TO anon, authenticated, service_role;