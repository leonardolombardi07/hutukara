"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { GROUP_TITLE } from "@/app/constants";

interface PageProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
  const router = useRouter();
  return (
    <Dialog
      fullScreen
      open
      TransitionComponent={Transition}
      onClose={router.back}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={router.back}>
            <CloseIcon />
          </IconButton>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Host a {GROUP_TITLE}
          </Typography>
        </Toolbar>
      </AppBar>

      {children}
    </Dialog>
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
