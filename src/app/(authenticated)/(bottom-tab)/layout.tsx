import * as React from "react";
import BottomTabMenu from "./_layout/BottomTabMenu";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "./_layout/Header";
import OnboardingProvider from "./_layout/OnboardingProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      <Box sx={{ display: "flex" }}>
        <Header />

        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            pb: 7, // Leo: avoid bottom tab menu overlap. TODO: use actual height of bottom tab menu
          }}
        >
          <Toolbar />

          {children}

          <BottomTabMenu
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        </Box>
      </Box>
    </OnboardingProvider>
  );
}
