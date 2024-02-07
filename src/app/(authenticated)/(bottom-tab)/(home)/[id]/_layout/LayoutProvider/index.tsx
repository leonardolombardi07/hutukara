"use client";

import * as React from "react";
import { GroupsCol } from "@/modules/api/types";
import { useParams } from "next/navigation";
import { useGroup } from "@/modules/api/client";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { GROUP_TITLE } from "@/app/constants";

type LayoutContext = [
  GroupsCol.Doc & { id: string },
  boolean,
  Error | null | undefined
];

const LayoutContext = React.createContext<LayoutContext | null>(null);

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  if (!params.id || typeof params.id !== "string") {
    throw new Error("Missing id");
  }

  const [item, isLoading, error] = useGroup(params.id);

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error ? error.message : "No data found"}
      </Alert>
    );
  }

  if (isLoading) {
    // Too much work to handle loading state here
    return null;
  }

  if (item === undefined) {
    return (
      <Alert severity="warning">
        <AlertTitle>Error</AlertTitle>
        This {GROUP_TITLE} has been deleted or does not exist.
      </Alert>
    );
  }

  return (
    <LayoutContext.Provider
      value={[
        {
          ...item,
          id: params.id,
        },
        isLoading,
        error,
      ]}
    >
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
