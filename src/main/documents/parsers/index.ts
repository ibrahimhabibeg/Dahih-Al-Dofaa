import parsePdf from "./pdf";
import parsePPTX from "./pptx";

async function parseDocument(document: Doc): Promise<string> {
  if (document.docType === "pdf") {
    return parsePdf(document);
  } else if (document.docType === "pptx") {
    return parsePPTX(document);
  }
  return "";
}

export default parseDocument;
