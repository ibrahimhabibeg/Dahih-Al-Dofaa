import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";

const getLoader = (document: Doc) => {
  if (document.docType === "docx") {
    return new DocxLoader(document.path);
  } else if (document.docType === "pdf") {
    return new PDFLoader(document.path);
  } else if (document.docType === "pptx") {
    return new PPTXLoader(document.path);
  }
};

export default getLoader;
