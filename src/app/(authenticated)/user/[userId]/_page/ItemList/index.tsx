"use client";

import useUserRatedContent from "@/app/(authenticated)/_hooks/useUserRatedContent";
import UserRatingItemList from "@/components/modules/userRating/ItemList";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import MUILink from "@mui/material/Link";
import Link from "next/link";

export default function ItemList({ uid }: { uid: string }) {
  const [data, isLoading, error] = useUserRatedContent(uid);
  return (
    <UserRatingItemList
      data={data}
      isLoading={isLoading}
      error={error}
      emptyComponent={
        <Alert severity="info">
          <AlertTitle>No rated content!</AlertTitle>
          User has not rated any content yet.
        </Alert>
      }
      disableRating
    />
  );
}
