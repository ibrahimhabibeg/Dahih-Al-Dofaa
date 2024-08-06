import { readPaths } from "./pathsReader";

export const importDocuments = async (courseID: string): Promise<void> => {
  const paths = await readPaths();
};
