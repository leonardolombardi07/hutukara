"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import DialogContentText from "@mui/material/DialogContentText";
import Divider from "@mui/material/Divider";
import DialogActions from "@mui/material/DialogActions";

interface FindMatchesTriggerProps {
  id: string;
  disabled: boolean;
}

export default function FindMatchesTrigger({
  id,
  disabled,
}: FindMatchesTriggerProps) {
  const fullScreen = useFullScreen();
  const [open, setOpen] = React.useState(false);

  function _open() {
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Button
        disabled={disabled}
        onClick={_open}
        variant="contained"
        color="success"
      >
        Find Matches
      </Button>

      <Dialog
        fullScreen={fullScreen}
        scroll="paper"
        open={open}
        onClose={close}
        TransitionComponent={Transition}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              minWidth: 350,
            },
          },
        }}
      >
        <DialogTitle>Find Matches</DialogTitle>
        <IconButton
          onClick={close}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <DialogContentText>
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button size="large" onClick={close}>
            Cancel
          </Button>

          <Button
            size="large"
            onClick={close}
            color="primary"
            variant="contained"
          >
            Find
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function useFullScreen() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  return isXs;
}
