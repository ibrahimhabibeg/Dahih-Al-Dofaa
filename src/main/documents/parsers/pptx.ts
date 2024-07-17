// eslint-disable-next-line import/no-unresolved
import { getTextExtractor } from "office-text-extractor";

const parsePPTX = async (document: Doc): Promise<string> => {
  const extractor = getTextExtractor();
  const text = await extractor.extractText({
    input: document.path,
    type: "file",
  });
  return text;
};

export default parsePPTX;
