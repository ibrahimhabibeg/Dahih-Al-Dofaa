import React from "react";
import { Button } from "@mui/material";
import { Upload } from "@mui/icons-material";

type PropsType = {
  courseId: string;
};

const ImportDocumentButton = ({ courseId }: PropsType) => {
  const handleImport = () => {
    window.api.document.add(courseId);
  };

  return (
    <Button startIcon={<Upload />} variant={"outlined"} onClick={handleImport}>
      Import
    </Button>
  );
};

export default ImportDocumentButton;
