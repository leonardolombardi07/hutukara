import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            LinkComponent={Link}
            href="reviews/search"
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
