"use client";

import React from "react";
import { useRouter } from "next/navigation";

export function useSafeGoBack() {
  const router = useRouter();

  const sabeGoBack = React.useCallback(() => {
    if (history?.length > 2) {
      // Not sure why we need 2 instead of one. Probably because of redirects?
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  return sabeGoBack;
}
