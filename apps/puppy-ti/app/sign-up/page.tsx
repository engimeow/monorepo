import { cookies } from "next/headers";
import { createClient } from "@puppy-ti/lib/utils/supabase/server";

export default function SignUpPage() {
  const signUp = async (e: FormData) => {
    "use server";
    const email = e.get("email") as string;
    const password = e.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (!error) {
      console.log("이메일을 확인해주세요.");
    } else {
      console.log(error);
      alert("에러가 발생했습니다.");
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
    </div>
  );
}
