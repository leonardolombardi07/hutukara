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
import useSubmit from "./useSubmit";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useParams, useRouter } from "next/navigation";

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
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const params = useParams();

  const { submit, isLoading, status, error } = useSubmit();

  async function onSubmit() {
    const { success } = await submit();
    if (success) {
      closeModal();
      router.replace(`summary`);
    }
  }

  const confirmDialogTitle = notAllowed ? "Not allowed!" : "Too many matches!";
  const confirmDialogDescription = notAllowed
    ? "Only the owner and hosts can find matches. Ask the owner to find matches or add you as a host."
    : "Currently, we only support one round of matches.";

  return (
    <React.Fragment>
      <Button
        onClick={openModal}
        variant="contained"
        color="primary"
        endIcon={<AutoFixHighIcon />}
      >
        {TRIGGER_BUTTON_TEXT}
      </Button>

      {tooManyMatches || notAllowed ? (
        <ConfirmDialog
          title={confirmDialogTitle}
          description={confirmDialogDescription}
          open={isOpen}
          confirmText="Ok"
          onClose={closeModal}
          onConfirm={closeModal}
        />
      ) : (
        <Dialog
          fullScreen={fullScreen}
          scroll="paper"
          open={isOpen}
          onClose={closeModal}
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
            onClick={closeModal}
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
            <DialogContentFromStatus status={status} />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                <AlertTitle>Error</AlertTitle>
                {error?.message || "Something went wrong"}
              </Alert>
            )}
          </DialogContent>

          <DialogActions>
            <Button size="large" onClick={closeModal}>
              Cancel
            </Button>

            <Button
              size="large"
              onClick={onSubmit}
              variant="contained"
              endIcon={<AutoFixHighIcon />}
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Find matches"}
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

function DialogContentFromStatus({
  status,
}: {
  status: ReturnType<typeof useSubmit>["status"];
}) {
  if (status === "loadingInput") {
    return (
      <DialogContentText>
        Gathering all data from this group to find the best matches...
      </DialogContentText>
    );
  }

  if (status === "loadingOutput") {
    return (
      <DialogContentText>
        Using advanced machine learning algorithms to find the best matches...
      </DialogContentText>
    );
  }

  return (
    <DialogContentText>
      We will find the best matches for you based on the combined ratings of the
      members in the group.
    </DialogContentText>
  );
}

function useFullScreen() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  return isXs;
}

function useModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openModal,
    closeModal,
  };
}
