import { ipcRenderer, type IpcRendererEvent } from "electron";

const ollama = {
  isReady: () => ipcRenderer.invoke("ollama:isReady"),
  subscribeToReady: (listener: (_event: IpcRendererEvent) => void) => {
    ipcRenderer.on("ollama:ready", listener);
  },
  unsubscribeFromReady: () => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners("ollama:ready");
  },
};

export default ollama;
