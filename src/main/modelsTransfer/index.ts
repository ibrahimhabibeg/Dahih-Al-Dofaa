import path from "path";
import fs from "fs";
import { getModelInstallationFolder } from "../config";
import { dialog, ipcMain } from "electron";
import Logger from "electron-log";

ipcMain.handle("modelTransfer:export", async () => {
  const location = await getModelsFolderFromUser();
  if (location) {
    exportModelsToFolder(location);
  }
});

ipcMain.handle("modelTransfer:import", async () => {
  const location = await getModelsFolderFromUser();
  if (location) {
    importModelsFromFolder(location);
  }
});

const exportModelsToFolder = async (folder: string) => {
  let exportLocation = path.join(folder, "models");
  let i = 1;
  while (fs.existsSync(exportLocation)) {
    exportLocation = path.join(folder, `models-${i}`);
    i++;
  }
  Logger.info(`Exporting models to ${exportLocation}`);
  fs.mkdirSync(exportLocation, { recursive: true });
  const modelsLocation = getModelInstallationFolder();
  if (exportLocation === modelsLocation) {
    return;
  }
  try {
    fs.cpSync(modelsLocation, exportLocation, { recursive: true });
  } catch (e) {
    Logger.error(`Error exporting models: ${e}`);
  }
};

const importModelsFromFolder = async (folder: string) => {
  const modelsLocation = getModelInstallationFolder();
  Logger.info(`Importing models from ${folder}`);
  try {
    fs.cpSync(folder, modelsLocation, { recursive: true });
  } catch (error) {
    Logger.error(`Error importing models: ${error}`);
  }
};

const getModelsFolderFromUser = async (): Promise<string | undefined> => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  return filePaths?.[0];
};
