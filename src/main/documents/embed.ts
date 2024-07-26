import { Ollama } from "ollama";
import ollamaStarter from "../ollama/OllamaStarter";
import { getEmbeddingsModel } from "../model";

const embed = async (textArray: string[]): Promise<number[][]> => {
  const ollama = new Ollama({ host: ollamaStarter.getHost() });
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
