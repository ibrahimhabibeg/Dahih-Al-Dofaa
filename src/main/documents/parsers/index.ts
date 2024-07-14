import parsePdf from "./pdf";

const parseDocument = async (document: Doc): Promise<string> => {
  switch (document.docType) {
    case "pdf": {
      const text = await parsePdf(document);
      return text;
    }
    default:
      return "";
  }
};

export default parseDocument;
