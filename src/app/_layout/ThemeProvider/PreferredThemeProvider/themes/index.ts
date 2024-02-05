import { PreferredTheme } from "../constants";
import { BLUE_THEME, DARK_BLUE_THEME } from "./blue";
import { DARK_SALGUEIRO_THEME, SALGUEIRO_THEME } from "./salgueiro";

export const THEMES: {
  [key in PreferredTheme["name"]]: {
    [key in PreferredTheme["mode"]]: typeof BLUE_THEME;
  };
} = {
  blue: {
    light: BLUE_THEME,
    dark: DARK_BLUE_THEME,
  },
  ["salgueiro"]: {
    light: SALGUEIRO_THEME,
    dark: DARK_SALGUEIRO_THEME,
  },
} as const;
