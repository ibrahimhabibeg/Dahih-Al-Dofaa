import { useState, useEffect } from "react";

const useDocument = (documentId: string) => {
  const [document, setDocument] = useState<Doc | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      const doc = await window.api.document.get(documentId);
      setDocument(doc);
    };

    fetchDocument();
  }, [documentId]);

  return document;
};

export default useDocument;
