import { readPaths } from "./pathsReader";
import documentsDB from "./documentsDB";
import { parseDocument } from "./documentParser";
import { generateExcerpts } from "./excerptsGenerator";

export const importDocuments = async (courseID: string): Promise<void> => {
  const paths = await readPaths();
  const documents = paths.map((path) =>
    documentsDB.createDocument(path, courseID)
  );
  for (const document of documents) {
    const parsedDocument = await parseDocument(document);
    const excerpts = await generateExcerpts(parsedDocument, document);
  }
};
