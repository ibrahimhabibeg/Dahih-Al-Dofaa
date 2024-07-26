import React from "react";
import { Close, Delete, Download } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  abortDownloadingModel,
  downloadModel,
  deleteModel,
} from "../../backend/model";

type PropsType = {
  model: Model;
};

const ModelDownloadIcon = ({ model }: PropsType) => {
  if (model.status === "downloading") {
    return (
      <IconButton onClick={() => abortDownloadingModel(model.id)}>
        <Close />
      </IconButton>
    );
  } else if (model.status === "downloaded") {
    return (
      <IconButton onClick={() => deleteModel(model.id)}>
        <Delete />
      </IconButton>
    );
  } else {
    return (
      <IconButton onClick={() => downloadModel(model.id)}>
        <Download />
      </IconButton>
    );
  }
};

export default ModelDownloadIcon;
