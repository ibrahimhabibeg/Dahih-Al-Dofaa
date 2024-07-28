export const modelsDescription: ModelDescription[] = [
  {
    id: "llama3.1:8b",
    name: "LLaMa 3.1",
    description: "(Suggested) The new state-of-the-art model from Meta",
    size: 4813,
    minimumRAM: 16,
    type: "llm",
  },
  {
    id: "phi3:3.8b",
    name: "Phi 3 mini",
    description:
      "(Suggested) Phi-3 mini is a lightweight state-of-the-art model by Microsoft.",
    size: 2253,
    minimumRAM: 8,
    type: "llm",
  },
  {
    id: "gemma2:9b",
    name: "Gemma 2",
    description: "Gemma-2 is an open-source LLM made by Google.",
    size: 5530,
    minimumRAM: 16,
    type: "llm",
  },
  {
    id: "codegemma:7b",
    name: "CodeGemma 7B",
    description: `CodeGemma is a collection of powerful, lightweight models that can 
    perform a variety of coding tasks like fill-in-the-middle code completion, code 
    generation, natural language understanding, mathematical reasoning, and instruction 
    following.`,
    size: 5120,
    minimumRAM: 16,
    type: "llm",
  },
  {
    id: "qwen2:1.5b",
    name: "Qwen 2 small",
    description: "A small version of Qwen2 LLM made by Alibaba.",
    size: 935,
    minimumRAM: 8,
    type: "llm",
  },
  {
    id: "nomic-embed-text:v1.5",
    name: "Nomic Embed Text",
    description:
      "(Suggested) A high-performing open embedding model with a large token context window.",
    size: 274,
    minimumRAM: 8,
    type: "embedding",
  },
  {
    id: "mxbai-embed-large:335m",
    name: "MXBAI Embed Large",
    description: "State-of-the-art large embedding model from mixedbread.ai",
    size: 670,
    minimumRAM: 8,
    type: "embedding",
  },
];

export const isLLMModelId = (modelId: string): modelId is ModelID => {
  return modelsDescription.some(
    (description) => description.id === modelId && description.type === "llm"
  );
};

export const isEmbeddingModelId = (modelId: string): modelId is ModelID => {
  return modelsDescription.some(
    (description) =>
      description.id === modelId && description.type === "embedding"
  );
};

export const isModelId = (modelId: string): modelId is ModelID => {
  return modelsDescription.some((description) => description.id === modelId);
};
