import React, { createContext, useEffect, useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export const ThemeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
  isDark: true,
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f97516",
    },
    secondary: {
      main: "#169af9",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f97516",
    },
    secondary: {
      main: "#169af9",
    },
  },
});

const IS_DARK_KEY = "isDark";

const ThemeProvider = ({ children }: { children: React.JSX.Element }) => {
  const [isDark, setIsDark] = useState<boolean>(true);

  const setDefaultState = async (): Promise<void> => {
    const cachedValue = localStorage.getItem(IS_DARK_KEY);
    if (cachedValue == null) {
      setIsDark(true);
      localStorage.setItem(IS_DARK_KEY, "true");
    } else {
      setIsDark(cachedValue === "true");
    }
  };

  useEffect(() => {
    setDefaultState();
  }, []);

  const toggleTheme = (): void => {
    localStorage.setItem(IS_DARK_KEY, String(!isDark));
    setIsDark((val) => !val);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
      }}
    >
      <MuiThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
