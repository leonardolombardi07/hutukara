"use client";

import * as React from "react";
import { useQueryState } from "nuqs";
import { useDebounce } from "@uidotdev/usehooks";
import { OMBDBResponse } from "@/modules/OMDBApi";
import { ContentCol } from "@/modules/api/types";

interface ContentWithUserRating extends ContentCol.Doc {
  id: string;
  userRatingValue: number | undefined;
}

export default function useSearch({ data }: { data: ContentWithUserRating[] }) {
  const [query] = useQueryState("query");
  const debouncedQuery = useDebounce(query, 2000);

  const [results, setResults] = React.useState<ContentWithUserRating[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    async function search_() {
      setIsSearching(true);
      setError(null);

      try {
        if (!debouncedQuery) return setResults([]);

        const resultsOnAvaliableData = await searchOnAvaliableData({
          query: debouncedQuery,
          data: data,
        });
        if (resultsOnAvaliableData.length)
          return setResults(resultsOnAvaliableData);

        const resultsFromApiSearch = await searchOnAPI(debouncedQuery);
        setResults(
          resultsFromApiSearch.map((r) => ({
            ...r,
            id: r.imdbID,
            userRatingValue: data.find((d) => d.id === r.imdbID)
              ?.userRatingValue,
          }))
        );
      } catch (error: any) {
        setError(new Error(error?.message || "Something went wrong"));
      } finally {
        setIsSearching(false);
      }
    }

    search_();
  }, [debouncedQuery]);

  return {
    query,
    results,
    isSearching,
    error,
  };
}

async function searchOnAvaliableData<T extends { Title: string }>({
  query,
  data,
}: {
  query: string;
  data: T[];
}) {
  return data.filter((item) =>
    item.Title.toLowerCase().includes(query.toLowerCase())
  );
}

async function searchOnAPI(q: string): Promise<OMBDBResponse[]> {
  await new Promise((resolve) =>
    setTimeout(resolve, randomMSBetween(4000, 6000))
  );
  return [];
  // return OMBDBApi.search(q);
}

function randomMSBetween(min: number, max: number) {
  console.log(Math.floor(Math.random() * (max - min + 1) + min));
  return Math.floor(Math.random() * (max - min + 1) + min);
}
