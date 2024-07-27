import { Ollama } from "ollama";
import { getEmbeddingsModel } from "../model";
import { getOllamaHost } from "../ollama";
import log from "../utils/log";

const embed = async (textArray: string[]): Promise<number[][]> => {
  const ollama = new Ollama({ host: getOllamaHost() });
  const embeddings = [];
  const model = await getEmbeddingsModel();
  log(`Embedding ${textArray.length} texts`);
  const start = Date.now();
  for (const text of textArray) {
    const response = await ollama.embeddings({
      model,
      prompt: text,
    });
    embeddings.push(response.embedding);
  }
  const end = Date.now();
  log(`Embedded ${textArray.length} texts in ${(end - start)/1000}s`);
  return embeddings;
};

export default embed;
