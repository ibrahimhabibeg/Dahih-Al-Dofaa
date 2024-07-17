import { ipcMain } from "electron";
import ollamaManager from "./ollama";

ipcMain.handle("ollama:start", () => {
  ollamaManager.start();
});

ipcMain.handle("ollama:setup", () => {
  ollamaManager.setup();
});

export const embed = (textArray: string[]) => ollamaManager.embed(textArray);
export const stopOllama = () => ollamaManager.stop();
