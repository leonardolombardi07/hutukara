"use client";

import * as React from "react";
import { useQueryState } from "nuqs";
import { useDebounce } from "@uidotdev/usehooks";
import OMBDBApi from "@/modules/OMDBApi";
import { saveSearchContent } from "@/modules/api/client";

type PartialContent = Awaited<
  ReturnType<typeof OMBDBApi.search>
>["data"][number];

interface ContentWithUserRating extends PartialContent {
  id: string;
  userRatingValue: number | undefined;
}

export default function useSearch({ data }: { data: ContentWithUserRating[] }) {
  const [query] = useQueryState("query");
  const debouncedQuery = useDebounce(query, 500);

  const [results, setResults] = React.useState<ContentWithUserRating[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (query) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [query]);

  React.useEffect(() => {
    async function search_() {
      setError(null);

      try {
        if (!debouncedQuery) return setResults([]);

        const resultsOnAvaliableData = searchOnAvaliableData({
          query: debouncedQuery,
          data: data,
        });
        if (resultsOnAvaliableData.length)
          return setResults(resultsOnAvaliableData);

        setIsSearching(true);
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
    // data would cause an infinite loop rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return {
    query,
    results,
    isSearching,
    error,
  };
}

function searchOnAvaliableData<T extends { Title: string }>({
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

async function searchOnAPI(q: string) {
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) =>
      setTimeout(resolve, randomMSBetween(4000, 6000))
    );
    return [];
  }

  const { data: searchResults } = await OMBDBApi.search(q);
  saveOnDatabaseWithoutBlockingTheUI(searchResults);
  return searchResults;
}

async function saveOnDatabaseWithoutBlockingTheUI(
  searchResults: Awaited<ReturnType<typeof OMBDBApi.search>>["data"]
) {
  saveSearchContent(searchResults);
}

function randomMSBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
