import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cliente con la service-role key: bypassa RLS. Solo usar en Route Handlers
// (checkout, webhook), nunca en código que se ejecute en el navegador.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
