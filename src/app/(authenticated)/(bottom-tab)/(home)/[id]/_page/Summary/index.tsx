import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ItemList from "./ItemList";
import { useGroupMostRecentMatch } from "@/modules/api/client/";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { MatchContentItemProps } from "@/components/modules/content/MatchContentItem";
import { GroupsCol } from "@/modules/api/types";
import { GROUP_TITLE } from "@/app/constants";

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

  const data = getData(item);

  if (data.length === 0) {
    return <NoResults />;
  }

  const sorted = data.sort((a, b) => {
    return b.score - a.score;
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", m: 2 }}>
        Your Matches
      </Typography>

      <ItemList data={sorted} />
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
        Invite your friends to join the {GROUP_TITLE} and start matching!
      </Typography>
    </Box>
  );
}

function getData(match: GroupsCol.MatchesSubCol.Doc): MatchContentItemProps[] {
  const {
    output: { recommendations, content },
  } = match;

  const data: MatchContentItemProps[] = [];

  for (const recommendation of recommendations) {
    const hasFoundContent = content.find(
      (c) => c.id === recommendation.possibleIMDBId
    );

    if (hasFoundContent) {
      data.push(hasFoundContent);
    } else {
      data.push({
        ...recommendation,
        id: undefined,
        Poster: undefined,
      });
    }
  }

  return data;
}
