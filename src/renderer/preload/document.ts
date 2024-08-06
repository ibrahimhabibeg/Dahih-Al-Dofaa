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
  open: (documentId: string): void => {
    ipcRenderer.invoke("document:open", documentId);
  },
  importState: async (documentId: string): Promise<DocumentImportState> => {
    return ipcRenderer.invoke("document:importState", documentId);
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
  subuscribeToCourseDocuments: (
    courseId: string,
    callback: (documents: Doc[]) => void
  ): void => {
    ipcRenderer.on(`document:update:course:${courseId}`, (_, documents) => {
      callback(documents);
    });
  },
  unsubscribeFromCourseDocuments: (courseId: string): void => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(`document:update:course:${courseId}`);
  },
  subscribeToDocumentImport: (
    documentId: string,
    callback: (importState: DocumentImportState) => void
  ): void => {
    ipcRenderer.on(`document:update:import:${documentId}`, (_, importState) => {
      callback(importState);
    });
  },
  unsubscribeFromDocumentImport: (documentId: string): void => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(`document:update:import:${documentId}`);
  },
};

export type IDocumentAPI = typeof document;
export default document;
