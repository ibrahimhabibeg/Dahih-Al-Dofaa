import { readPaths } from "./pathsReader";
import documentsDB from "./documentsDB";
import { parseDocument } from "./documentParser";
import { generateExcerpts } from "./excerptsGenerator";
import ExcerptsDB from "./excerptDB";
import { embed } from "./embeddings";
import { shell } from "electron";
import logger from "electron-log";

export const importDocuments = async (courseID: string): Promise<void> => {
  logger.info(`Importing documents for course ${courseID}`);
  const paths = await readPaths();
  logger.info(`Found ${paths.length} documents`);
  const documents = paths.map((path) =>
    documentsDB.createDocument(path, courseID)
  );
  logger.info(`Created ${documents.length} documents`);
  for (const document of documents) {
    const parsedDocument = await parseDocument(document);
    logger.info(`Parsed document ${document.id}`);
    const startTimestamp = Date.now();
    const excerpts = await generateExcerpts(parsedDocument, document);
    const endTimestamp = Date.now();
    logger.info(
      `Generated ${excerpts.length} excerpts for document ${document.id} in ${
        endTimestamp - startTimestamp
      }ms`
    );
    const excerptDB = await ExcerptsDB.getInstance();
    await excerptDB.insert(excerpts);
    logger.info(`Inserted ${excerpts.length} excerpts into the database`);
  }
};

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
