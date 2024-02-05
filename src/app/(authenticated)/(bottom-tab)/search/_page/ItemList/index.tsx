"use client";

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import RatableContentItem, {
  RatableContentItemSkeleton,
} from "@/components/modules/content/RatableContentItem";
import useSearch from "./useSearch";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useLayoutContext } from "../../_layout/LayoutProvider";
import { calculateSizesFromColumns } from "@/modules/image";

export default function ItemList() {
  const cols = useResponsiveCols();
  const [data, isLoading, error] = useLayoutContext();
  const {
    results: searchResults,
    isSearching,
    error: searchError,
    query,
  } = useSearch({ data });

  if (error || searchError) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error?.message}
      </Alert>
    );
  }

  if (!isSearching && query && searchResults.length === 0) {
    return (
      <Alert severity="info">
        <AlertTitle>No Results!</AlertTitle>
        Please try a different search term.
      </Alert>
    );
  }

  const imageSizes = calculateSizesFromColumns(cols.perBreakpoint);
  const toRender = query ? searchResults : data;

  return (
    <ImageList variant="masonry" cols={cols.value} gap={8}>
      {isLoading || isSearching ? (
        <ListOfSkeletonItems numOfItems={5} />
      ) : (
        toRender.map((item) => (
          <RatableContentItem
            disableRating={false}
            key={item.id}
            imageSizes={imageSizes}
            {...item}
          />
        ))
      )}
    </ImageList>
  );
}

function useResponsiveCols() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));

  const breakpointColumnMap = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
  };

  const cols = {
    value: isXs
      ? breakpointColumnMap.xs
      : isSm
      ? breakpointColumnMap.sm
      : isMd
      ? breakpointColumnMap.md
      : breakpointColumnMap.lg,
    perBreakpoint: breakpointColumnMap,
  };

  return cols;
}

function ListOfSkeletonItems({ numOfItems }: { numOfItems: number }) {
  return new Array(numOfItems)
    .fill(null)
    .map((_, index) => <RatableContentItemSkeleton key={index} />);
}
