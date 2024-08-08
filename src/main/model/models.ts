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
    id: "phi3:14b",
    name: "Phi 3 medium",
    description: "A larger version of Phi-3 mini. Made by Microsoft.",
    size: 8090,
    minimumRAM: 32,
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
    id: "codegemma:2b",
    name: "CodeGemma 2B",
    description: "A lighter version of CodeGemma 7B",
    size: 1639,
    minimumRAM: 8,
    type: "llm",
  },
  {
    id: "qwen2:7b",
    name: "Qwen 2",
    description:
      "Qwen2 is a new series of large language models from Alibaba group.",
    size: 4506,
    minimumRAM: 16,
    type: "llm",
  },
  {
    id: "qwen2:1.5b",
    name: "Qwen 2 small",
    description: "A smaller version of Qwen2",
    size: 935,
    minimumRAM: 8,
    type: "llm",
  },
  {
    id: "qwen2:0.5b",
    name: "Qwen 2 mini",
    description: "A even more lightweight version of Qwen2",
    size: 352,
    minimumRAM: 8,
    type: "llm",
  },
  {
    id: "mistral-nemo:12b",
    name: "Mistral Nemo",
    description: `A state-of-the-art 12B model with 128k context length, built by Mistral AI
    in collaboration with NVIDIA.`,
    size: 7271,
    minimumRAM: 16,
    type: "llm",
  },
  {
    id: "mistral:7b",
    name: "Mistral 7B",
    description: "The 7B model released by Mistral AI",
    size: 4199,
    minimumRAM: 8,
    type: "llm",
  },
  {
    id: "deepseek-coder-v2:16b",
    name: "DeepSeek Coder V2",
    description: `An open-source Mixture-of-Experts code language model that achieves
    performance comparable to GPT4-Turbo in code-specific tasks.`,
    size: 9114,
    minimumRAM: 32,
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
