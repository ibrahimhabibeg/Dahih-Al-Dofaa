import { readPaths } from "./pathsReader";
import documentsDB from "./documentsDB";

export const importDocuments = async (courseID: string): Promise<void> => {
  const paths = await readPaths();
  const documents = paths.map((path) =>
    documentsDB.createDocument(path, courseID)
  );
};
