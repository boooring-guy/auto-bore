import { authClient } from "@/lib/auth-client";
import { useUser } from "@/modules/auth";
import { useQuery } from "@tanstack/react-query";

export function useSubscription() {
  const { user } = useUser();
  const userId = user?.id;

  return useQuery({
    queryKey: ["subscription", userId], // to avoid hydration errors when the user is not logged in or signed in with another account
    queryFn: async () => {
      const { data } = await authClient.customer.state();
      return data;
    },
    enabled: !!userId, // Only run the query when userId exists
  });
}

export function useHasActiveSubscription() {
  const { data: subscriptionState, isLoading, ...rest } = useSubscription();
  const hasActiveSubscription =
    subscriptionState?.activeSubscriptions &&
    subscriptionState.activeSubscriptions.length > 0; // true if there is at least one active subscription

  return {
    hasActiveSubscription,
    subscription: subscriptionState?.activeSubscriptions[0],
    isLoading,
    ...rest,
  };
}
