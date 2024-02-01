import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TopPick from "./TopPick";
import ItemList from "./ItemList";
import { useGroupMostRecentMatch } from "@/modules/api/client/";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function Summary({ id }: { id: string }) {
  const [item, isLoading, error] = useGroupMostRecentMatch(id);

  if (isLoading) {
    // TODO: add skeleton loader
    return null;
  }

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error ? error.message : "No match found"}
      </Alert>
    );
  }

  if (!item) {
    return <NoResults />;
  }

  const data = item.recommendations;

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
      <TopPick id={first.imdbID} {...first} />

      <Box sx={{ my: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", m: 2 }}>
          Other Matches
        </Typography>

        <ItemList data={rest.map((i) => ({ ...i, id: i.imdbID }))} />
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
