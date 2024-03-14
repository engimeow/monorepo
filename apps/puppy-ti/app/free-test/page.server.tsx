import "server-only";
import { createClient } from "lib/utils/supabase/server";
import { cookies } from "next/headers";

export const getQuestions = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: questions, error } = await supabase
    .from("questions")
    .select("*");

  return {
    questions,
    error,
  };
};
