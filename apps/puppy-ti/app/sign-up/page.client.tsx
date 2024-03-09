"use client";
import { useState } from "react";
import { supabase } from "../providers/authProvider";

export const ClientComponent = () => {
  const [needConfirm, setNeedConfirm] = useState(false);

  const handleSignUp = async (e: FormData) => {
    if (!needConfirm) {
      const email = e.get("email")?.toString();
      const password = e.get("password")?.toString();

      if (!email || !password) {
        alert("이메일과 비밀번호를 입력해주세요.");
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (!error) {
        setNeedConfirm(true);
      } else {
        console.log(error);
        alert("에러가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      <form action={handleSignUp}>
        <h1>Sign Up</h1>
        <input disabled={needConfirm} type="email" name="email" />
        <input disabled={needConfirm} type="password" name="password" />

        <button disabled={needConfirm} type="submit">
          전송
        </button>
      </form>
      {needConfirm && (
        <div>
          <h1>이메일을 확인해주세요.</h1>
        </div>
      )}
    </div>
  );
};
