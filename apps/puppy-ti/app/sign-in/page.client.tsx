"use client";
import { useRouter } from "next/navigation";
import { supabase } from "../providers/authProvider";

export const ClientComponent = () => {
  const router = useRouter();

  const handleSignIn = async (e: FormData) => {
    const email = e.get("email")?.toString();
    const password = e.get("password")?.toString();

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      router.push("/");
    }
  };

  return (
    <div>
      <form action={handleSignIn}>
        <h1>Sign In</h1>
        <input type="email" name="email" />
        <input type="password" name="password" />

        <button type="submit">전송</button>
      </form>
    </div>
  );
};
