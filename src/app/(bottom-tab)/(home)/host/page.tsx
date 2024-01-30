"use client";

import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  function close() {
    router.back();
  }

  function onFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title"));
    close();
  }

  return (
    <form onSubmit={onFormSubmission}>
      <Box sx={{ py: 4, px: 2, flexGrow: 1 }}>
        <TextField autoFocus fullWidth label="Title" />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          px: 2,
          pb: 2,
        }}
      >
        <Button
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          color="primary"
        >
          Host
        </Button>

        <Button onClick={close} size="large" variant="outlined" fullWidth>
          Cancel
        </Button>
      </Box>
    </form>
  );
}
