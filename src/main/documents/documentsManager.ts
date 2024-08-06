import documentsDB from "./documentsDB";
import ExcerptsDB from "./excerptDB";
import { embed } from "./embeddings";
import { shell } from "electron";
import logger from "electron-log";
import documentImportStateManager from "./documentImportStateManager";

export { importDocuments } from "./documentImport";

export const getDocumentsByCourse = async (courseID: string) => {
  logger.info(`Getting documents for course ${courseID}`);
  const documents = documentsDB.getDocumentsByCourseId(courseID);
  logger.info(`Found ${documents.length} documents for course ${courseID}`);
  return documents;
};

export const getDocument = async (docID: string) => {
  logger.info(`Getting document ${docID}`);
  const document = documentsDB.getDocumentById(docID);
  if (!document) {
    logger.error(`Document ${docID} not found`);
  }
  return document;
};

export const searchExcerpts = async (query: string, courseID: string) => {
  logger.info(
    `Searching for excerpts for query ${query} in course ${courseID}`
  );
  const excerptDB = await ExcerptsDB.getInstance();
  const startTimestamp = Date.now();
  const vector = await embed(query);
  const endTimestamp = Date.now();
  logger.info(`Embedded query in ${endTimestamp - startTimestamp}ms`);
  const excerpts = await excerptDB.search(query, vector, courseID);
  logger.info(`Found ${excerpts.length} excerpts for query ${query}`);
  return excerpts;
};

export const openDocument = async (docID: string) => {
  logger.info(`Opening document ${docID}`);
  const document = documentsDB.getDocumentById(docID);
  if (document) {
    shell.openPath(document.path);
  } else {
    logger.error(`Document ${docID} not found`);
  }
};

export const deleteDocument = async (docID: string) => {
  logger.info(`Deleting document ${docID}`);
  documentsDB.deleteDocument(docID);
  const excerptsDB = await ExcerptsDB.getInstance();
  excerptsDB.deleteExcerptsFromDocument(docID);
};

export const deleteCourse = async (courseID: string) => {
  logger.info(
    `Deleting all documents and excerpts related to course ${courseID}`
  );
  documentsDB.deleteDocumentsByCourseId(courseID);
  const excerptsDB = await ExcerptsDB.getInstance();
  excerptsDB.deleteExcerptsFromCourse(courseID);
};

export const renameDocument = async (docID: string, newName: string) => {
  logger.info(`Renaming document ${docID} to ${newName}`);
  documentsDB.renameDocument(docID, newName);
  const excerptsDB = await ExcerptsDB.getInstance();
  excerptsDB.renameDocument(docID, newName);
};

export const getDocumentImportState = async (
  docID: string
): Promise<DocumentImportState> => {
  logger.info(`Getting import state for document ${docID}`);
  return documentImportStateManager.getDocumentState(docID);
};

export const deleteAllCurrentlyImportingDocuments = async () => {
  logger.info("Deleting all documents currently being imported");
  const documentIDs = documentImportStateManager.getAllLoadingDocuments();
  const promises = documentIDs.map((docID) => deleteDocument(docID));
  await Promise.all(promises);
};
