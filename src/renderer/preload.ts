import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  startOllama: () => ipcRenderer.invoke("ollama:start"),
});
