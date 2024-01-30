import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Item } from "../types";
import TopPick from "./TopPick";
import Other from "./Other";

export default function Summary({ data }: { data: Item["results"] }) {
  if (data.length === 0) {
    return <NoResults />;
  }

  const sorted = data.sort((a, b) => {
    return b.score - a.score;
  });

  const first = sorted[0];
  const rest = sorted.slice(1);

  return (
    <Box sx={{ my: 2 }}>
      <TopPick {...first} />
      <Other data={rest} />
    </Box>
  );
}

function NoResults() {
  return (
    <Box
      sx={{
        py: 1,
        px: 2,
      }}
    >
      <Typography variant="h4" color="textSecondary">
        No results... yet!
      </Typography>
    </Box>
  );
}
