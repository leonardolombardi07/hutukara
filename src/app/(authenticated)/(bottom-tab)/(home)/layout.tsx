"use client";

import * as React from "react";
import { useUserGroups } from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";
import { GroupsCol } from "@/modules/api/types";

type LayoutContext = [
  (GroupsCol.Doc & {
    id: string;
  })[],
  boolean,
  Error | null | undefined
];

const LayoutContext = React.createContext<LayoutContext | null>(null);

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [data = [], isLoading, error] = useUserGroups(user.uid);

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
