import configFileManager from "./configFileManager";
import { ipcMain } from "electron";
import Logger from "electron-log";
import fs from "fs";

ipcMain.handle("config:theme:get", async () => {
  return getTheme();
});

ipcMain.handle("config:theme:set", async (_, theme: "light" | "dark") => {
  setTheme(theme);
});

ipcMain.handle("config:modelTemperature:get", async () => {
  return getModelTemperature();
});

ipcMain.handle(
  "config:modelTemperature:set",
  async (_, temperature: number) => {
    setModelTemperature(temperature);
    return getModelTemperature();
  }
);

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

export const getModelTemperature = (): number => {
  return configFileManager.getKeyValue("temperature");
};

export const setModelTemperature = (temperature: number): void => {
  if (temperature < 0 || temperature > 1) {
    Logger.error(`Invalid temperature value: ${temperature}`);
    return;
  }
  configFileManager.setKeyValue("temperature", temperature);
};
