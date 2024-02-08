"use client";

import * as React from "react";
import MUIRating from "@mui/material/Rating";
import Box, { BoxProps } from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import {
  deleteContentRating,
  rateContent,
  saveContentIfNotInDb,
} from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";

interface RatingProps {
  value: number | null | undefined;
  contentId: string;
  size?: "small" | "medium" | "large";
  readOnly?: boolean;
}

export default function ContentRating({
  value,
  contentId,
  size,
  readOnly,
}: RatingProps) {
  const { user } = useUser();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <MUIRating
        value={value === undefined ? null : value}
        readOnly={readOnly}
        precision={0.5}
        size={size || "medium"}
        onChange={(event, newValue) => {
          if (newValue === null) {
            return deleteContentRating({ userId: user.uid, contentId });
          }

          saveContentIfNotInDb(contentId);
          rateContent({
            userId: user.uid,
            contentId,
            value: newValue,
          });
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  );
}

interface ContentRatingSkeletonProps extends BoxProps {
  size?: "small" | "medium" | "large";
}

export function ContentRatingSkeleton({
  size,
  sx,
  ...rest
}: ContentRatingSkeletonProps) {
  const dimensions = React.useMemo(() => {
    switch (size) {
      case "small":
        return { width: 18, height: 18 };
      case "medium":
        return { width: 23, height: 23 };
      case "large":
        return { width: 26, height: 26 };
      default:
        return { width: 23, height: 23 };
    }
  }, [size]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        ...sx,
      }}
      {...rest}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} variant="circular" {...dimensions}>
          <Avatar />
        </Skeleton>
      ))}
    </Box>
  );
}
