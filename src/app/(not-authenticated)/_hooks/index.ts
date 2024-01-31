"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/modules/api/client";
import { usePathname } from "next/navigation";
import { getHumanReadableErrorMessage } from "../_utils";
import { useNavigateWithPossibleRedirect } from "@/app/_layout/AuthenticationRouter";

function useContinueWithProvider() {
  const pathname = usePathname();

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>("");

  const navigateWithPossibleRedirect = useNavigateWithPossibleRedirect();

  async function continueWithProvider(provider: "google") {
    setIsLoading(true);
    setError(null);
    try {
      if (pathname === "/signin") {
        await signIn(provider);
      }

      if (pathname === "/signup") {
        await signUp(provider);
      }

      navigateWithPossibleRedirect();
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") return;
      setError(getHumanReadableErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    error,
    continueWithProvider,
  };
}

export { useContinueWithProvider };
