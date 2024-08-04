import { ipcMain, dialog, shell } from "electron";
import DocDB from "./docDB";
import VectorDB from "./vectorDB";
import parseDocument from "./parsers";
import split from "./split";
import documentLoading from "./documentLoading";

export const validExtensions = ["pdf", "pptx", "docx"];

ipcMain.handle(
  "document:add",
  async (event, courseId: string): Promise<Doc[]> => {
    const path = await getDocumentPathFromUser();
    const docDb = DocDB.getInstance(courseId);
    if (!path) return docDb.getDocuments();
    const { document } = await docDb.addDocument(path);
    addDocumentToVectorDB(courseId, document);
  }
);

ipcMain.handle(
  "document:delete",
  async (event, courseId: string, documentId: string) => {
    const docDb = DocDB.getInstance(courseId);
    await docDb.deleteDocument(documentId);
    const vectorDb = await VectorDB.getInstance(courseId);
    await vectorDb.deleteDocument(documentId);
  }
);

ipcMain.handle(
  "document:rename",
  async (event, courseId: string, documentId: string, newTitle: string) => {
    DocDB.getInstance(courseId).renameDocument(documentId, newTitle);
  }
);

ipcMain.handle("document:getAll", async (event, courseId: string) =>
  DocDB.getInstance(courseId).getDocuments()
);

ipcMain.handle(
  "document:isLoading",
  async (event, courseId: string, documentId: string) =>
    documentLoading.isLoading(courseId, documentId)
);

ipcMain.handle(
  "document:get",
  async (event, courseId: string, documentId: string) =>
    DocDB.getInstance(courseId).getDocument(documentId)
);

ipcMain.handle(
  "document:open",
  async (event, courseId: string, documentId: string) => {
    const document = DocDB.getInstance(courseId).getDocument(documentId);
    shell.openPath(document.path);
  }
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

const addDocumentToVectorDB = async (courseId: string, document: Doc) => {
  documentLoading.addDocument(courseId, document.id);
  const text = await parseDocument(document);
  const splits = await split(text);
  const vectorDb = await VectorDB.getInstance(courseId);
  const ids = await vectorDb.insert(splits, document.id);
  documentLoading.removeDocument(courseId, document.id);
  return ids;
};
