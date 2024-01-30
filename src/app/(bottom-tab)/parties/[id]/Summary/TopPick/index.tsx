import * as React from "react";
import { Item } from "../../types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";

export default function TopPick({
  Poster,
  Title,
  score,
}: Item["results"][number]) {
  const scoreAsPercentage = score * 10;
  return (
    <Card component={Paper}>
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
    </Card>
  );
}
