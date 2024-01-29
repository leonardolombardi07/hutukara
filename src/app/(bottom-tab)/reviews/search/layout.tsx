import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchInput from "./_layout/SearchInput";
import GoBackButton from "./_layout/GoBackButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <AppBar component="nav">
        <Toolbar>
          <GoBackButton />
          <SearchInput />
        </Toolbar>
      </AppBar>

      {children}
    </Box>
  );
}
