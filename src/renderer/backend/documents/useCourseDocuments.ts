import { useState, useEffect } from "react";

const useCourseDocuments = (courseID: string) => {
  const [documents, setDocuments] = useState<Doc[]>([]);

  useEffect(() => {
    window.api.document.getAllByCourse(courseID).then((documents) => {
      setDocuments(documents);
    });

    window.api.document.subuscribeToCourseDocuments(courseID, (documents) => {
      setDocuments(documents);
    });

    return () => {
      window.api.document.unsubscribeFromCourseDocuments(courseID);
    };
  }, [courseID]);

  return documents;
};

export default useCourseDocuments;
