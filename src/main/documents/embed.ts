import { Ollama } from "ollama";
import { getEmbeddingsModel } from "../model";
import { getOllamaHost } from "../ollama";

const embed = async (textArray: string[]): Promise<number[][]> => {
  const ollama = new Ollama({ host: getOllamaHost() });
  const embeddings = [];
  const model = await getEmbeddingsModel();
  for (const text of textArray) {
    const response = await ollama.embeddings({
      model,
      prompt: text,
    });
    embeddings.push(response.embedding);
  }
  return embeddings;
};

export default embed;
