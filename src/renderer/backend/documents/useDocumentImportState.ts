import { useState, useEffect } from "react";

const useDocumentImportState = (documentID: string) => {
  const [documentState, setDocumentState] = useState<DocumentImportState>(null);

  useEffect(() => {
    window.api.document
      .importState(documentID)
      .then((importState: DocumentImportState) => {
        setDocumentState(importState);
      });

    window.api.document.subscribeToDocumentImport(
      documentID,
      (importState: DocumentImportState) => {
        setDocumentState(importState);
      }
    );

    return () => {
      window.api.document.unsubscribeFromDocumentImport(documentID);
    };
  }, [documentID]);

  return documentState;
};

export default useDocumentImportState;
