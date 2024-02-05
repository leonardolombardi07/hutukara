"use client";

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import MatchContentItem from "@/components/modules/content/MatchContentItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { calculateSizesFromColumns } from "@/modules/image";

type Item = Omit<
  React.ComponentPropsWithoutRef<typeof MatchContentItem>,
  "imageSizes"
>;

export default function ItemList({ data }: { data: Item[] }) {
  const cols = useResponsiveCols();

  const imageSizes = calculateSizesFromColumns(cols.perBreakpoint);

  return (
    <ImageList cols={cols.value}>
      {data.map((item) => (
        <MatchContentItem key={item.id} imageSizes={imageSizes} {...item} />
      ))}
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
