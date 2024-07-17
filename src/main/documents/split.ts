import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const split = async (text: string): Promise<string[]> => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  return splitter.splitText(text);
};

export default split;
