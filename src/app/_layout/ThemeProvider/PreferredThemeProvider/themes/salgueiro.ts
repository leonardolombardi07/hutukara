"use client";

import { enUS } from "@mui/material/locale";
import { createTheme, responsiveFontSizes } from "@mui/material";

const SALGUEIRO_THEME = responsiveFontSizes(
  createTheme(
    {
      palette: {
        mode: "light",
        primary: {
          main: "#760000",
        },
        secondary: {
          main: "#FFD700",
        },
      },
    },
    enUS
  )
);

const DARK_SALGUEIRO_THEME = responsiveFontSizes(
  createTheme(
    {
      palette: {
        mode: "dark",
        primary: {
          main: "#FB0303",
        },
        secondary: {
          main: "#FFD700",
        },
      },
    },
    enUS
  )
);

export { SALGUEIRO_THEME, DARK_SALGUEIRO_THEME };
