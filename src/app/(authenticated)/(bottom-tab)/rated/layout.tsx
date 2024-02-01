"use client";

import * as React from "react";
import { useContentData, useUserRatings } from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";
import { ContentCol } from "@/modules/api/types";

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
  const { user } = useUser();

  const [ratings = [], isLoadingRatings, ratingError] = useUserRatings(
    user.uid
  );
  const [content = [], isLoadingContent, contentError] = useContentData(
    ratings?.map((r) => r.contentId)
  );

  const data = content.map((item) => {
    return {
      ...item,
      userRatingValue: ratings?.find((rating) => rating.contentId === item.id)
        ?.value,
    };
  });

  const isLoading = isLoadingContent || isLoadingRatings;
  const error = contentError || ratingError;

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
