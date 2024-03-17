import { useAuth } from "@puppy-ti/app/providers/authProvider";
import Link from "next/link";

const linkStyle = "text-black text-xl w-full text-center p-4 hover:bg-gray-100";

export const NavigationSignIn = () => {
  const { user, isLoading } = useAuth();

  if (isLoading || user) {
    return;
  }

  return (
    <Link className={linkStyle} href="/sign-in">
      Sign In
    </Link>
  );
};
