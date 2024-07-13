import { ipcMain } from "electron";
import {
  addDocument,
  deleteDocument,
  renameDocument,
  getDocument,
  getDocuments,
} from "./docDB";

ipcMain.handle(
  "document:add",
  async (event, path: string, courseId: string) => {
    const documents = await addDocument(path, courseId);
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
