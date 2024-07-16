import { ipcMain, dialog } from "electron";
import DocDB from "./docDB";

export const validExtensions = ["pdf", "pptx", "docx"];

ipcMain.handle(
  "document:add",
  async (event, courseId: string): Promise<Doc[]> => {
    const path = await getDocumentPathFromUser();
    const docDb = DocDB.getInstance(courseId);
    if (!path) return docDb.getDocuments();
    const { documents } = await docDb.addDocument(path);
    return documents;
  }
);

ipcMain.handle(
  "document:delete",
  async (event, courseId: string, documentId: string) =>
    DocDB.getInstance(courseId).deleteDocument(documentId)
);

ipcMain.handle(
  "document:rename",
  async (event, courseId: string, documentId: string, newTitle: string) =>
    DocDB.getInstance(courseId).renameDocument(documentId, newTitle)
);

ipcMain.handle("document:getAll", async (event, courseId: string) =>
  DocDB.getInstance(courseId).getDocuments()
);

ipcMain.handle(
  "document:get",
  async (event, courseId: string, documentId: string) =>
    DocDB.getInstance(courseId).getDocument(documentId)
);

/**
 * This function opens a dialog to get the path of the document from the user.
 * @returns {Promise<string>} The path of the document selected by the user.
 */
const getDocumentPathFromUser = async (): Promise<string> => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [
      {
        name: "Supported Documents",
        extensions: validExtensions,
      },
    ],
  });
  if (!canceled) {
    const [path] = filePaths;
    return path;
  }
  return undefined;
};
