"use client";

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import MatchContentItem, {
  MatchContentItemSkeleton,
} from "@/components/modules/content/MatchContentItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { calculateSizesFromColumns } from "@/modules/image";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import useDelay from "@/modules/hooks/useDelay";
import Typography from "@mui/material/Typography";

type Item = Omit<
  React.ComponentPropsWithoutRef<typeof MatchContentItem>,
  "imageSizes"
>;

interface ItemListProps {
  data: Item[];
  isLoading: boolean;
  error: Error | null | undefined;
  emptyComponent: React.ReactNode;
}

export default function ItemList({
  data,
  isLoading,
  error,
  emptyComponent,
}: ItemListProps) {
  const cols = useResponsiveCols();
  const delayedIsLoading = useDelay(isLoading);

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    );
  }

  if (!isLoading && data.length === 0) {
    return emptyComponent;
  }

  const imageSizes = calculateSizesFromColumns(cols.perBreakpoint);

  return (
    <React.Fragment>
      <Typography variant="h4" sx={{ fontWeight: "bold", m: 2 }}>
        Your Matches
      </Typography>

      <ImageList cols={cols.value}>
        {delayedIsLoading ? (
          <ListOfSkeletonItems numOfItems={5} />
        ) : (
          <React.Fragment>
            {data.map((item) => (
              <MatchContentItem
                key={item.id}
                imageSizes={imageSizes}
                {...item}
              />
            ))}
          </React.Fragment>
        )}
      </ImageList>
    </React.Fragment>
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
    .map((_, index) => <MatchContentItemSkeleton key={index} />);
}
