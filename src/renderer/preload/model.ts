import { ipcRenderer, IpcRendererEvent } from "electron";
import { type ProgressResponse } from "ollama";

const model = {
  getAll: async () => ipcRenderer.invoke("model:getAll"),
  subscribeToAll: (
    listener: (_event: IpcRendererEvent, models: Model[]) => void
  ) => {
    ipcRenderer.on("model:update", listener);
  },
  unsubscribeFromAll: () => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners("model:update");
  },
  subscribeToDownloadProgress: (
    modelId: ModelID,
    listener: (_event: IpcRendererEvent, status: ProgressResponse) => void
  ) => {
    ipcRenderer.on(`model:downloading:${modelId}`, listener);
  },
  unsubscribeFromDownloadProgress: (modelId: ModelID) => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(`model:downloading:${modelId}`);
  },
};

export default model;
