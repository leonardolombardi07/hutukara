import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar, {
  ImageListItemBarProps,
} from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";

export interface MatchContentItemProps {
  id?: string;
  Poster?: string;
  Title: string;
  score: number;
  imageSizes: string;
}

const IMAGE_HEIGHT = 300;

export default function MatchContentItem({
  id,
  Poster,
  Title,
  score,
  imageSizes,
}: MatchContentItemProps) {
  return (
    <ImageListItem>
      {Poster && id ? (
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
      ) : null}

      <ImageListItemBar
        title={
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {Title}
          </Typography>
        }
        subtitle={
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: "success.main",
            }}
          >
            {score * 100}% Match
          </Typography>
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

export function MatchContentItemSkeleton() {
  return (
    <ImageListItem>
      <Skeleton variant="rectangular" height={IMAGE_HEIGHT} />

      <ImageListItemBar
        title={<Skeleton width="80%" />}
        subtitle={
          <Skeleton
            width="40%"
            sx={{
              my: "-2px",
              mx: "5px",
            }}
          />
        }
        {...SHARED_IMAGE_LIST_BAR_PROPS}
      />
    </ImageListItem>
  );
}
