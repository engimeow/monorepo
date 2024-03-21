import { NavigationUI } from "@puppy-ti/components/navigation.client";
import { getAuthUser } from "@puppy-ti/lib/actions/getAuthUser";

export const Navigation = async () => {
  const authUser = await getAuthUser();
  return <NavigationUI isSignedIn={Boolean(authUser)} />;
};
