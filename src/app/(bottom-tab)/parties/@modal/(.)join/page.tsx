"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  function goBack() {
    router.push("/parties");
    alert("hi");
  }

  function onFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const pin = String(formData.get("pin"));
    // onClose();
  }

  return (
    <Dialog
      open
      sx={{
        "& .MuiDialog-paper": {
          minWidth: {
            xs: "90%",
          },
        },
      }}
      TransitionComponent={Transition}
      onClose={goBack}
    >
      <Grid
        container
        alignItems="center"
        sx={{
          px: 1,
        }}
      >
        <Grid item xs={2}>
          <IconButton onClick={goBack}>
            <CloseIcon />
          </IconButton>
        </Grid>

        <Grid item xs>
          <DialogTitle
            sx={{
              textAlign: "center",
            }}
          >
            Join a Party
          </DialogTitle>
        </Grid>

        <Grid item xs={2}></Grid>
      </Grid>

      <form onSubmit={onFormSubmission}>
        <DialogContent>
          <TextField
            autoFocus
            name="pin"
            label="Party PIN"
            fullWidth
            size="medium"
          />
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
          <Button size="large" type="submit" variant="contained" fullWidth>
            Join
          </Button>

          <Button onClick={goBack} size="large" variant="outlined" fullWidth>
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
  return <Slide direction="down" ref={ref} {...props} timeout={600} />;
});
