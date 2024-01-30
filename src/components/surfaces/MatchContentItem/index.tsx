import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface MatchContentItemProps {
  id: string;
  Poster: string;
  Title: string;
  score: number;
}

export default function MatchContentItem({
  id,
  Poster,
  Title,
  score,
}: MatchContentItemProps) {
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
              height: "100%",
              backgroundColor: "grey.700",
            }}
          />
        )}
      </Link>

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
            {score * 10}% Match
          </Typography>
        }
        position="below"
        sx={{
          px: "5px",
        }}
      />
    </ImageListItem>
  );
}
