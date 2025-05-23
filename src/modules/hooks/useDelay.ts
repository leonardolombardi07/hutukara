"use client";

import { useState, useEffect, useRef } from "react";

interface DelayOptions {
  delay?: number;
  minDuration?: number;
}

type State = "IDLE" | "DELAY" | "DISPLAY" | "EXPIRE";

export const defaultOptions = {
  delay: 500,
  minDuration: 200,
};

function useDelay(loading: boolean, options?: DelayOptions): boolean {
  options = Object.assign({}, defaultOptions, options);

  const [state, setState] = useState<State>("IDLE");
  const timeout = useRef<any>(null);

  useEffect(() => {
    if (loading && state === "IDLE") {
      clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        if (!loading) {
          return setState("IDLE");
        }

        timeout.current = setTimeout(() => {
          setState("EXPIRE");
        }, options?.minDuration);

        setState("DISPLAY");
      }, options?.delay);

      setState("DELAY");
    }

    if (!loading && state !== "DISPLAY") {
      clearTimeout(timeout.current);
      setState("IDLE");
    }
  }, [loading, state, options.delay, options.minDuration]);

  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  return state === "DISPLAY" || state === "EXPIRE";
}

export default useDelay;
