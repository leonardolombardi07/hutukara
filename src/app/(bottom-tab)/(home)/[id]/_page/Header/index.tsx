import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import InviteTrigger from "./InviteTrigger";
import CopyAlert from "./CopyAlert";
import FindMatchesTrigger from "./FindMatchesTrigger";

interface HeaderProps {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  host: {
    name: string;
  };
  results: any[];
  pin: string;
}

export default function Header({
  id,
  title,
  description,
  createdAt,
  host,
  results,
  pin,
}: HeaderProps) {
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
            }}
            variant="h4"
          >
            {title}
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            {description}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Started at: {createdAt.toDateString()}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Hosted by <b>{host.name}</b>
          </Typography>
        </Box>

        {results.length === 0 && (
          <CopyAlert title="Party PIN" subtitle={pin} valueToCopy={pin} />
        )}
      </Box>

      {results.length === 0 && (
        <Box
          sx={{
            display: "flex",
            columnGap: 1,
            width: "100%",
            my: 2,
          }}
        >
          <InviteTrigger
            disabled={results.length > 0}
            title={title}
            pin={pin}
          />

          <FindMatchesTrigger disabled={results.length > 0} id={id} />
        </Box>
      )}
    </Box>
  );
}
