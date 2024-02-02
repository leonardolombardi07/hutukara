import * as React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "next/link";

interface TopPickProps {
  id: string;
  Poster: string;
  Title: string;
  score: number;
}

export default function TopPick({ id, Poster, Title, score }: TopPickProps) {
  const scoreAsPercentage = score * 10;
  return (
    <Card component={Paper}>
      <CardActionArea LinkComponent={Link} href={`/content/${id}`}>
        <Typography
          variant="h4"
          sx={{
            p: 2,
            fontWeight: "bold",
          }}
        >
          Top Pick
        </Typography>

        <CardMedia
          sx={{ height: 140, width: "100%" }}
          image={Poster}
          title={Title}
        />

        <CardContent>
          <Typography variant="h4">{Title}</Typography>

          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: "success.main",
            }}
          >
            {scoreAsPercentage}% Match
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
