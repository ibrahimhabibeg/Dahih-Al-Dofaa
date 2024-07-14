import { ipcMain, dialog, app } from "electron";
import {
  addDocument,
  deleteDocument,
  renameDocument,
  getDocument,
  getDocuments,
} from "./docDB";
import path from "path";
import fs from "fs";

export const validExtensions = ["pdf", "ppt", "txt", "md", "docx"];

ipcMain.handle(
  "document:add",
  async (event, courseId: string): Promise<Doc[]> => {
    const originalPath = await getDocumentPathFromUser();
    if (!originalPath) return getDocuments(courseId);
    const newPath = copyDocument(originalPath);
    const documents = await addDocument(newPath, courseId);
    return documents;
  }
);

ipcMain.handle("document:delete", async (event, documentId: string) => {
  const documents = await deleteDocument(documentId);
  return documents;
});

ipcMain.handle(
  "document:rename",
  async (event, documentId: string, newTitle: string) => {
    const documents = await renameDocument(documentId, newTitle);
    return documents;
  }
);

ipcMain.handle("document:getAll", async (event, courseId: string) => {
  const documents = await getDocuments(courseId);
  return documents;
});

ipcMain.handle("document:get", async (event, documentId: string) => {
  const document = await getDocument(documentId);
  return document;
});

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
        extensions: ["pdf", "docx", "ppt", "txt", "md"],
      },
    ],
  });
  if (!canceled) {
    const [path] = filePaths;
    return path;
  }
  return undefined;
};

const copyDocument = (originalPath: string) => {
  const name = path.basename(originalPath);
  const newPath = path.join(app.getPath("userData"), "documents", name);
  fs.mkdirSync(path.dirname(newPath), { recursive: true });
  fs.copyFileSync(originalPath, newPath);
  return newPath;
};
