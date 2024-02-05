"use client";

import { Noto_Sans_Tagalog } from "next/font/google";
import { enUS } from "@mui/material/locale";
import { createTheme, responsiveFontSizes } from "@mui/material";

const font = Noto_Sans_Tagalog({
  weight: ["400"],
  subsets: ["latin"],
  style: "normal",
});

const SALGUEIRO_THEME = responsiveFontSizes(
  createTheme(
    {
      typography: {
        fontFamily: font.style.fontFamily,
      },
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
      typography: {
        fontFamily: font.style.fontFamily,
      },
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
