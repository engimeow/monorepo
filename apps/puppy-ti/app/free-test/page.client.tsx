"use client";
import { useAuth } from "@puppy-ti/app/providers/authProvider";
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
  const { user } = useAuth();
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
        const { data, error } =
          await supabase.functions.invoke<USER_MBTI_HISTORY_ROW>(
            "complete-test",
            {
              body: {
                name,
                mbti,
              },
            },
          );

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
        if (user) {
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
