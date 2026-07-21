# MFA temporarily disabled

The admin still requires:

- the existing Supabase email/password account
- the allowlisted admin user ID
- Row Level Security for database and storage operations

MFA is temporarily bypassed so development can continue.

## Supabase step

Run `supabase/temporarily-disable-mfa.sql` in the SQL Editor.
Also turn off **Authentication → Multi-Factor → Limit duration of AAL1 sessions**.

## Re-enable later

1. Fix/enrol the TOTP factor.
2. Set `VITE_REQUIRE_ADMIN_MFA=true`.
3. Run `supabase/restore-mfa-enforcement.sql`.
4. Turn **Limit duration of AAL1 sessions** back on.
