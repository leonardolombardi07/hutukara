"use client";

import * as React from "react";
import { useContentToBrowse, useUserRatings } from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";
import { ContentCol, UsersCol } from "@/modules/api/types";
import { WithId } from "@/modules/tsUtils";

type Data = {
  data: (ContentCol.Doc & {
    id: string;
    userRatingValue: number | undefined;
  })[];
  ratings: WithId<UsersCol.RatingsSubCol.Doc>[];
};

type LayoutContext = [Data, boolean, Error | null | undefined];

const LayoutContext = React.createContext<LayoutContext | null>(null);

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  const [content, isLoadingContent, contentError] = useContentToBrowse();
  const [ratings = [], isLoadingRatings, ratingError] = useUserRatings(
    user.uid
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
    <LayoutContext.Provider
      value={[
        {
          data,
          ratings,
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
