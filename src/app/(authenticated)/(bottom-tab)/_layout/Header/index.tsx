import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Header() {
  return (
    <AppBar component="nav">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: "block" }}
        >
          LOGO
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
