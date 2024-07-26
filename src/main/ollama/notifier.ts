import { webContents } from "electron";

export const notifyOllamaReady = async () => {
  const windows = webContents.getAllWebContents();
  windows.forEach((webContents) => {
    webContents.send("ollama:ready");
  });
};
