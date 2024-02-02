export const THEME_NAMES = ["blue", "salgueiro"] as const;
export const THEME_MODES = ["light", "dark"] as const;

type ThemeName = (typeof THEME_NAMES)[number];
type ThemeMode = (typeof THEME_MODES)[number];

export interface UserTheme {
  name: ThemeName;
  mode: ThemeMode;
}
