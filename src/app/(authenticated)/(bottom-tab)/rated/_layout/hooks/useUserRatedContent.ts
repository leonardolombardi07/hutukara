"use client";

import * as React from "react";
import { getContentByIds, onUserRatingsSnapshot } from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";
import { ContentCol, UsersCol } from "@/modules/api/types";
import { Timestamp } from "firebase/firestore";

export default function useUserRatedContent() {
  const { user } = useUser();

  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<
    (ContentCol.Doc & {
      id: string;
      userRatingValue: number | undefined;
      userRatingUpdatedAt: Timestamp | undefined;
    })[]
  >([]);
  const [error, setError] = React.useState<Error | null | undefined>();

  React.useEffect(() => {
    const unsubscribe = onUserRatingsSnapshot(user.uid, {
      next: async function getData(snapshot) {
        setIsLoading(true);
        setError(null);

        try {
          const changes = snapshot.docChanges();

          const addedContentIds: string[] = [];
          const deletedContentIds: string[] = [];
          const modifiedRatings: UsersCol.RatingsSubCol.Doc[] = [];

          for (const change of changes) {
            const contentId = change.doc.data().contentId;

            if (change.type === "added") {
              addedContentIds.push(contentId);
            }

            if (change.type === "removed") {
              deletedContentIds.push(contentId);
            }

            if (change.type === "modified") {
              modifiedRatings.push(change.doc.data());
            }
          }

          const ratings = snapshot.docs.map((doc) => doc.data());

          const addedContent = await getAddedContent(addedContentIds, {
            ratings,
          });

          setData((prev) => {
            const modified = applyModificationsOnPrevState(
              [
                ...addedContent,
                ...getPrevStateWithoutDeleted(prev, deletedContentIds),
              ],
              modifiedRatings
            );
            return modified.sort((a, b) => {
              if (a.userRatingUpdatedAt && b.userRatingUpdatedAt) {
                return (
                  b.userRatingUpdatedAt.toMillis() -
                  a.userRatingUpdatedAt.toMillis()
                );
              }
              return 0;
            });
          });
        } catch (error: any) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      },
      error: setError,
    });

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  return [data, isLoading, error] as const;
}

async function getAddedContent(
  ids: string[],
  {
    ratings,
  }: {
    ratings: UsersCol.RatingsSubCol.Doc[];
  }
) {
  const withoutRatings = ids.length === 0 ? [] : await getContentByIds(ids);

  return withoutRatings.map((item) => {
    const foundRating = ratings.find((rating) => rating.contentId === item.id);
    return {
      ...item,
      userRatingValue: foundRating?.value,
      userRatingUpdatedAt: foundRating?.updatedAt,
    };
  });
}

function getPrevStateWithoutDeleted(
  prev: (ContentCol.Doc & {
    id: string;
    userRatingValue: number | undefined;
    userRatingUpdatedAt: Timestamp | undefined;
  })[],
  deletedContentIds: string[]
) {
  return prev.filter((item) => !deletedContentIds.includes(item.id));
}

function applyModificationsOnPrevState(
  prev: (ContentCol.Doc & {
    id: string;
    userRatingValue: number | undefined;
    userRatingUpdatedAt: Timestamp | undefined;
  })[],
  modifiedRatings: UsersCol.RatingsSubCol.Doc[]
) {
  return prev.map((item) => {
    const modifiedRating = modifiedRatings.find(
      (rating) => rating.contentId === item.id
    );

    if (modifiedRating) {
      return {
        ...item,
        userRatingValue: modifiedRating.value,
        userRatingUpdatedAt: modifiedRating.updatedAt,
      };
    }

    return item;
  });
}
