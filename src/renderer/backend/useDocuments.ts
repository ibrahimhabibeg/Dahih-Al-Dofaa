import { useState, useEffect } from "react";

const useDocuments = (courseID: string) => {
  const [documents, setDocuments] = useState<Doc[]>([]);

  useEffect(() => {
    window.api.document.getAll(courseID).then((documents) => {
      setDocuments(documents);
    });

    window.api.document.subscribeToAllDocuments(courseID, (event, documents)=>{
      setDocuments(documents);
    });

    return () => {
      window.api.document.unsubscribeFromAllDocuments(courseID);
    };

  }, [courseID]);

  return documents;
};

export default useDocuments;
