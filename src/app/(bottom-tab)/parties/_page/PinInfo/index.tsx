"use client";

import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

export default function PinInfo({ pin }: { pin: string | undefined }) {
  const [success, setSuccess] = React.useState(false);

  async function copyToClipboard() {
    if (!pin) {
      return alert("No pin to copy.");
    }

    try {
      await window.navigator.clipboard.writeText(pin);
      setSuccess(true);
    } catch (error) {
      alert("Something went wrong...");
    }
  }

  return (
    <React.Fragment>
      <Alert
        severity="info"
        action={
          <Button
            color="inherit"
            size="large"
            variant="outlined"
            onClick={copyToClipboard}
          >
            Copy
          </Button>
        }
      >
        <AlertTitle>PIN</AlertTitle>

        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          {pin || "?"}
        </Typography>
      </Alert>

      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          PIN copied to clipboard.
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
