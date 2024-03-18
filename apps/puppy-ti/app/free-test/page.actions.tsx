"use server";
import { Database } from "@puppy-ti/database.types";
import { createClient } from "lib/utils/supabase/server";
import { cookies } from "next/headers";

type USER_MBTI_HISTORY_ROW =
  Database["public"]["Tables"]["user_mbti_history"]["Row"];
type MBTI_ROW = Database["public"]["Enums"]["mbti"];

export async function invoke(dogName: string = "", mbti: MBTI_ROW) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return supabase.functions.invoke<USER_MBTI_HISTORY_ROW>("complete-test", {
    body: {
      name: dogName,
      mbti,
    },
  });
}
