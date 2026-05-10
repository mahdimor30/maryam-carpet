import { useRouteContext } from "@tanstack/react-router";

export const useGetPlans = () => {
  try {
    const { user } = useRouteContext({
      from: "/_authed",
    });

    const plans = user?.active_subscription?.plan;

    return plans;
  } catch (error) {
    return null;
  }
};
