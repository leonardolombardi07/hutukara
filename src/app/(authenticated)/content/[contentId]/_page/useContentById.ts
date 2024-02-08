"use client";
import { getContentByIds, getContentById } from "@/modules/api/client";
import { ContentCol } from "@/modules/api/types";
import { WithId } from "@/modules/tsUtils";
import React from "react";

export function useContentById(id: string) {
  const [item, setItem] = React.useState<WithId<ContentCol.Doc> | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    async function fetchContent() {
      try {
        const item = await getContentById(id);
        setItem(item);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, [id]);

  return [item, isLoading, error] as const;
}
