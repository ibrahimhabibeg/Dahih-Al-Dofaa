import useLLMs from "./useLLMs";
import useEmbeddingModels from "./useEmbeddingModels";
import useDownloadingModelProgress from "./useDownloadingModelProgress";

export { useLLMs, useEmbeddingModels, useDownloadingModelProgress };

export const downloadModel = (modelId: string) => {
  window.api.model.download(modelId);
};

export const abortDownloadingModel = (modelId: string) => {
  window.api.model.abortDownloading(modelId);
};

export const deleteModel = (modelId: string) => {
  window.api.model.delete(modelId);
};

export const setSelectedEmbedding = (modelId: string) => {
  window.api.model.setSelectedEmbedding(modelId);
};

export const setSelectedLLM = (modelId: string) => {
  window.api.model.setSelectedLLM(modelId);
};
