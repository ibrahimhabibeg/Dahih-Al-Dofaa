import React, { createContext, useEffect, useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import getTheme from "./backend/config/getTheme";
import setTheme from "./backend/config/setTheme";

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

const ThemeProvider = ({ children }: { children: React.JSX.Element }) => {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    getTheme().then((theme) => {
      setIsDark(theme === "dark");
    });
  }, []);

  const toggleTheme = (): void => {
    setTheme(isDark ? "light" : "dark");
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
