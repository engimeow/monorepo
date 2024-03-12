import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@puppy-ti/lib/utils/supabase/server";

export default function SignUpPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const signUp = async (e: FormData) => {
    "use server";
    const email = e.get("email") as string;
    const password = e.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    if (!email || !password) {
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (!error) {
      return redirect("/sign-up?status=verification");
    } else {
      return redirect("/sign-up?status=failed");
    }
  };

  return (
    <div>
      <form action={signUp}>
        <h1>Sign Up</h1>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">전송</button>
      </form>
      {searchParams?.status && (
        <div>{parseStatusToMessage(searchParams.status)}</div>
      )}
    </div>
  );
}

const parseStatusToMessage = (status: string) => {
  switch (status) {
    case "verification":
      return "이메일을 확인해주세요";
    case "failed":
      return "가입에 실패했습니다";
    default:
      return "";
  }
};
