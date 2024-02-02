import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";

export interface MatchContentItemProps {
  id?: string;
  Poster?: string;
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
      {Poster && id ? (
        <Link
          href={`/content/${id}`}
          style={{
            display: "block",
            height: 300,
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
        position="below"
        sx={{
          px: "5px",
        }}
      />
    </ImageListItem>
  );
}
