"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import ItemCard, { LoadingItemCard } from "./ItemCard";
import { useQueryState } from "nuqs";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import MUILink from "@mui/material/Link";
import { useLayoutContext } from "../../_layout/LayoutProvider";
import { GROUP_TITLE, PLURALIZED_GROUP_TITLE } from "@/app/constants";
import useDelay from "@/modules/hooks/useDelay";
import { useNavigateOnlyIfContentRated } from "../../_layout/GoRateContentProvider";

export default function ItemList() {
  const [data, isLoading, error] = useLayoutContext();
  const navigateIfContentRated = useNavigateOnlyIfContentRated();
  const delayedIsLoading = useDelay(isLoading);

  const [filter] = useQueryState("filter", {
    history: "push",
  });

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    );
  }

  if (delayedIsLoading) {
    return <ListOfSkeletonItems numOfItems={3} />;
  }

  if (isLoading) {
    return null;
  }

  if (data.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        You don&apos;t have any {PLURALIZED_GROUP_TITLE.toLowerCase()} yet.{" "}
        <MUILink
          onClick={(event) => {
            event.preventDefault();
            navigateIfContentRated("/create");
          }}
          sx={{
            cursor: "pointer",
          }}
        >
          Create
        </MUILink>{" "}
        or{" "}
        <MUILink
          onClick={(event) => {
            event.preventDefault();
            navigateIfContentRated("/join");
          }}
          sx={{
            cursor: "pointer",
          }}
        >
          Join
        </MUILink>{" "}
        a {GROUP_TITLE.toLowerCase()}!
      </Typography>
    );
  }

  const withStatus = data.map((item) => ({
    status: item.matchIds.length > 0 ? "finished" : "ongoing",
    ...item,
  }));

  const filteredData = withStatus.filter((item) => {
    if (!filter) {
      return true;
    }

    if (filter === "ongoing") {
      return item.status === "ongoing";
    }

    if (filter === "finished") {
      return item.status === "finished";
    }

    return false;
  });

  if (filteredData.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        No filtered items found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {filteredData.map((item) => {
        return (
          <Grid item key={item.id} xs={12} md={6} xl={4}>
            <ItemCard
              {...item}
              totalNumberOfMembers={
                item.memberIds.length + item.hostIds.length + 1
              }
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

function ListOfSkeletonItems({ numOfItems }: { numOfItems: number }) {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: numOfItems }).map((_, index) => (
        <Grid item key={index} xs={12} md={6} xl={4}>
          <LoadingItemCard />
        </Grid>
      ))}
    </Grid>
  );
}
