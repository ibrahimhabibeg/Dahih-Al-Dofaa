import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";
import { EPubLoader } from "@langchain/community/document_loaders/fs/epub";
import { TextLoader } from "langchain/document_loaders/fs/text";
import path from "path";

/**
 * Parse a document and return its content as an array of strings.
 * @param document the document to be parsed
 * @returns a promise that resolves to an array of strings representing the content of the document
 */
export const parseDocument = async (document: Doc): Promise<string[]> => {
  const extension = path.extname(document.path).toLowerCase();
  switch (extension) {
    case ".pdf":
      return parsePdf(document);
    case ".docx":
      return parseDocx(document);
    case ".pptx":
      return parsePptx(document);
    case ".epub":
      return parseEpub(document);
    default:
      return parseText(document);
  }
};

const parsePdf = async (document: Doc): Promise<string[]> => {
  const loader = new PDFLoader(document.path, {
    splitPages: false,
  });
  const docs = await loader.load();
  return docs.map((doc) => doc.pageContent);
};

const parseDocx = async (document: Doc): Promise<string[]> => {
  const loader = new DocxLoader(document.path);
  const docs = await loader.load();
  return docs.map((doc) => doc.pageContent);
};

const parsePptx = async (document: Doc): Promise<string[]> => {
  const loader = new PPTXLoader(document.path);
  const docs = await loader.load();
  return docs.map((doc) => doc.pageContent);
};

const parseEpub = async (document: Doc): Promise<string[]> => {
  const loader = new EPubLoader(document.path);
  const docs = await loader.load();
  return docs.map((doc) => doc.pageContent);
};

const parseText = async (document: Doc): Promise<string[]> => {
  const loader = new TextLoader(document.path);
  const docs = await loader.load();
  return docs.map((doc) => doc.pageContent);
};

export const validExtensions = ["pdf", "docx", "pptx", "epub", "txt"];
