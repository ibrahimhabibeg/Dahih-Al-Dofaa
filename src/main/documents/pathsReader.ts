import { dialog } from "electron";
import { validExtensions } from "./documentParser";

/**
 * This function opens a dialog box for the user to select documents that are of the supported types.
 * If the user cancels the dialog, the function returns an empty array.
 * Otherwise, it returns an array of strings representing the paths of the selected documents.
 * @returns a promise that resolves to an array of strings representing the paths of the selected documents
 */
export const readPaths = async (): Promise<string[]> => {
  const { filePaths, canceled } = await dialog.showOpenDialog({
    title: "Select documents",
    properties: ["openFile", "multiSelections"],
    filters: [{ name: "Supported Documents", extensions: validExtensions }],
  });
  if (canceled) {
    return [];
  } else {
    return filePaths;
  }
};
