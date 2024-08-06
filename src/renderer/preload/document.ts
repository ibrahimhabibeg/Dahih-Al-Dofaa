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
};

export type IDocumentAPI = typeof document;

export default document;
