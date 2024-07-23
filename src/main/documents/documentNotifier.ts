import { webContents } from "electron";

export const notifyLoadingDocument = (
  courseId: string,
  documentId: string,
  isLoading: boolean
) => {
  const windows = webContents.getAllWebContents();
  windows.forEach((webContents) => {
    webContents.send(
      `document:update:loading:${courseId}:${documentId}`,
      isLoading
    );
  });
};

export const notifyDocumentsUpdate = (courseId: string, documents: Doc[]) => {
  const windows = webContents.getAllWebContents();
  windows.forEach((webContents) => {
    webContents.send(`document:update:${courseId}`, documents);
  });
};
