import { Ollama } from "ollama";
import ollamaStarter from "../ollama/OllamaStarter";

const embed = async (textArray: string[]): Promise<number[][]> => {
  const ollama = new Ollama({ host: ollamaStarter.getHost() });
  const embeddings = [];
  for (const text of textArray) {
    const response = await ollama.embeddings({
      model: "nomic-embed-text",
      prompt: text,
    });
    embeddings.push(response.embedding);
  }
  return embeddings;
};

export default embed;
