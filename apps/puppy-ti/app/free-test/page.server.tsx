import "server-only";
import { createClient } from "lib/utils/supabase/server";
import { cookies } from "next/headers";

export const getServersideProps = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("questions").select("*");

  return {
    data,
    error,
  };
};
