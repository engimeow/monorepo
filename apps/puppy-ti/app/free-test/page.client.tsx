"use client";
import { invoke } from "@puppy-ti/app/free-test/page.actions";
import type { Database } from "@puppy-ti/database.types";
import { createClient } from "@puppy-ti/lib/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type QUESTION_ROW = Database["public"]["Tables"]["questions"]["Row"];

interface UIProps {
  questions: Array<QUESTION_ROW>;
  authUser: User | null;
  dogName?: string;
}

type USER_MBTI_HISTORY_ROW =
  Database["public"]["Tables"]["user_mbti_history"]["Row"];

type MBTI_ROW = Database["public"]["Enums"]["mbti"];

export const UI = ({ questions, authUser, dogName }: UIProps) => {
  const [userMBTIHistory, setUserMBTIHistory] =
    useState<USER_MBTI_HISTORY_ROW>();
  const [mbti, setMbti] = useState<MBTI_ROW>("ENFJ");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const router = useRouter(); // useRouter 훅을 사용하여 라우터 인스턴스를 가져옵니다.

  const handleSubmit = async () => {
    // const supabase = createClient();
    // const { data, error } =
    //   await supabase.functions.invoke<USER_MBTI_HISTORY_ROW>("complete-test", {
    //     body: {
    //       name: dogName,
    //       mbti,
    //     },
    //   });

    // console.log(data);
    try {
      if (!buttonDisabled) {
        setButtonDisabled(true);

        const { data, error } = await invoke(dogName, mbti);
        console.log(data);

        if (error) {
          throw error;
        }

        if (data) {
          setUserMBTIHistory(data);
        }
      }
    } catch (error) {
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (userMBTIHistory) {
      const timer = setTimeout(() => {
        if (authUser) {
          router.push(`/free-test-results/${userMBTIHistory.id}`);
        } else {
          router.push(`/personalities/${userMBTIHistory.mbti}`);
        }
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [userMBTIHistory, router]);

  if (userMBTIHistory) {
    return <div>Ads</div>;
  }

  return (
    <div>
      <h1>Free Test</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>{question.question}</li>
        ))}
      </ul>
      <button disabled={buttonDisabled} type="button" onClick={handleSubmit}>
        submit
      </button>
    </div>
  );
};
