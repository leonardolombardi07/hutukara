import React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import GoBackButton from "./_page/GoBackButton";
import GoBackIconButton from "./_page/GoBackIconButton";

export default function Page() {
  return (
    <Dialog
      fullScreen={true}
      open={true}
      PaperProps={{
        sx: {
          bgcolor: "green",
        },
      }}
    >
      <Grid
        container
        alignItems="center"
        sx={{
          px: 1,
        }}
      >
        <Grid item xs={2}>
          <GoBackIconButton />
        </Grid>

        <Grid item xs>
          <DialogTitle
            sx={{
              textAlign: "center",
            }}
          >
            Host a Party
          </DialogTitle>
        </Grid>

        <Grid item xs={2}></Grid>
      </Grid>

      <DialogContent></DialogContent>

      <DialogActions>
        <Box
          sx={{
            width: "100%",
            mb: 1,
          }}
        >
          <Button variant="contained" fullWidth color="primary">
            Host
          </Button>

          <GoBackButton />
        </Box>
      </DialogActions>
    </Dialog>
  );
}
