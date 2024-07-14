import React from "react";
import {
  PictureAsPdf,
  Slideshow,
  Description,
  ShortText,
  Article,
} from "@mui/icons-material";

const DocumentIcon = ({ docType }: { docType: DocType }) => {
  switch (docType) {
    case "pdf":
      return <PictureAsPdf />;
    case "docx":
      return <Description />;
    case "ppt":
      return <Slideshow />;
    case "pptx":
      return <Slideshow />;
    case "txt":
      return <ShortText />;
    default:
      return <Article />;
  }
};

export default DocumentIcon;
