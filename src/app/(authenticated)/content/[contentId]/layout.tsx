"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import GoBackIcon from "@mui/icons-material/ArrowBackIosNew";
import { useSafeGoBack } from "@/modules/navigation";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const safeGoBack = useSafeGoBack();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Dialog
      fullScreen
      open
      TransitionComponent={Transition}
      onClose={safeGoBack}
    >
      <AppBar
        sx={{
          position: isXs ? "absolute" : "relative",
          ...(isXs
            ? {
                backgroundColor: "transparent",
                boxShadow: "none",
              }
            : {}),
        }}
      >
        <Toolbar>
          {isXs ? (
            <CloseButtonBehindImage />
          ) : (
            <IconButton edge="start" color="inherit" onClick={safeGoBack}>
              <GoBackIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {children}
    </Dialog>
  );
}

function CloseButtonBehindImage() {
  const safeGoBack = useSafeGoBack();

  return (
    <IconButton
      edge="start"
      color="inherit"
      onClick={safeGoBack}
      sx={{
        boxShadow: (t) => t.shadows[0],
        bgcolor: (t) => {
          return t.palette.grey[900];
        },
        color: (t) => t.palette.getContrastText(t.palette.grey[900]),
        opacity: 0.6,
        "&:hover": {
          bgcolor: (t) => t.palette.grey[900],
          opacity: 0.8,
        },
      }}
    >
      <CloseIcon />
    </IconButton>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
