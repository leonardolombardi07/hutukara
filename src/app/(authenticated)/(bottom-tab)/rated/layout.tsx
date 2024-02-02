"use client";

import * as React from "react";
import { ContentCol } from "@/modules/api/types";
import useUserRatedContent from "./_layout/hooks/useUserRatedContent";

type LayoutContext = [
  (ContentCol.Doc & {
    id: string;
    userRatingValue: number | undefined;
  })[],
  boolean,
  Error | null | undefined
];

const LayoutContext = React.createContext<LayoutContext | null>(null);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [data, isLoading, error] = useUserRatedContent();

  return (
    <LayoutContext.Provider value={[data, isLoading, error]}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutContext() {
  const context = React.useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "useLayoutContext must be used within a LayoutContextProvider"
    );
  }
  return context;
}
