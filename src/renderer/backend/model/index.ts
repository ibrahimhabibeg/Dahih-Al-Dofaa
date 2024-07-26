import useLLMs from "./useLLMs";
import useEmbeddingModels from "./useEmbeddingModels";

export { useLLMs, useEmbeddingModels };
export const downloadModel = (modelId: string) => {
  window.api.model.download(modelId);
};
export const abortDownloadingModel = (modelId: string) => {
  window.api.model.abortDownloading(modelId);
};
export const deleteModel = (modelId: string) => {
  window.api.model.delete(modelId);
};
