"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useSafeGoBack } from "@/modules/navigation";
import Box from "@mui/material/Box";
import OwnerActions from "./_layout/OwnerActions";
import Header from "./_layout/Header";
import Tabs from "./_layout/Tabs";
import Paper from "@mui/material/Paper";
import { useParams } from "next/navigation";
import LayoutProvider from "./_layout/LayoutProvider";
import Container from "@mui/material/Container";
import GoBackIcon from "@mui/icons-material/ArrowBackIosNew";

interface PageProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
  const params = useParams();
  const safeGoBack = useSafeGoBack();

  if (!params.id || typeof params.id !== "string") {
    throw new Error("Missing id");
  }

  return (
    <LayoutProvider>
      <Dialog
        fullScreen
        open
        TransitionComponent={Transition}
        onClose={safeGoBack}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={safeGoBack}>
              <GoBackIcon />
            </IconButton>

            <Box sx={{ flex: 1 }} />

            <OwnerActions />
          </Toolbar>
        </AppBar>

        <Container
          disableGutters
          sx={{
            height: "100%",
            py: {
              xs: 0,
              sm: 1.5,
            },
          }}
        >
          <Paper
            sx={{
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              minHeight: "100%",
            }}
          >
            <Header />
            <Tabs />
            {children}
          </Paper>
        </Container>
      </Dialog>
    </LayoutProvider>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});
