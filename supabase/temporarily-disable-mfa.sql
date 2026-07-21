-- TEMPORARY: allow the allowlisted admin to use the dashboard without MFA.
-- Email/password authentication, admin UID allowlisting, and RLS remain active.
-- Re-enable MFA later by running restore-mfa-enforcement.sql and setting
-- VITE_REQUIRE_ADMIN_MFA=true in the frontend environment.

create or replace function public.has_aal2()
returns boolean
language sql
stable
as $$
  select true;
$$;
