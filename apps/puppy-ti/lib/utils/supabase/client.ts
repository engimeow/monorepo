import { Database } from "@puppy-ti/database.types";
import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

export const createClient = () => {
  return supabaseCreateClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
};
