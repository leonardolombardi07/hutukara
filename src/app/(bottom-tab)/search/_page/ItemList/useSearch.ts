"use client";

import * as React from "react";
import { useQueryState } from "nuqs";
import { useDebounce } from "@uidotdev/usehooks";
import OMBDBApi from "@/modules/OMDBApi";
import { ContentCol } from "@/modules/api/types";

// Currently, we don't have the api key, so we know we'll get an error
const UNREALISTIC_DEBOUNCE_DELAY = 4000;

export default function useSearch({
  data,
}: {
  data: (ContentCol.Doc & { id: string })[];
}) {
  const [query] = useQueryState("query");
  const debouncedQuery = useDebounce(query, UNREALISTIC_DEBOUNCE_DELAY);

  const [results, setResults] = React.useState<
    (ContentCol.Doc & { id: string })[]
  >([]);
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
        if (resultsOnAvaliableData.length) return setResults(data);

        const resultsFromApiSearch = await searchOnAPI(debouncedQuery);
        setResults(resultsFromApiSearch.map((r) => ({ ...r, id: r.imdbID })));
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

async function searchOnAPI(q: string) {
  return OMBDBApi.search(q);
}
