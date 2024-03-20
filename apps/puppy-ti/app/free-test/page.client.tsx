"use client";
import { invoke } from "@puppy-ti/app/free-test/page.actions";
import type { Database } from "@puppy-ti/database.types";
import { page } from "@puppy-ti/lib/constraints/styles";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { chunk } from "@puppy-ti/lib/utils/array/chunk";

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
  const [steps, setSteps] = useState<number>(0);
  const chunkSize = useMemo(() => 5, []);
  const maxStep = useMemo(() => chunk(questions, chunkSize).length, []);
  const [mbti, setMbti] = useState<MBTI_ROW>("ENFJ");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      if (!buttonDisabled) {
        setButtonDisabled(true);

        const { data, error } = await invoke(dogName, mbti);

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

  const handleNext = () => {
    setSteps(steps + 1);
  };

  const renderButton = useCallback(() => {
    if (steps === maxStep - 1) {
      return (
        <button disabled={buttonDisabled} type="button" onClick={handleSubmit}>
          submit
        </button>
      );
    }

    return (
      <button type="button" onClick={handleNext}>
        next
      </button>
    );
  }, [steps]);

  const renderQuestions = useCallback(() => {
    // return (
    //   <ul>
    //     {questions.map((question) => (
    //       <li key={question.id}>{question.question}</li>
    //     ))}
    //   </ul>
    // );
    const questionsByStep = chunk(questions, chunkSize)[steps];
    if (questionsByStep) {
      return (
        <ul>
          {questionsByStep.map((question) => (
            <li key={question.id}>{question.question}</li>
          ))}
        </ul>
      );
    }

    return;
  }, [steps]);

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
    <div className={page}>
      <Image
        src="/bg-stripe.svg"
        alt="bg-stripe-top"
        width={205}
        height={272}
        className="absolute z-[-1] top-0 right-0"
        priority
      />
      {renderQuestions()}
      {renderButton()}
    </div>
  );
};
