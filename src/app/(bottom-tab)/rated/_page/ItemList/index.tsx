"use client";

import ImageList from "@mui/material/ImageList";
import { FAKE_DATA } from "../../../(home)/data";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import RatableContentItem from "@/components/surfaces/RatableContentItem";
import { useUserRatedContent } from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function ItemList() {
  const { user } = useUser();
  const cols = useNumberOfColumns();
  const [{ data = [], ratings }, isLoading, error] = useUserRatedContent(
    user.uid
  );

  if (data.length === 0 && isLoading) {
    // TODO: add skeleton loader
    return null;
  }

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    );
  }

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
