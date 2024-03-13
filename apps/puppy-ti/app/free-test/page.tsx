import { UI } from "@puppy-ti/app/free-test/page.client";
import { getQuestions } from "./page.server";

export default async function FreeTestPage() {
  const { questions, error } = await getQuestions();

  if (error || !questions) {
    return <div>Error</div>;
  }

  return <UI questions={questions} />;
}
