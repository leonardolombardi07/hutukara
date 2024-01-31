"use client";

import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ContentRating from "../ContentRating";
import { useUserRatings } from "@/modules/api/client";
import { useUser } from "@/app/_layout/UserProvider";

interface RatableContentItemProps {
  id: string;
  Title: string;
  Poster: string;
}

export default function RatableContentItem({
  id,
  Title,
  Poster,
}: RatableContentItemProps) {
  const { user } = useUser();
  const [ratings, isLoadingRatings, error] = useUserRatings(user.uid);

  if (isLoadingRatings) {
    // TODO: add skeleton loader
    return null;
  }

  if (error || !ratings) {
    // TODO: handle error
    return null;
  }

  const userRating = ratings.find((rating) => rating.contentId === id);

  return (
    <ImageListItem>
      <Link
        href={`/content/${id}`}
        style={{
          display: "block",
          height: "100%",
        }}
      >
        {Poster ? (
          <img
            srcSet={`${Poster}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${Poster}?w=248&fit=crop&auto=format`}
            alt={Title}
            loading="lazy"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              minHeight: 150,
              height: "100%",
              backgroundColor: "grey.700",
            }}
          />
        )}
      </Link>

      <ImageListItemBar
        title={
          <Typography variant="body2" sx={{ fontWeight: "bold", mx: "5px" }}>
            {Title}
          </Typography>
        }
        subtitle={
          <ContentRating
            value={userRating ? userRating.value : null}
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
