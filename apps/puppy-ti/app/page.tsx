"use client";

import { LogoutButton } from "./logout";
import { useAuth } from "./providers/authProvider";

export default function Page(): JSX.Element {
  const { user } = useAuth<"required">();

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <LogoutButton />
    </div>
  );
}
