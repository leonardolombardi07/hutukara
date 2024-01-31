"use client";

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import MatchContentItem from "@/components/surfaces/MatchContentItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

type Item = React.ComponentPropsWithoutRef<typeof MatchContentItem>;

export default function ItemList({ data }: { data: Item[] }) {
  const cols = useNumberOfColumns();

  return (
    <ImageList cols={cols}>
      {data.map((item) => (
        <MatchContentItem key={item.id} {...item} />
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
