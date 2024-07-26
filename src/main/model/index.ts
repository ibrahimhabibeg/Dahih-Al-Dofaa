import ModelsManager from "./ModelsManager";
import { ipcMain } from "electron";

ipcMain.handle("model:getAll", async () => {
  const modelManager = await ModelsManager.getInstance();
  return modelManager.getModels();
});

export const getEmbeddingsModel = async () => {
  const modelManager = await ModelsManager.getInstance();
  return modelManager.getSelectedEmbedding();
};

export const getLLM = async () => {
  const modelManager = await ModelsManager.getInstance();
  return modelManager.getSelectedLLM();
};
