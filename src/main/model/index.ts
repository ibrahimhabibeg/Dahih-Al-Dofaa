import ModelsManager from "./ModelsManager";

export const getEmbeddingsModel = async () => {
  const modelManager = await ModelsManager.getInstance();
  return modelManager.getSelectedEmbedding();
};

export const getLLM = async () => {
  const modelManager = await ModelsManager.getInstance();
  return modelManager.getSelectedLLM();
};
