"use client";

import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ContentRating from "../ContentRating";

interface RatableContentItemProps {
  id: string;
  Title: string;
  Poster: string;
  userRatingValue: number | null | undefined;
}

export default function RatableContentItem({
  id,
  Title,
  Poster,
  userRatingValue,
}: RatableContentItemProps) {
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
        subtitle={<ContentRating value={userRatingValue} contentId={id} />}
        position="below"
        sx={{
          px: "5px",
        }}
      />
    </ImageListItem>
  );
}
