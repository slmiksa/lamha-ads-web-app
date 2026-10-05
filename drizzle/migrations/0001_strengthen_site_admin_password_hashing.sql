CREATE OR REPLACE FUNCTION public.verify_site_admin_password(_password text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT COALESCE(
    (SELECT CASE
       WHEN password_hash LIKE '$2%' THEN crypt(_password, password_hash) = password_hash
       ELSE password_hash = encode(digest(_password, 'sha256'), 'hex')
     END
     FROM public.site_content WHERE id = 'main'),
    false
  );
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
  SET password_hash = crypt(_new_password, gen_salt('bf', 12)), updated_at = now()
  WHERE id = 'main';
  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.verify_site_admin_password(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.change_site_admin_password(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_site_admin_password(text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.change_site_admin_password(text, text) TO anon, authenticated, service_role;