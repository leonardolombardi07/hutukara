"use client";

import UserRatingItemList from "@/components/modules/userRating/ItemList";
import { useLayoutContext } from "../../_layout/LayoutProvider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import MUILink from "@mui/material/Link";
import Link from "next/link";

export default function ItemList() {
  const [data, isLoading, error] = useLayoutContext();
  return (
    <UserRatingItemList
      data={data}
      isLoading={isLoading}
      error={error}
      emptyComponent={
        <Alert severity="info">
          <AlertTitle>No rated content!</AlertTitle>
          Go to{" "}
          <MUILink component={Link} href="/search">
            search
          </MUILink>{" "}
          and rate some content!
        </Alert>
      }
      readOnlyRating={false}
    />
  );
}
