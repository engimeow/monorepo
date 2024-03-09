"use client";
import React, { useContext, useState, useEffect, createContext } from "react";
import { User, createClient, SupabaseClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

interface AuthContextType {
  isLoading: boolean;
  user: User | null | undefined;
}

const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (_event === "INITIAL_SESSION" || _event === "SIGNED_IN") {
          setIsLoading(false);
        }
        if (session?.user) {
          setUser(session.user);
        }
      } catch (error) {
        // todo: sentry
        console.error("unexpected error");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    isLoading: isLoading,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export function useAuth<T extends "required" | "optional" = "optional">() {
  return useContext(AuthContext) as T extends "required"
    ? AuthContextType & { user: DeepRequired<User> }
    : AuthContextType;
}
