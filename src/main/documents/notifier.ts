import { webContents } from "electron";

export const notifyDocumentsUpdate = (documents: Doc[]) => {
  const windows = webContents.getAllWebContents();
  windows.forEach((webContents) => {
    webContents.send(`document:update:all`, documents);
  });
};

export const notifyCourseDocumentsUpdate = (
  courseId: string,
  documents: Doc[]
) => {
  const windows = webContents.getAllWebContents();
  windows.forEach((webContents) => {
    webContents.send(`document:update:course:${courseId}`, documents);
  });
};
