import {
  deleteDocument,
  getDocument,
  getDocumentsByCourse,
  importDocuments,
  openDocument,
  renameDocument,
  getDocumentImportState,
} from "./documentsManager";
import { ipcMain } from "electron";

ipcMain.handle("document:get", async (event, documentId) => {
  return getDocument(documentId);
});

ipcMain.handle("document:getAllByCourse", async (event, courseId) => {
  return getDocumentsByCourse(courseId);
});

ipcMain.handle("document:import", (event, courseId) => {
  importDocuments(courseId);
});

ipcMain.handle("document:rename", (event, documentId, newName) => {
  renameDocument(documentId, newName);
});

ipcMain.handle("document:delete", (event, documentId) => {
  deleteDocument(documentId);
});

ipcMain.handle("document:open", (event, documentId) => {
  return openDocument(documentId);
});

ipcMain.handle("document:importState", (event, documentId) => {
  return getDocumentImportState(documentId);
});

export {
  searchExcerpts,
  deleteCourse,
  deleteAllCurrentlyImportingDocuments,
} from "./documentsManager";
