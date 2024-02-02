"use client";

import * as React from "react";
import { THEME_MODES, THEME_NAMES, UserTheme } from "./constants";

interface ThemeProviderContextValue {
  theme: UserTheme;
  setTheme: (theme: UserTheme) => void;
}

const UserThemeContext = React.createContext<ThemeProviderContextValue | null>(
  null
);

function UserThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, _setTheme] = React.useState<UserTheme>(ThemeCache.get());

  function setTheme(theme: UserTheme) {
    // Heads up: this can throw an error if theme is invalid
    _setTheme(theme);
    ThemeCache.set(theme);
  }

  return (
    <UserThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </UserThemeContext.Provider>
  );
}

function useUserTheme() {
  const userTheme = React.useContext(UserThemeContext);
  if (userTheme === null) {
    throw new Error("useUserTheme must be used within a UserThemeProvider");
  }
  return userTheme;
}

class ThemeCache {
  static readonly _defaultTheme: UserTheme = {
    name: "salgueiro",
    mode: "light",
  };

  static get(): UserTheme {
    try {
      const theme = JSON.parse(window?.localStorage?.getItem("theme") || "");
      if (!this._validateTheme(theme)) return this._defaultTheme;
      return theme as UserTheme;
    } catch (error) {
      return this._defaultTheme;
    }
  }

  static set(theme: UserTheme) {
    if (!this._validateTheme(theme)) {
      throw new Error(`Invalid theme`);
    }

    try {
      window?.localStorage?.setItem("theme", JSON.stringify(theme));
    } catch (error) {
      throw new Error(`Something went wrong while saving theme`);
    }
  }

  private static _validateTheme(theme: UserTheme | undefined | null) {
    if (!THEME_NAMES.includes(theme?.name as any)) {
      return false;
    }
    if (!THEME_MODES.includes(theme?.mode as any)) {
      return false;
    }
    return true;
  }
}

export default UserThemeProvider;
export { useUserTheme };
export * from "./themes";
