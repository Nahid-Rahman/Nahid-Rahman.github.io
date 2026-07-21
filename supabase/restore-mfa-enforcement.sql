-- Restore database-level MFA enforcement.

create or replace function public.has_aal2()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'aal', '') = 'aal2';
$$;
