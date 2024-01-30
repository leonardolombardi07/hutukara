import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import Button from "@mui/material/Button";
import { Item } from "../types";

interface HeaderProps {
  item: Item | undefined;
}

export default function Header({ item }: HeaderProps) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography
        sx={{
          fontWeight: "bold",
        }}
        variant="h4"
      >
        {item?.title}
      </Typography>

      <Typography variant="body1" sx={{ mb: 1 }}>
        {item?.description}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Started at: {item?.createdAt.toDateString()}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Ended at: {item?.createdAt.toDateString()}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Hosted by <b>{item?.host.name}</b>
      </Typography>

      <Box
        sx={{
          display: "flex",
          columnGap: 1,
          width: "100%",
          my: 2,
        }}
      >
        <Button
          disabled={(item?.results.length || 0) > 0}
          variant="contained"
          color="secondary"
        >
          Invite
        </Button>

        <Button
          variant="contained"
          color="success"
          disabled={(item?.results.length || 0) > 0}
        >
          Get recommendations
        </Button>
      </Box>
    </Box>
  );
}
