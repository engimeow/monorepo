"use client";
import type { Database } from "@puppy-ti/database.types";
import { createClient } from "@puppy-ti/lib/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type QUESTION_ROW = Database["public"]["Tables"]["questions"]["Row"];

interface UIProps {
  questions: Array<QUESTION_ROW>;
}

type USER_MBTI_HISTORY_ROW =
  Database["public"]["Tables"]["user_mbti_history"]["Row"];

type MBTI_ROW = Database["public"]["Enums"]["mbti"];

export const UI = (props: UIProps) => {
  const [userMBTIHistory, setUserMBTIHistory] =
    useState<USER_MBTI_HISTORY_ROW>();
  const [name, setName] = useState("");
  const [mbti, setMbti] = useState<MBTI_ROW>("ENFJ");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const router = useRouter(); // useRouter 훅을 사용하여 라우터 인스턴스를 가져옵니다.

  const handleSubmit = async () => {
    try {
      if (!buttonDisabled) {
        setButtonDisabled(true);
        const supabase = createClient();
        const { data } = await supabase.functions.invoke<USER_MBTI_HISTORY_ROW>(
          "complete-test",
          {
            body: {
              name,
              mbti,
            },
          },
        );
        if (data) {
          setUserMBTIHistory(data);
        }
      }
    } catch (error) {
      setButtonDisabled(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (userMBTIHistory) {
      const timer = setTimeout(() => {
        // useRouter의 push 함수를 사용하여 페이지 이동
        router.push(`/free-test/${userMBTIHistory.id}`);
      }, 4000); // 4초 후에 페이지 이동

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
    }
  }, [userMBTIHistory, router]); // showAds 또는 router 변경 시 효과 재실행

  if (userMBTIHistory) {
    return <div>Ads</div>;
  }

  return (
    <div>
      <h1>Free Test</h1>
      <ul>
        {props.questions.map((question) => (
          <li key={question.id}>{question.question}</li>
        ))}
      </ul>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button disabled={buttonDisabled} type="button" onClick={handleSubmit}>
        submit
      </button>
    </div>
  );
};
