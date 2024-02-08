"use client";

import * as React from "react";
import MUIRating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import {
  deleteContentRating,
  rateContent,
  saveContentById,
} from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";

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

          saveContentById(contentId);
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
