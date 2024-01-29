"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import { Item } from "../../types";
import ItemCard from "../ItemCard";
import { useQueryState } from "nuqs";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface ItemListProps {
  data: Item[];
}

export default function ItemList({ data }: ItemListProps) {
  const [filter] = useQueryState("filter", {
    history: "push",
  });

  if (data.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        You don&apos;t have any items yet. <Link href="?host=true">Host</Link>{" "}
        or <Link href="?host=true">join</Link> a party!
      </Typography>
    );
  }

  const withStatus = data.map((item) => ({
    status: item.results.length > 0 ? "finished" : "ongoing",
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
        No items found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {filteredData.map((item) => {
        return (
          <Grid item key={item.id} xs={12} md={6} xl={4}>
            <ItemCard {...item} />
          </Grid>
        );
      })}
    </Grid>
  );
}
