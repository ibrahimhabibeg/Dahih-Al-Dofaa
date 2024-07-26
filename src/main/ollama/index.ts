import { ipcMain } from "electron";
import OllamaStarter from "./OllamaStarter";

ipcMain.handle("ollama:isReady", async () => {
  const ollama = OllamaStarter.getInstance();
  return ollama.getOllamaStatus() === "running";
});

export const startOllama = async () => {
  const ollama = OllamaStarter.getInstance();
  await ollama.start();
};

export const stopOllama = () => {
  const ollama = OllamaStarter.getInstance();
  ollama.stop();
};
