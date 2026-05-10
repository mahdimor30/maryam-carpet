"use client";

import { logoutFn } from "@/feature/auth/serverFn/logout";
import { useRouteContext, useRouter } from "@tanstack/react-router";

export function useAuth() {
  const { user } = useRouteContext({
    from: "/_layout",
  });
  const router = useRouter();
  const isAuthed = user?.email;

  const signOut = async () => {
    await logoutFn();
    await router.invalidate();
  };

  return { user, loading: router.load, signOut, isAuthed };
}
