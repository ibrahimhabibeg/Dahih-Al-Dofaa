import { ipcRenderer, type IpcRendererEvent } from "electron";

const document = {
  get: (courseId: string, documentId: string) =>
    ipcRenderer.invoke("document:get", courseId, documentId),
  getAll: (courseId: string) => ipcRenderer.invoke("document:getAll", courseId),
  add: (courseId: string) => ipcRenderer.invoke("document:add", courseId),
  rename: (courseId: string, documentId: string, newTitle: string) =>
    ipcRenderer.invoke("document:rename", courseId, documentId, newTitle),
  delete: (courseId: string, documentId: string) =>
    ipcRenderer.invoke("document:delete", courseId, documentId),
  isLoading: (courseId: string, documentId: string) =>
    ipcRenderer.invoke("document:isLoading", courseId, documentId),
  subscribeToIsLoading: (
    courseId: string,
    documentId: string,
    listener: (_event: IpcRendererEvent, isLoading: boolean) => void
  ) => {
    ipcRenderer.on(
      `document:update:loading:${courseId}:${documentId}`,
      listener
    );
  },
  unsubscribeFromIsLoading: (courseId: string, documentId: string) => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(
      `document:update:loading:${courseId}:${documentId}`
    );
  },
  subscribeToAllDocuments: (
    courseId: string,
    listener: (_event: IpcRendererEvent, documents: Doc[]) => void
  ) => {
    ipcRenderer.on(`document:update:${courseId}`, listener);
  },
  unsubscribeFromAllDocuments: (courseId: string) => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(`document:update:${courseId}`);
  },
};

export default document;
