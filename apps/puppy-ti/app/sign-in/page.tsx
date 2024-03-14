import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@puppy-ti/lib/utils/supabase/server";

export default function SignInPage() {
  const signin = async (e: FormData) => {
    "use server";
    const email = e.get("email") as string;
    const password = e.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/sign-in?message=Could not authenticate user");
    }

    return redirect("/");
  };

  return (
    <div>
      <form action={signin}>
        <h1>Sign In</h1>
        <input type="email" name="email" />
        <input type="password" name="password" />

        <button type="submit">전송</button>
      </form>
    </div>
  );
}
