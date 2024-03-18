import { createClient } from "lib/utils/supabase/client";

export const getAuthUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
