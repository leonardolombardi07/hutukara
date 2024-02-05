"use client";

import { enUS } from "@mui/material/locale";
import { createResponsiveThemes } from "./utils";

export const { light: BLUE_THEME, dark: DARK_BLUE_THEME } =
  createResponsiveThemes(
    {
      palette: {
        mode: "light",
      },
    },
    enUS
  );
