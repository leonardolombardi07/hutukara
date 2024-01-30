"use client";

import * as React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface CopyToClipboardButtonProps extends ButtonProps {
  value: string;
}

export default function CopyToClipboardButton(
  props: CopyToClipboardButtonProps
) {
  const { open: isSnackbarOpen, openSnackbar, closeSnackbar } = useSnackbar();

  const { children, value, ...rest } = props;

  async function onClick() {
    try {
      await navigator.clipboard.writeText(value);
      openSnackbar();
    } catch (error) {
      alert("Something went wrong");
    }
  }

  return (
    <React.Fragment>
      <Button
        sx={{
          mr: 1,
        }}
        variant="outlined"
        color="inherit"
        onClick={onClick}
        {...rest}
      >
        {children}
      </Button>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={5000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity="info" sx={{ width: "100%" }}>
          Copied: {value}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

function useSnackbar() {
  const [open, setOpen] = React.useState(false);

  function openSnackbar() {
    setOpen(true);
  }

  function closeSnackbar() {
    setOpen(false);
  }

  return { open, openSnackbar, closeSnackbar };
}
