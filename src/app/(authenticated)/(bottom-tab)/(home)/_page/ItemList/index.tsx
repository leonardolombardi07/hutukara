"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import ItemCard from "./ItemCard";
import { useQueryState } from "nuqs";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import MUILink from "@mui/material/Link";
import { useLayoutContext } from "../../_layout/LayoutProvider";
import { GROUP_TITLE } from "@/app/constants";

export default function ItemList() {
  const [data, isLoading, error] = useLayoutContext();

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

  if (isLoading) {
    // TODO: add skeleton loader
    return null;
  }

  if (data.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        You don&apos;t have any items yet.{" "}
        <MUILink component={Link} href="/host">
          Host
        </MUILink>{" "}
        or{" "}
        <MUILink component={Link} href="/join">
          join
        </MUILink>{" "}
        a {GROUP_TITLE}!
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
              totalNumberOfMembers={
                item.memberIds.length + item.hostIds.length + 1
              }
              {...item}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
