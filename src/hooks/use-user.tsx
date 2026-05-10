import { redirect, useRouteContext } from "@tanstack/react-router";

export const useUser = () => {
  const context = useRouteContext({ from: "__root__" });

  if (!context) {
    throw redirect({ to: "/auth" });
  }
  const user = context?.user;
  return user;
};
