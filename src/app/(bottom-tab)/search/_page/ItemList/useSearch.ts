"use client";

import * as React from "react";
import { FAKE_DATA } from "@/app/(bottom-tab)/(home)/data";
import { useQueryState } from "nuqs";
import { useDebounce } from "@uidotdev/usehooks";

const AVALIABLE_RESULTS = FAKE_DATA.map((item) => item.results).flat();

export default function useSearch() {
  const [query] = useQueryState("query");
  const debouncedQuery = useDebounce(query, 500);

  const [results, setResults] = React.useState<any[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function search_() {
      setIsSearching(true);
      setError(null);

      try {
        if (!debouncedQuery) return setResults(AVALIABLE_RESULTS);

        const resultsOnAvaliableData = await searchOnAvaliableData({
          query: debouncedQuery,
          data: AVALIABLE_RESULTS,
        });
        if (resultsOnAvaliableData.length)
          return setResults(resultsOnAvaliableData);

        const resultsFromApiSearch = await searchOnAPI(debouncedQuery);
        setResults(resultsFromApiSearch);
      } catch (error: any) {
        setError(error?.message || "Something went wrong");
      } finally {
        setIsSearching(false);
      }
    }

    search_();
  }, [debouncedQuery]);

  return {
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

async function searchOnAPI(q: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [];
}
