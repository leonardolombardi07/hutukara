"use client";

import React from "react";

// See: https://stackoverflow.com/questions/40132775/autofocus-textfield-using-react-material-ui
// On why we use inputRef instead of autoFocus
export default function useFocusableInput(shouldFocus: boolean = true) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const setInputRef = (instance: HTMLInputElement | null) => {
    inputRef.current = instance;
  };

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (shouldFocus) {
      timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [shouldFocus]);

  return {
    setInputRef,
  };
}
