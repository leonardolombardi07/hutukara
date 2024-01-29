import BottomTabMenu from "./_layout/BottomTabMenu";
import Header from "./_layout/Header";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />

      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          pb: 4, // Leo: avoid bottom tab menu overlap
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
  );
}
