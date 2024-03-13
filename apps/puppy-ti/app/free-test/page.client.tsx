"use client";
import type { Database } from "@puppy-ti/database.types";
import { createClient } from "@puppy-ti/lib/utils/supabase/client";

type QuestionRow = Database["public"]["Tables"]["questions"]["Row"];

interface UIProps {
  questions: Array<QuestionRow>;
}

export const UI = (props: UIProps) => {
  const handleSubmit = async (e: FormData) => {
    const supabase = createClient();
    await supabase.functions.invoke("complete-test");

    // await supabase.from("user_mbti_history").insert({
    //   name: "test",
    //   mbti: "ENFJ",
    //   ...(userId && { user_id: userId }),
    // });
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
