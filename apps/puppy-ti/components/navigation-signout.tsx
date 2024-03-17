import { Dispatch, SetStateAction, useCallback } from "react";
import { supabase, useAuth } from "@puppy-ti/app/providers/authProvider";

const signOutStyle =
  "w-full text-center p-4 hover:bg-gray-100 text-red-500 text-xl";

interface NavigationSignOutProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NavigationSignOut = ({ setIsOpen }: NavigationSignOutProps) => {
  const { user, isLoading } = useAuth();

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(false);
    }
  }, []);

  if (isLoading || !user) {
    return;
  }

  return (
    <button className={signOutStyle} onClick={handleSignOut}>
      Sign Out
    </button>
  );
};
