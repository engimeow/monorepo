import { cors } from "../_shared/cors.ts";
import type { Database } from "../_shared/database.types.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.4.0";

Deno.serve(async (req) => {
  const requestOrigin = req.headers.get("Origin");

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors(requestOrigin) });
  }

  try {
    const authClient = createClient<Database>(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    const supabaseClient = createClient<Database>(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { name, mbti } = await req.json();

    if (!name || !mbti) {
      throw new Error("Name and MBTI are required");
    }

    const { data: { user } } = await authClient.auth.getUser();
    const userId = user?.id;

    const { error, data } = await supabaseClient.from("user_mbti_history")
      .insert({
        ...(userId && { user_id: userId }),
        name,
        mbti,
      }).select().single();

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), {
      headers: { ...cors(requestOrigin), "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      headers: { ...cors(requestOrigin), "Content-Type": "application/json" },
      status: 400,
    });
  }
});
