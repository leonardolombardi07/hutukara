import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Item } from "../../types";
import TopPick from "./TopPick";
import ItemList from "./ItemList";

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
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", m: 2 }}>
          Other Matches
        </Typography>

        <ItemList data={rest} />
      </Box>
    </Box>
  );
}

function NoResults() {
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography variant="h6" component="p" color="textSecondary">
        Nothing to show here... yet!
      </Typography>

      <Typography variant="body1" component="p" color="textSecondary">
        Invite your friends to join the party and start matching!
      </Typography>
    </Box>
  );
}
