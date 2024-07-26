export type ModelID =
  | "llama3.1:8b"
  | "gemma2:9b"
  | "mistral-nemo:12b"
  | "qwen2:0.5b"
  | "qwen2:1.5b"
  | "qwen2:7b"
  | "deepseek-coder-v2:16b"
  | "phi3:3.8b"
  | "phi3:14b"
  | "mistral:7b"
  | "codegemma:2b"
  | "codegemma:7b"
  | "nomic-embed-text:v1.5"
  | "mxbai-embed-large:335m";

export type ModelStatus = "downloading" | "downloaded" | "not downloaded";

export type ModelType = "llm" | "embedding";

/**
 * Model description
 * @param id - The name of the model in ollama including the parameter size
 * @param name - The name of the model. Not related to ollama name
 * @param description - A brief description of the model
 * @param size - The size of the model in MB
 * @param minimumRAM - The minimum RAM required to run the model in GB
 */
export type ModelDescription = {
  id: ModelID;
  name: string;
  description: string;
  size: number;
  minimumRAM: number;
  type: ModelType;
};

export type Model = {
  id: ModelID;
  status: ModelStatus;
  description: ModelDescription;
  isSelectedLlm: boolean;
  isSelectedEmbedding: boolean;
};
