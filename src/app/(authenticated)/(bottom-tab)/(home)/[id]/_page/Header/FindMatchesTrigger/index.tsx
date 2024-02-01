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
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ConfirmDialog from "@/components/feedback/ConfirmDialog";

const TRIGGER_BUTTON_TEXT = "Find Matches";

interface FindMatchesTriggerProps {
  tooManyMatches: boolean;
  notAllowed: boolean;
}

export default function FindMatchesTrigger({
  tooManyMatches,
  notAllowed,
}: FindMatchesTriggerProps) {
  const fullScreen = useFullScreen();
  const [open, setOpen] = React.useState(false);

  function _open() {
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  const confirmDialogTitle = notAllowed ? "Not allowed!" : "Too many matches!";

  const confirmDialogDescription = notAllowed
    ? "Only the owner and hosts can find matches. Ask the owner to find matches or add you as a host."
    : "Currently, we only support one round of matches.";

  return (
    <React.Fragment>
      <Button
        onClick={_open}
        variant="contained"
        color="success"
        endIcon={<AutoFixHighIcon />}
      >
        {TRIGGER_BUTTON_TEXT}
      </Button>

      {tooManyMatches || notAllowed ? (
        <ConfirmDialog
          title={confirmDialogTitle}
          description={confirmDialogDescription}
          open={open}
          confirmText="Ok"
          onClose={close}
          onConfirm={close}
        />
      ) : (
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
          <DialogTitle>{TRIGGER_BUTTON_TEXT}</DialogTitle>
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
              We will find the best matches for you based on the combined
              ratings of the members in the group.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button size="large" onClick={close}>
              Cancel
            </Button>

            <Button
              size="large"
              onClick={close}
              variant="contained"
              endIcon={<AutoFixHighIcon />}
              color="success"
            >
              Find
            </Button>
          </DialogActions>
        </Dialog>
      )}
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
