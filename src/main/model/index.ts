import { isModelId } from "./models";
import ModelsManager from "./ModelsManager";
import { ipcMain } from "electron";

ipcMain.handle("model:getAll", async () => {
  const modelManager = await ModelsManager.getInstance();
  return modelManager.getModels();
});

ipcMain.handle("model:download", async (event, modelId: string) => {
  const modelManager = await ModelsManager.getInstance();
  if (!isModelId(modelId)) return;
  modelManager.downloadModel(modelId);
});

ipcMain.handle("model:abortDownloading", async (event, modelId: string) => {
  if (!isModelId(modelId)) return;
  const modelManager = await ModelsManager.getInstance();
  modelManager.abortDownloadingModel(modelId);
});

ipcMain.handle("model:delete", async (event, modelId: string) => {
  if (!isModelId(modelId)) return;
  const modelManager = await ModelsManager.getInstance();
  modelManager.deleteModel(modelId);
});

ipcMain.handle("model:setSelectedEmbedding", async (event, modelId: string) => {
  if (!isModelId(modelId)) return;
  const modelManager = await ModelsManager.getInstance();
  modelManager.selectEmbedding(modelId);
});

ipcMain.handle("model:setSelectedLLM", async (event, modelId: string) => {
  if (!isModelId(modelId)) return;
  const modelManager = await ModelsManager.getInstance();
  modelManager.selectLLM(modelId);
});

export const getEmbeddingsModel = async () => {
  const modelManager = await ModelsManager.getInstance();
  return modelManager.getSelectedEmbedding();
};

export const getLLM = async () => {
  const modelManager = await ModelsManager.getInstance();
  return modelManager.getSelectedLLM();
};
