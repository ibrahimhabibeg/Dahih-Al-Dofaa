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
  return configFileManager.getKeyValue("modelInstallationLocation");
};

/**
 * Set the folder where ollama models are installed in the case of using the prepackaged server
 * If the folder does not exist, it will be created
 * @param location The folder where ollama models are installed
 */
const setModelInstallationFolder = (location: string): void => {
  const oldLocation = getModelInstallationFolder();
  if (!fs.existsSync(location)) {
    fs.mkdirSync(location, { recursive: true });
  }
  fs.rmdirSync(location, { recursive: true });
  fs.cpSync(oldLocation, location, { recursive: true });
  fs.rmdirSync(oldLocation, { recursive: true });
  configFileManager.setKeyValue("modelInstallationLocation", location);
};
