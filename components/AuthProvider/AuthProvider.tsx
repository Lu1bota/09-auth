"use client";

import { getMe, session } from "@/lib/api/clientApi";
import { useAuthUser } from "@/lib/store/authStore";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthUser((state) => state.setUser);
  const clearIsAuthenticated = useAuthUser(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    function fetchUser() {
      session()
        .then(async () => {
          const user = await getMe();
          if (user) setUser(user);
        })
        .catch(() => {
          clearIsAuthenticated();
        });
    }
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
}
