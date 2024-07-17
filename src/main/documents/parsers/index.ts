import parsePdf from "./pdf";
import parsePPTX from "./pptx";
import parseDOCX from "./docx";

async function parseDocument(document: Doc): Promise<string> {
  if (document.docType === "pdf") {
    return parsePdf(document);
  } else if (document.docType === "pptx") {
    return parsePPTX(document);
  } else if (document.docType === "docx") {
    return parseDOCX(document);
  }
  return "";
}

export default parseDocument;
