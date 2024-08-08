import { ipcRenderer } from "electron";

const modelsTransfer = {
  import: async () => {
    ipcRenderer.invoke("modelTransfer:import");
  },
  export: async () => {
    ipcRenderer.invoke("modelTransfer:export");
  },
};

export type IModelsTransferAPI = typeof modelsTransfer;
export default modelsTransfer;
