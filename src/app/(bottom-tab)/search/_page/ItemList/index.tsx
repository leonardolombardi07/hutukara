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
import { useContentToBrowse, useUserRatings } from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";

export default function ItemList() {
  const cols = useNumberOfColumns();

  const { user } = useUser();

  const [content = [], isLoadingContent, contentError] = useContentToBrowse();

  const [ratings, isLoadingRatings, ratingError] = useUserRatings(user.uid);

  const {
    results: searchResults,
    isSearching,
    error: searchError,
    query,
  } = useSearch({ data: content });

  const error = contentError || ratingError || searchError;

  if (isLoadingContent || isSearching) {
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

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.message}
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

  const data = query ? searchResults : content;

  return (
    <ImageList variant="masonry" cols={cols} gap={8}>
      {data.map((item) => (
        <RatableContentItem
          key={item.id}
          userRatingValue={
            ratings?.find((rating) => rating.contentId === item.id)?.value
          }
          {...item}
        />
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
