import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama"
import { getHost } from "../ollama"

export const getEmbeddingsModel = () => {
  const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: getHost(),
  });
  return embeddings;
}
