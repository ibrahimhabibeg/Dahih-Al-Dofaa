import configFileManager from "./configFileManager";
import { ipcMain } from "electron";
import fs from "fs";

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

/**
 * Get the folder where ollama models are installed in the case of using the prepackaged server
 * @returns The folder where ollama models are installed
 */
export const getModelInstallationFolder = (): string => {
  const folder = configFileManager.getKeyValue("modelInstallationLocation");
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  return folder;
};
