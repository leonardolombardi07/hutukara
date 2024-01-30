"use client";

import ImageList from "@mui/material/ImageList";
import { FAKE_DATA } from "../../../(home)/data";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import RatableContentItem from "@/components/surfaces/RatableContentItem";

export default function ItemList() {
  const cols = useNumberOfColumns();
  const data = FAKE_DATA.map((item) => item.results)
    .flat()
    .slice(0, 2);

  return (
    <ImageList variant="masonry" cols={cols} gap={8}>
      {data.map((item) => (
        <RatableContentItem key={item.id} {...item} />
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
