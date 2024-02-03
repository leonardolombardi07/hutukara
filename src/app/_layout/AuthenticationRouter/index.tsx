"use client";

import * as React from "react";
import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUserContext } from "../UserProvider";

function AuthenticationRouter({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isInAuthRoute = useIsInAuthRoute();
  const { user, isLoading } = useUserContext();

  const isAuthenticated = Boolean(user);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated && !isInAuthRoute) {
      // Preserve the intended route in the URL
      router.push(`/signin?${REDIRECT_SEARCH_PARAM_KEY}=${pathname}`);
    }
  }, [isLoading, isAuthenticated, isInAuthRoute, router, pathname]);

  if (isLoading || (!isAuthenticated && !isInAuthRoute)) {
    // TODO: maybe add a loading spinner here if it takes too long
    return null;
  }

  // See: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  // On why we need to Suspense here
  return <Suspense>{children}</Suspense>;
}

const REDIRECT_SEARCH_PARAM_KEY = "redirectTo";

function useNavigateWithPossibleRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get(REDIRECT_SEARCH_PARAM_KEY);

  const navigateToCorrectRoute = React.useCallback(() => {
    router.push(redirectTo || "/");
  }, [router, redirectTo]);

  return navigateToCorrectRoute;
}

const AUTH_ROUTES = ["/signin", "/signup", "/forgot-password"];

function useIsInAuthRoute() {
  const pathname = usePathname();
  return AUTH_ROUTES.includes(pathname);
}

export { useNavigateWithPossibleRedirect };

export default AuthenticationRouter;
