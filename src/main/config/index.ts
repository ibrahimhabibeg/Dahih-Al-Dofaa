import configFileManager from "./configFileManager";
import { ipcMain } from "electron";

ipcMain.handle("config:theme:get", async () => {
  return getTheme();
});

ipcMain.handle("config:theme:set", async (_, theme: "light" | "dark") => {
  setTheme(theme);
});

const getTheme = (): "light" | "dark" => {
  return configFileManager.getKeyValue("theme");
};

const setTheme = (theme: "light" | "dark"): void => {
  configFileManager.setKeyValue("theme", theme);
};
