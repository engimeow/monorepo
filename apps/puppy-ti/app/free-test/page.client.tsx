"use client";
import type { Database } from "@puppy-ti/database.types";
import { createClient } from "@puppy-ti/lib/utils/supabase/client";
import { useState } from "react";

type QuestionRow = Database["public"]["Tables"]["questions"]["Row"];

interface UIProps {
  questions: Array<QuestionRow>;
}

type UserMBTIHistoryRow =
  Database["public"]["Tables"]["user_mbti_history"]["Row"];

export const UI = (props: UIProps) => {
  const [showAds, setShowAds] = useState(false);
  const [name, setName] = useState("");
  const [mbti, setMbti] = useState<Database["public"]["Enums"]["mbti"]>();

  const handleSubmit = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase.functions.invoke<
        Database["public"]["Tables"]["user_mbti_history"]["Row"]
      >("complete-test", {
        body: {
          name,
          mbti,
        },
      });
      setShowAds(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (showAds) {
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
      <button disabled={showAds} type="button" onClick={handleSubmit}>
        submit
      </button>
    </div>
  );
};
