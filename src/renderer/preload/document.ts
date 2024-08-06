import { ipcRenderer } from "electron";

const document = {
  get: async (documentId: string): Promise<Doc> => {
    return ipcRenderer.invoke("document:get", documentId);
  },
  getAllByCourse: async (courseId: string): Promise<Doc[]> => {
    return ipcRenderer.invoke("document:getAllByCourse", courseId);
  },
  import: (courseId: string): void => {
    ipcRenderer.invoke("document:import", courseId);
  },
  rename: (documentId: string, newName: string): void => {
    ipcRenderer.invoke("document:rename", documentId, newName);
  },
  delete: (documentId: string): void => {
    ipcRenderer.invoke("document:delete", documentId);
  },
  subuscribeToAll: (callback: (documents: Doc[]) => void): void => {
    ipcRenderer.on("document:update:all", (_, documents) => {
      callback(documents);
    });
  },
  unsubscribeFromAll: (): void => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners("document:update:all");
  },
};

export type IDocumentAPI = typeof document;
export default document;
