import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { embed } from "./embeddings";

/**
 * Generate excerpts from parsed document
 * @param parsedDocument String array of containing text of the document in appropriate size
 * @param document The document for which the excerpts are generated
 * @returns Promise of Excerpt array
 */
export const generateExcerpts = async (
  parsedDocument: string[],
  document: Doc
): Promise<Excerpt[]> => {
  const splittedTexts: string[] = [];
  for (const text of parsedDocument) {
    splittedTexts.push(...(await splitText(text)));
  }
  const excerpts: Excerpt[] = [];
  for (const text of splittedTexts) {
    const embeddings = await embed(text);
    excerpts.push({
      text,
      embeddings,
      documentId: document.id,
      documentTitle: document.title,
      courseId: document.courseId,
    });
  }
  return excerpts;
};

const SPLIT_NUMBER_CHARACTERS = 500;
const SPLIT_OVERLAP_CHARACTERS = 50;

const splitText = async (text: string): Promise<string[]> => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: SPLIT_NUMBER_CHARACTERS,
    chunkOverlap: SPLIT_OVERLAP_CHARACTERS,
  });
  return splitter.splitText(text);
};
