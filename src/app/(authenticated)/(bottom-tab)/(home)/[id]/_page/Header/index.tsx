"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import InviteTrigger from "./InviteTrigger";
import CopyAlert from "./CopyAlert";
import FindMatchesTrigger from "./FindMatchesTrigger";
import { useGroup } from "@/modules/api/client";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useUser } from "@/app/_layout/UserProvider";
import { GROUP_TITLE } from "@/app/constants";

interface HeaderProps {
  id: string;
}

export default function Header({ id }: HeaderProps) {
  const { user } = useUser();
  const [item, isLoading, error] = useGroup(id);

  if (isLoading) {
    // TODO: add skeleton loader
    return null;
  }

  if (error || !item) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error ? error.message : "No data found"}
      </Alert>
    );
  }

  // TODO: find out why the `useGroup` hook returns a partial group object when the group was recently created
  const isValidItem = item?.matchIds?.length !== undefined;
  if (!isValidItem) {
    return null;
  }

  const { name, createdAt, pin, matchIds } = item;

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: {
            xs: "flex-start",
            md: "space-between",
          },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              mb: 1,
            }}
            variant="h4"
          >
            {name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Started at: {createdAt.toDate().toLocaleDateString()}
          </Typography>
        </Box>

        {matchIds.length === 0 && (
          <CopyAlert
            title={`${GROUP_TITLE} PIN`}
            subtitle={pin}
            valueToCopy={pin}
          />
        )}
      </Box>

      {matchIds.length === 0 && (
        <Box
          sx={{
            display: "flex",
            columnGap: 1,
            width: "100%",
            my: 2,
          }}
        >
          <InviteTrigger name={name} pin={pin} />

          <FindMatchesTrigger
            tooManyMatches={matchIds.length > 0}
            notAllowed={
              [item.ownerId, ...item.hostIds].includes(user.uid) === false
            }
          />
        </Box>
      )}
    </Box>
  );
}
