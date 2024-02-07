"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ItemList from "./_page/ItemList";
import { useGroupMostRecentMatch } from "@/modules/api/client/";
import { MatchContentItemProps } from "@/components/modules/content/MatchContentItem";
import { GroupsCol } from "@/modules/api/types";
import { GROUP_TITLE } from "@/app/constants";
import { useLayoutContext } from "../_layout/LayoutProvider";

export default function Page() {
  const [group] = useLayoutContext();
  const [item, isLoading, error] = useGroupMostRecentMatch(group.id);
  const data = getSortedData(item);
  return (
    <Box sx={{ p: 2 }}>
      <ItemList
        emptyComponent={<Empty />}
        isLoading={isLoading}
        error={error}
        data={data}
      />
    </Box>
  );
}

function Empty() {
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

type PartialMatchContentProps = Omit<MatchContentItemProps, "imageSizes">;

function getSortedData(
  match: GroupsCol.MatchesSubCol.Doc | null
): PartialMatchContentProps[] {
  if (!match) {
    return [];
  }

  const {
    output: { recommendations, content },
  } = match;

  const data: PartialMatchContentProps[] = [];

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

  const sorted = data.sort((a, b) => {
    return b.score - a.score;
  });

  return sorted;
}
