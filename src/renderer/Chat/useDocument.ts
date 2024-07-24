import { useState, useEffect } from "react";

type PropsType = {
  courseId: string;
  documentId: string;
};

const useDocument = ({ courseId, documentId }: PropsType) => {
  const [document, setDocument] = useState<Doc | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      const doc = await window.api.document.get(courseId, documentId);
      setDocument(doc);
    };

    fetchDocument();
  }, [courseId, documentId]);

  return document;
};

export default useDocument;
