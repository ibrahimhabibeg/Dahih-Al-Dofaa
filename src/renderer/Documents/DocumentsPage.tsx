import React from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const DocumentsPage = () => {
  const { courseId } = useParams();
  return <Typography variant="h1">Documents</Typography>;
};

export default DocumentsPage;
