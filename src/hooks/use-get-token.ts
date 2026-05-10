import { useRouteContext } from "@tanstack/react-router";

export const useGetToken = () => {
  const { accessToken } = useRouteContext({
    from: "/_authed",
  });

  return accessToken;
};
