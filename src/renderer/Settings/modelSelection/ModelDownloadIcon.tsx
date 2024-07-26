import React from "react";
import { Delete, Download } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type PropsType = {
  model: Model;
};

const ModelDownloadIcon = ({ model }: PropsType) => {
  return (
    <IconButton>
      {model.status === "downloaded" ? <Delete /> : <Download />}
    </IconButton>
  );
};

export default ModelDownloadIcon;
