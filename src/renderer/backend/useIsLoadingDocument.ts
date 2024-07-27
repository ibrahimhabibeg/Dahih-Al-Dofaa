import { useState, useEffect } from "react";

const useIsLoadingDocument = (courseId: string, documentId: string) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.api.document.isLoading(courseId, documentId).then((loading) => {
      setIsLoading(loading);
    });

    window.api.document.subscribeToIsLoading(
      courseId,
      documentId,
      (event, loading) => {
        setIsLoading(loading);
      }
    );

    return () => {
      window.api.document.unsubscribeFromIsLoading(courseId, documentId);
    };
  }, [courseId, documentId]);

  return isLoading;
};

export default useIsLoadingDocument;
