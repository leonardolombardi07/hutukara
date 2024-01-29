"use client";

import * as React from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import UserThemeProvider, {
  useUserTheme,
  USER_THEMES,
} from "./UserThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";

function WithUserTheme({ children }: { children: React.ReactNode }) {
  const { theme: userTheme } = useUserTheme();

  const theme = React.useMemo(() => {
    const name = userTheme.name;
    const mode = userTheme.mode;

    if (mode === "dark") {
      return USER_THEMES[name]["dark"];
    }
    return USER_THEMES[name]["light"];
  }, [userTheme.name, userTheme.mode]);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserThemeProvider>
      <WithUserTheme>{children}</WithUserTheme>
    </UserThemeProvider>
  );
}

export { useUserTheme };
