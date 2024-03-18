import { createClient } from "lib/utils/supabase/server";
import { cookies } from "next/headers";

export const getAuthUser = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
