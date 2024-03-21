import "server-only";
import { createClient } from "lib/utils/supabase/server";
import { cookies } from "next/headers";

export const getContributors = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: contributors, error } = await supabase
    .from("contributors")
    .select("*");

  return {
    contributors,
    error,
  };
};
