"use client";
import type { Database } from "@puppy-ti/database.types";

interface UIProps {
  data: Array<Database["public"]["Tables"]["questions"]["Row"]>;
}

export const UI = (props: UIProps) => {
  return (
    <div>
      <h1>Free Test</h1>
      <ul>
        {props.data.map((question) => (
          <li key={question.id}>{question.question}</li>
        ))}
      </ul>
    </div>
  );
};
