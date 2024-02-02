import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "@/components/elements/Logo";

export default function Header() {
  return (
    <AppBar component="nav">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          py: 1,
        }}
      >
        <Logo size="small" />
      </Toolbar>
    </AppBar>
  );
}
