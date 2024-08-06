import { readPaths } from "./pathsReader";
import documentsDB from "./documentsDB";
import { parseDocument } from "./documentParser";
import { generateExcerpts } from "./excerptsGenerator";
import excerptsDB from "./excerptDB";

export const importDocuments = async (courseID: string): Promise<void> => {
  const paths = await readPaths();
  const documents = paths.map((path) =>
    documentsDB.createDocument(path, courseID)
  );
  for (const document of documents) {
    const parsedDocument = await parseDocument(document);
    const excerpts = await generateExcerpts(parsedDocument, document);
    const excerptDB = await excerptsDB.getInstance();
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
