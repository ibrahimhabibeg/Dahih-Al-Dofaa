import React from "react";
import {
  PictureAsPdf,
  Slideshow,
  Description,
  Article,
} from "@mui/icons-material";

const DocumentIcon = ({ docType }: { docType: DocType }) => {
  switch (docType) {
    case "pdf":
      return <PictureAsPdf />;
    case "docx":
      return <Description />;
    case "pptx":
      return <Slideshow />;
    default:
      return <Article />;
  }
};

export default DocumentIcon;
