"use client";

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import RatableContentItem from "@/components/surfaces/RatableContentItem";
import useSearch from "./useSearch";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import { useLayoutContext } from "../../layout";

export default function ItemList() {
  const cols = useNumberOfColumns();

  const [data, isLoading, error] = useLayoutContext();

  const {
    results: searchResults,
    isSearching,
    error: searchError,
    query,
  } = useSearch({ data });

  if (isLoading || isSearching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 10,
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (error || searchError) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error?.message}
      </Alert>
    );
  }

  if (query && searchResults.length === 0) {
    return (
      <Alert severity="info">
        <AlertTitle>No Results!</AlertTitle>
        Please try a different search term.
      </Alert>
    );
  }

  const toRender = query ? searchResults : data;

  return (
    <ImageList variant="masonry" cols={cols} gap={8}>
      {toRender.map((item) => (
        <RatableContentItem key={item.id} {...item} />
      ))}
    </ImageList>
  );
}

function useNumberOfColumns() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));

  if (isXs) return 2;
  if (isSm) return 3;
  if (isMd) return 4;
  else return 5;
}
