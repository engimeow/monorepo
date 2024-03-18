import { UI } from "@puppy-ti/app/free-test/page.client";
import { getQuestions } from "@puppy-ti/app/free-test/page.server";
import { getAuthUser } from "@puppy-ti/lib/actions/getAuthUser";

export default async function FreeTestPage({
  searchParams,
}: {
  searchParams: { dogName?: string };
}) {
  const { questions, error } = await getQuestions();
  const authUser = await getAuthUser();

  if (error || !questions) {
    return <div>Error</div>;
  }

  return (
    <UI
      questions={questions}
      authUser={authUser}
      dogName={searchParams.dogName}
    />
  );
}
