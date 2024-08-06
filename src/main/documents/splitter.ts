import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const SPLIT_NUMBER_CHARACTERS = 500;
const SPLIT_OVERLAP_CHARACTERS = 50;

export const splitText = async (text: string): Promise<string[]> => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: SPLIT_NUMBER_CHARACTERS,
    chunkOverlap: SPLIT_OVERLAP_CHARACTERS,
  });
  return splitter.splitText(text);
};
