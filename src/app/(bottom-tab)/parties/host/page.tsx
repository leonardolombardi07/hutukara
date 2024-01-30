"use client";

import React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useQueryState } from "nuqs";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
    <Dialog fullScreen open TransitionComponent={Transition} onClose={close}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={close}>
            <CloseIcon />
          </IconButton>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Host a Party
          </Typography>
        </Toolbar>
      </AppBar>

      <form onSubmit={onFormSubmission}>
        <DialogContent sx={{ py: 4 }}>
          <TextField autoFocus fullWidth label="Title" />
        </DialogContent>

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
    </Dialog>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} timeout={600} />;
});
