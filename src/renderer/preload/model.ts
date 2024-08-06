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
    modelId: string,
    listener: (_event: IpcRendererEvent, status: ProgressResponse) => void
  ) => {
    ipcRenderer.on(`model:downloading:${modelId}`, listener);
  },
  unsubscribeFromDownloadProgress: (modelId: string) => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(`model:downloading:${modelId}`);
  },
  download: async (modelId: string) =>
    ipcRenderer.invoke("model:download", modelId),
  abortDownloading: async (modelId: string) =>
    ipcRenderer.invoke("model:abortDownloading", modelId),
  delete: async (modelId: string) =>
    ipcRenderer.invoke("model:delete", modelId),
  setSelectedEmbedding: async (modelId: string) =>
    ipcRenderer.invoke("model:setSelectedEmbedding", modelId),
  setSelectedLLM: async (modelId: string) =>
    ipcRenderer.invoke("model:setSelectedLLM", modelId),
  getSelectedEmbedding: async () =>
    ipcRenderer.invoke("model:getSelectedEmbedding"),
  getSelectedLLM: async () => ipcRenderer.invoke("model:getSelectedLLM"),
  subscribeToSelectedEmbedding: (
    listener: (_event: IpcRendererEvent, modelId: string) => void
  ) => {
    ipcRenderer.on("model:selectedEmbedding", listener);
  },
  unsubscribeFromSelectedEmbedding: () => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners("model:selectedEmbedding");
  },
  subscribeToSelectedLLM: (
    listener: (_event: IpcRendererEvent, modelId: string) => void
  ) => {
    ipcRenderer.on("model:selectedLLM", listener);
  },
  unsubscribeFromSelectedLLM: () => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners("model:selectedLLM");
  },
};

export type IModelAPI = typeof model;
export default model;
