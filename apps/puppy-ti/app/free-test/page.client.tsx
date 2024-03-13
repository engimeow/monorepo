"use client";
import type { Database } from "@puppy-ti/database.types";
import { createClient } from "@puppy-ti/lib/utils/supabase/client";
import { useState } from "react";

type QuestionRow = Database["public"]["Tables"]["questions"]["Row"];

interface UIProps {
  questions: Array<QuestionRow>;
}

export const UI = (props: UIProps) => {
  const [showAds, setShowAds] = useState(false);
  const [name, setName] = useState("");
  const [mbti, setMbti] = useState<Database["public"]["Enums"]["mbti"]>();

  const handleSubmit = async (e: FormData) => {
    try {
      const supabase = createClient();
      const { data } = await supabase.functions.invoke("complete-test", {
        body: {
          name,
          mbti,
        },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Free Test</h1>
      <form action={handleSubmit}>
        <ul>
          {props.questions.map((question) => (
            <li key={question.id}>{question.question}</li>
          ))}
        </ul>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
