import React, { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";
import { ListItem, ListItemIcon, ListItemText, Switch } from "@mui/material";
import { DarkMode } from "@mui/icons-material";

const ChangeTheme = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <ListItem>
      <ListItemIcon>
        <DarkMode />
      </ListItemIcon>
      <ListItemText primary="Dark Mode" />
      <Switch checked={isDark} onChange={toggleTheme} />
    </ListItem>
  );
};

export default ChangeTheme;
