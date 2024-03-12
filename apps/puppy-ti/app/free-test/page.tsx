import { UI } from "@puppy-ti/app/free-test/page.client";
import { getServersideProps } from "./page.server";

export default async function FreeTestPage() {
  const { data, error } = await getServersideProps();

  if (error || !data) {
    return <div>Error</div>;
  }

  return <UI data={data} />;
}
