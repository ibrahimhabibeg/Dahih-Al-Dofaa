import { readPaths } from "./pathsReader";
import documentsDB from "./documentsDB";
import { parseDocument } from "./documentParser";
import { splitText } from "./splitter";
import { embed } from "./embeddings";
import ExcerptsDB from "./excerptDB";
import logger from "electron-log";
import documentImportStateManager from "./documentImportStateManager";

export const importDocuments = async (courseID: string): Promise<void> => {
  const documents = await initializeStage(courseID);
  for (const document of documents) {
    const parsedDocument = await parseStage(document);
    const splits = await splitStage(document, parsedDocument);
    const embeddings = await embedStage(document, splits);
    const excerpts = await generateExcerptsStage(document, splits, embeddings);
    await saveExcerptsStage(document, excerpts);
    documentImportStateManager.removeDocumentFromImporting(document.id);
  }
};

const initializeStage = async (courseID: string): Promise<Doc[]> => {
  logger.info(`Importing documents for course ${courseID}`);
  const paths = await readPaths();
  logger.info(`Found ${paths.length} documents`);
  const documents = paths.map((path) =>
    documentsDB.createDocument(path, courseID)
  );
  for (const document of documents) {
    documentImportStateManager.addDocumentToImporting(document.id);
  }
  return documents;
};

const parseStage = async (document: Doc): Promise<string[]> => {
  logger.info(`Parsing document ${document.id}`);
  documentImportStateManager.updateDocumentImportState(
    document.id,
    "Parse",
    "In Progress"
  );
  const parsedDocument = await parseDocument(document);
  documentImportStateManager.updateDocumentImportState(
    document.id,
    "Parse",
    "Finished"
  );
  return parsedDocument;
};

const splitStage = async (
  document: Doc,
  parsedDocument: string[]
): Promise<string[]> => {
  logger.info(`Splitting document`);
  documentImportStateManager.updateDocumentImportState(
    document.id,
    "Split",
    "In Progress"
  );
  const splits = (
    await Promise.all(parsedDocument.map((text) => splitText(text)))
  ).flat();
  logger.info(`Split document into ${splits.length} excerpts`);
  documentImportStateManager.updateDocumentImportState(
    document.id,
    "Split",
    "Finished"
  );
  return splits;
};

const embedStage = async (
  document: Doc,
  splits: string[]
): Promise<number[][]> => {
  logger.info(
    `Embedding document ${document.id} with ${splits.length} excerpts`
  );
  documentImportStateManager.updateDocumentImportState(
    document.id,
    "Embed",
    "In Progress",
    0,
    splits.length
  );
  const startTimestamp = Date.now();
  const embeddings: number[][] = [];
  for (let i = 0; i < splits.length; i++) {
    embeddings.push(await embed(splits[i]));
    documentImportStateManager.updateDocumentImportState(
      document.id,
      "Embed",
      "In Progress",
      i + 1,
      splits.length
    );
  }
  const endTimestamp = Date.now();
  logger.info(
    `Embedded ${splits.length} excerpts in ${endTimestamp - startTimestamp}ms`
  );
  documentImportStateManager.updateDocumentImportState(
    document.id,
    "Embed",
    "Finished"
  );
  return embeddings;
};

const generateExcerptsStage = async (
  document: Doc,
  splits: string[],
  embeddings: number[][]
): Promise<Excerpt[]> => {
  logger.info(
    `Generating ${embeddings.length} excerpts for document ${document.id}`
  );
  return splits.map((split, i) => ({
    documentId: document.id,
    text: split,
    embeddings: embeddings[i],
    courseId: document.courseId,
    documentTitle: document.title,
  }));
};

const saveExcerptsStage = async (
  document: Doc,
  excerpts: Excerpt[]
): Promise<void> => {
  logger.info(`Saving ${excerpts.length} excerpts for document ${document.id}`);
  documentImportStateManager.updateDocumentImportState(
    document.id,
    "Save Excerpts",
    "In Progress"
  );
  const excerptDB = await ExcerptsDB.getInstance();
  await excerptDB.insert(excerpts);
};
