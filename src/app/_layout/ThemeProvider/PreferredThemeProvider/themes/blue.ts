"use client";

import { Roboto } from "next/font/google";
import { enUS } from "@mui/material/locale";
import { createResponsiveThemes } from "./utils";

const font = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const { light: BLUE_THEME, dark: DARK_BLUE_THEME } =
  createResponsiveThemes(
    {
      typography: {
        fontFamily: font.style.fontFamily,
      },
      palette: {
        mode: "light",
      },
    },
    enUS
  );
