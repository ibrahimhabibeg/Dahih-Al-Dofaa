import { readPaths } from "./pathsReader";
import documentsDB from "./documentsDB";
import { parseDocument } from "./documentParser";
import { generateExcerpts } from "./excerptsGenerator";
import ExcerptsDB from "./excerptDB";
import { embed } from "./embeddings";
import { shell } from "electron";

export const importDocuments = async (courseID: string): Promise<void> => {
  const paths = await readPaths();
  const documents = paths.map((path) =>
    documentsDB.createDocument(path, courseID)
  );
  for (const document of documents) {
    const parsedDocument = await parseDocument(document);
    const excerpts = await generateExcerpts(parsedDocument, document);
    const excerptDB = await ExcerptsDB.getInstance();
    await excerptDB.insert(excerpts);
  }
};

export const getDocumentsByCourse = async (courseID: string) => {
  const documents = documentsDB.getDocumentsByCourseId(courseID);
  return documents;
};

export const getDocument = async (docID: string) => {
  const document = documentsDB.getDocumentById(docID);
  return document;
};

export const searchExcerpts = async (query: string, courseID: string) => {
  const excerptDB = await ExcerptsDB.getInstance();
  const vector = await embed(query);
  const excerpts = await excerptDB.search(query, vector, courseID);
  return excerpts;
};

export const openDocument = async (docID: string) => {
  const document = documentsDB.getDocumentById(docID);
  if (document) {
    shell.openPath(document.path);
  }
};

export const deleteDocument = async (docID: string) => {
  documentsDB.deleteDocument(docID);
  const excerptsDB = await ExcerptsDB.getInstance();
  excerptsDB.deleteExcerptsFromDocument(docID);
};

export const deleteCourse = async (courseID: string) => {
  documentsDB.deleteDocumentsByCourseId(courseID);
  const excerptsDB = await ExcerptsDB.getInstance();
  excerptsDB.deleteExcerptsFromCourse(courseID);
};
