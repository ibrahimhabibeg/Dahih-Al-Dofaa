import { ipcMain } from "electron";
import ollamaManager from "./ollama";

ipcMain.handle("ollama:start", () => {
  ollamaManager.start();
});

ipcMain.handle("ollama:pull", async (event, model: string) => {
  ollamaManager.pull(model);
});

export const stopOllama = (): void => ollamaManager.stop();
