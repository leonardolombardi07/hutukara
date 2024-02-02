"use client";

import { enUS } from "@mui/material/locale";
import { createResponsiveThemes } from "./utils";

export const { light: SALGUEIRO_THEME, dark: DARK_SALGUEIRO_THEME } =
  createResponsiveThemes(
    {
      palette: {
        mode: "light",
        primary: {
          main: "#FB0303",
        },
        secondary: {
          main: "#FFD700",
        },
      },
    },
    enUS
  );
