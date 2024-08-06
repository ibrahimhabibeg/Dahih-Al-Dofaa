import React from "react";
import { Button } from "@mui/material";
import { Upload } from "@mui/icons-material";
import importDocuments from "../backend/documents/importDocuments";

type PropsType = {
  courseId: string;
};

const ImportDocumentButton = ({ courseId }: PropsType) => {
  const handleImport = () => {
    importDocuments(courseId);
  };

  return (
    <Button startIcon={<Upload />} variant={"outlined"} onClick={handleImport}>
      Import
    </Button>
  );
};

export default ImportDocumentButton;
