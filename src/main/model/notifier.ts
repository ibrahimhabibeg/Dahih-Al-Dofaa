import { ProgressResponse } from "ollama";
import { webContents } from "electron";

export const notifyDownloadingStatus = (
  modelId: ModelID,
  status: ProgressResponse
) => {
  const windows = webContents.getAllWebContents();
  windows.forEach((window) => {
    window.send(`model:downloading:${modelId}`, status);
  });
};

export const notifyModelsUpdate = (models: Model[]) => {
  const windows = webContents.getAllWebContents();
  windows.forEach((window) => {
    window.send("model:update", models);
  });
};

export const notifySelectedEmbeddingUpdate = (modelId: ModelID) => {
  const windows = webContents.getAllWebContents();
  windows.forEach((window) => {
    window.send("model:selectedEmbedding", modelId);
  });
};

export const notifySelectedLLMUpdate = (modelId: ModelID) => {
  const windows = webContents.getAllWebContents();
  windows.forEach((window) => {
    window.send("model:selectedLLM", modelId);
  });
}
