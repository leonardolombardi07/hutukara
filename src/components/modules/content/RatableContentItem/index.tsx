"use client";

import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ContentRating from "../ContentRating";
import Image from "next/image";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";

export interface RatableContentItemProps {
  id: string;
  Title: string;
  Poster: string;
  userRatingValue: number | null | undefined;
  imageSizes: string;
  disableRating: boolean;
}

const IMAGE_HEIGHT = 300;

export default function RatableContentItem({
  id,
  Title,
  Poster,
  userRatingValue,
  imageSizes,
  disableRating,
}: RatableContentItemProps) {
  return (
    <ImageListItem>
      <Link
        href={`/content/${id}`}
        style={{
          display: "block",
          height: IMAGE_HEIGHT,
          position: "relative",
        }}
      >
        <Image
          src={Poster}
          alt={`Image of ${Title}`}
          fill={true}
          style={{
            objectFit: "contain",
          }}
          sizes={imageSizes}
        />
      </Link>

      <ImageListItemBar
        title={
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              mx: "5px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {Title}
          </Typography>
        }
        subtitle={
          <ContentRating
            disabled={disableRating}
            value={userRatingValue}
            contentId={id}
          />
        }
        position="below"
        sx={{
          px: "5px",
        }}
      />
    </ImageListItem>
  );
}

const IMAGE_LIST_BAR_PROPS = {
  position: "below",
  sx: {
    px: "5px",
  },
} as const;

export function RatableContentItemSkeleton() {
  return (
    <ImageListItem>
      <Skeleton variant="rectangular" height={IMAGE_HEIGHT} />

      <ImageListItemBar
        title={<Skeleton width="80%" sx={{ my: "-2px", mx: "5px" }} />}
        subtitle={<RatingSkeleton />}
        {...IMAGE_LIST_BAR_PROPS}
      />
    </ImageListItem>
  );
}

function StarSkeleton() {
  return (
    <Skeleton variant="circular" width={23} height={23}>
      <Avatar />
    </Skeleton>
  );
}

function RatingSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        my: "1px",
      }}
    >
      <StarSkeleton />
      <StarSkeleton />
      <StarSkeleton />
      <StarSkeleton />
      <StarSkeleton />
    </Box>
  );
}
