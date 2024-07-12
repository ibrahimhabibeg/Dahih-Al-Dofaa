import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  startOllama: () => ipcRenderer.invoke("ollama:start"),
  pullOllama: (model: string) => ipcRenderer.invoke("ollama:pull", model),
});
