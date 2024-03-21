"use client";
import { invoke } from "@puppy-ti/app/free-test/page.actions";
import type { Database } from "@puppy-ti/database.types";
import { page } from "@puppy-ti/lib/constraints/styles";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { chunk } from "@puppy-ti/lib/utils/array/chunk";
import { clsx } from "clsx";

type QUESTION_ROW = Database["public"]["Tables"]["questions"]["Row"];

interface UIProps {
  questions: Array<QUESTION_ROW>;
  authUser: User | null;
  dogName?: string;
}

interface Score {
  questionId: number;
  score: number;
}

type USER_MBTI_HISTORY_ROW =
  Database["public"]["Tables"]["user_mbti_history"]["Row"];

type MBTI_ROW = Database["public"]["Enums"]["mbti"];

export const UI = ({ questions, authUser, dogName }: UIProps) => {
  const router = useRouter();

  const [userMBTIHistory, setUserMBTIHistory] =
    useState<USER_MBTI_HISTORY_ROW>();
  const [steps, setSteps] = useState<number>(0);
  const chunkSize = useMemo(() => 5, []);
  const maxStep = useMemo(() => chunk(questions, chunkSize).length, []);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [scores, setScores] = useState<Score[]>([]);
  const answeredQuestionsCount = useMemo(() => {
    const uniqueQuestionIds = new Set(scores.map((score) => score.questionId));
    return uniqueQuestionIds.size;
  }, [scores]);

  const progressPercentage = useMemo(() => {
    return (answeredQuestionsCount / questions.length) * 100;
  }, [answeredQuestionsCount, questions.length]);

  const calculateMBTIScore = (): MBTI_ROW => {
    const scoreMap = {
      E: 0,
      I: 0,
      N: 0,
      S: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    };

    scores.forEach(({ questionId, score }) => {
      const question = questions.find((question) => question.id === questionId);
      if (question) {
        scoreMap[question.mbti as keyof typeof scoreMap] += score;
      }
    });

    const mbtiResult =
      `${scoreMap["E"] > scoreMap["I"] ? "E" : "I"}` +
      `${scoreMap["N"] > scoreMap["S"] ? "N" : "S"}` +
      `${scoreMap["T"] > scoreMap["F"] ? "T" : "F"}` +
      `${scoreMap["J"] > scoreMap["P"] ? "J" : "P"}`;

    return mbtiResult as MBTI_ROW;
  };

  const handleSubmit = async () => {
    try {
      const allAnswered = isAllAnswered();
      if (!allAnswered) {
        alert("모든 질문에 답해주세요.");
        return;
      }
      if (!buttonDisabled) {
        setButtonDisabled(true);

        const finalMBTI = calculateMBTIScore();

        const { data, error } = await invoke(dogName, finalMBTI);

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

  const isAllAnswered = () => {
    const currentQuestions = chunk(questions, chunkSize)[steps];

    if (!currentQuestions) {
      return;
    }

    return currentQuestions.every((question) =>
      scores.some((score) => score.questionId === question.id),
    );
  };

  const handleNext = () => {
    const allAnswered = isAllAnswered();
    if (allAnswered) {
      setSteps(steps + 1);
    } else {
      alert("모든 질문에 답해주세요.");
    }
  };

  const renderButton = useCallback(() => {
    if (steps === maxStep - 1) {
      return (
        <button
          className={clsx([
            "block-shape button-shadow text-white block-txt bg-[#C4A5FA] mx-[30px]",
          ])}
          disabled={buttonDisabled}
          type="button"
          onClick={handleSubmit}
        >
          결과보기
        </button>
      );
    }

    return (
      <button
        className={clsx([
          "block-shape button-shadow text-white block-txt bg-[#C4A5FA] mx-[30px]",
        ])}
        disabled={buttonDisabled}
        type="button"
        onClick={handleNext}
      >
        다음
      </button>
    );
  }, [steps, scores]);

  const renderQuestions = useCallback(() => {
    const questionsByStep = chunk(questions, chunkSize)[steps];

    const isScoreChecked = (
      selectedScore: number | undefined,
      currentScore: number,
    ) => {
      if (selectedScore === undefined) return false;

      if (selectedScore >= 0)
        return currentScore >= 0 && currentScore <= selectedScore;

      return currentScore <= 0 && currentScore >= selectedScore;
    };

    if (questionsByStep) {
      return (
        <ul className="space-y-7">
          {questionsByStep.map((question) => (
            <li className="bg-white pb-4 sm:pb-10" key={question.id}>
              <div className="flex flex-row text-white text-center text-2xl">
                <span className="bg-[#9E446F] w-full">아니다</span>
                <span className="bg-[#7846D0] w-full">그렇다</span>
              </div>
              <p className="text-[#333333] text-3xl mt-4 sm:mt-6 mb-3 px-3 sm:px-12">
                {question.question}
              </p>
              <div className="flex flex-row justify-between px-3 sm:px-12">
                {[-3, -2, -1, 0, 1, 2, 3].map((score) => {
                  const selectedScoreObj = scores.find(
                    (s) => s.questionId === question.id,
                  );
                  const selectedScore = selectedScoreObj
                    ? selectedScoreObj.score
                    : undefined;

                  const color =
                    Math.sign(score) === 1
                      ? "purple"
                      : Math.sign(score) === -1
                        ? "magenta"
                        : "gray";

                  return (
                    <div
                      key={`${question.id}${score}`}
                      className="cursor-pointer"
                      onClick={() => handleScoreChange(question.id, score)}
                    >
                      <Image
                        src={`/footprint/footprint_${color}_${isScoreChecked(selectedScore, score) ? "filled" : "outline"}.svg`}
                        alt={`/footprint/footprint_${color}_${isScoreChecked(selectedScore, score) ? "filled" : "outline"}`}
                        width={0}
                        height={0}
                        className="w-[32px] h-[32px] sm:w-[65px] sm:h-[65px]"
                      />
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      );
    }

    return;
  }, [steps, scores]);

  const progressBar = useMemo(
    () => (
      <div className="flex flex-col min-h-[230px] sm:min-h-[400px] mx-[30px]">
        <div className="w-full h-[25px] sm:h-[50px] bg-white rounded-xl mt-auto mb-[30px] relative">
          <div
            className="bg-[#C4A5FA] h-full absolute left-0 top-0 rounded-xl"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
          <Image
            src="walk.svg"
            alt="walk"
            width={142}
            height={144}
            className="absolute bottom-[25px] sm:bottom-[50px]"
            style={{
              width: "142px",
              height: "144px",
              right: `${100 - progressPercentage}%`,
            }}
          />
          {progressPercentage === 100 && (
            <Image
              src="pop.svg"
              alt="pop"
              width={142}
              height={144}
              className="absolute bottom-[25px] sm:bottom-[50px]"
              style={{
                width: "142px",
                height: "144px",
                right: `${100 - progressPercentage}%`,
              }}
            />
          )}
        </div>
      </div>
    ),
    [progressPercentage],
  );

  const handleScoreChange = (questionId: number, score: number) => {
    const updatedScores = scores.filter((s) => s.questionId !== questionId);
    updatedScores.push({ questionId, score });
    setScores(updatedScores);
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
    <div className={page}>
      <Image
        src="/bg-stripe.svg"
        alt="bg-stripe-top"
        width={205}
        height={272}
        className="absolute z-[-1] top-0 right-0"
        priority
      />
      {progressBar}
      <div className="flex-col-m w-full mb-20 page-inner px-0">
        {renderQuestions()}
        {renderButton()}
      </div>
      <Image
        src="/landing-bg-bottom.png"
        alt="landing-bg-bottom.png"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full absolute z-[-1] bottom-0"
        priority
      />
    </div>
  );
};
