"use client";

import React from "react";

// See: https://stackoverflow.com/a/75753855/13339475
// On why we use inputRef instead of autoFocus
export default function useFocusableInput(shouldFocus: boolean = true) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (shouldFocus) {
      timeout = setTimeout(() => {
        if (inputRef && inputRef.current) {
          (
            (
              (inputRef.current as unknown as HTMLElement)
                ?.firstChild as HTMLElement
            )?.firstChild as HTMLElement
          )?.focus();
        }
      }, 100);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [shouldFocus]);

  return {
    inputRef,
  };
}
