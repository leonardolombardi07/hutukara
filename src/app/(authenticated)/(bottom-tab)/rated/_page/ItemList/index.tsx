"use client";

import ImageList from "@mui/material/ImageList";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import RatableContentItem, {
  RatableContentItemSkeleton,
} from "@/components/modules/content/RatableContentItem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useLayoutContext } from "../../_layout/LayoutProvider";
import { calculateSizesFromColumns } from "@/modules/image";
import useDelay from "@/modules/hooks/useDelay";
import MUILink from "@mui/material/Link";
import Link from "next/link";

export default function ItemList() {
  const cols = useResponsiveCols();

  const [data, isLoading, error] = useLayoutContext();
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
    return (
      <Alert severity="info">
        <AlertTitle>No rated content!</AlertTitle>
        Go to{" "}
        <MUILink component={Link} href="/search">
          search
        </MUILink>{" "}
        and rate some content!
      </Alert>
    );
  }

  const imageSizes = calculateSizesFromColumns(cols.perBreakpoint);

  return (
    <ImageList variant="masonry" cols={cols.value} gap={8}>
      {delayedIsLoading ? (
        <ListOfSkeletonItems numOfItems={5} />
      ) : (
        data.map((item) => (
          <RatableContentItem key={item.id} imageSizes={imageSizes} {...item} />
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
