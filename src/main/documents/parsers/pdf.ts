// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pdf from "pdf-parse-debugging-disabled";

const parsePdf = async (document: Doc): Promise<string> => {
  const data = await pdf(document.path);
  return data.text;
};

export default parsePdf;
