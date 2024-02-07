"use client";

import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar, {
  ImageListItemBarProps,
} from "@mui/material/ImageListItemBar";
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
  readOnlyRating: boolean;
}

const IMAGE_HEIGHT = 300;

export default function RatableContentItem({
  id,
  Title,
  Poster,
  userRatingValue,
  imageSizes,
  readOnlyRating,
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
            readOnly={readOnlyRating}
            value={userRatingValue}
            contentId={id}
          />
        }
        {...SHARED_IMAGE_LIST_BAR_PROPS}
      />
    </ImageListItem>
  );
}

const SHARED_IMAGE_LIST_BAR_PROPS: ImageListItemBarProps = {
  position: "below",
  sx: {
    px: "5px",
  },
};

export function RatableContentItemSkeleton() {
  return (
    <ImageListItem>
      <Skeleton variant="rectangular" height={IMAGE_HEIGHT} />

      <ImageListItemBar
        title={<Skeleton width="80%" sx={{ my: "-2px", mx: "5px" }} />}
        subtitle={<RatingSkeleton />}
        {...SHARED_IMAGE_LIST_BAR_PROPS}
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
