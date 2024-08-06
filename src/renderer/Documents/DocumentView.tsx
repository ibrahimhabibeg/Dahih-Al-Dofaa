import React, { useState } from "react";
import DocumentEditing from "./DocumentEditing";
import FinishedDocument from "./FinishedDocument";
import useDocumentImportState from "../backend/documents/useDocumentImportState";
import LoadingDocument from "./LoadingDocument";

type DocumentViewProps = {
  document: Doc;
  courseId: string;
};

const DocumentView = ({ document }: DocumentViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const importState = useDocumentImportState(document.id);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditFinished = () => {
    setIsEditing(false);
  };

  if (importState) {
    return <LoadingDocument document={document} importState={importState} />;
  } else if (isEditing) {
    return (
      <DocumentEditing document={document} onFinished={handleEditFinished} />
    );
  } else {
    return <FinishedDocument document={document} handleEdit={handleEdit} />;
  }
};

export default DocumentView;
