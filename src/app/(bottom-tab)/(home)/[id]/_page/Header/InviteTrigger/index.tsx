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
import InviteButton from "./InviteButton";
import { INVITE_BUTTONS } from "./buttons";
import Divider from "@mui/material/Divider";

interface InviteTriggerProps {
  title: string;
  pin: string;
  disabled: boolean;
}

export default function InviteTrigger({
  title,
  pin,
  disabled,
}: InviteTriggerProps) {
  const fullScreen = useFullScreen();
  const [open, setOpen] = React.useState(false);

  function _open() {
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  const buttons = INVITE_BUTTONS.map((item) => {
    return (
      <InviteButton
        button={item.button}
        icon={item.icon}
        message={item.getMessage({ title, pin })}
        disabled={disabled}
        key={item.id}
      />
    );
  });

  return (
    <React.Fragment>
      <Button onClick={_open} variant="contained" color="secondary">
        Invite
      </Button>

      <Dialog
        fullScreen={fullScreen}
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
        <DialogTitle>Invite to Party</DialogTitle>
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

        <DialogContent
          dividers
          sx={{
            px: 1,
            py: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              px: 1,
            }}
          >
            {buttons}
          </Box>

          <Divider sx={{ my: 2 }} />
        </DialogContent>
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
