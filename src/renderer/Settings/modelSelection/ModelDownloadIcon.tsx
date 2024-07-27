import React from "react";
import { Close, Delete, Download } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
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
      <Tooltip title="Cancel Download">
        <IconButton onClick={() => abortDownloadingModel(model.id)}>
          <Close />
        </IconButton>
      </Tooltip>
    );
  } else if (model.status === "downloaded") {
    return (
      <Tooltip title="Delete Model">
        <IconButton onClick={() => deleteModel(model.id)}>
          <Delete />
        </IconButton>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="Download Model">
        <IconButton onClick={() => downloadModel(model.id)}>
          <Download />
        </IconButton>
      </Tooltip>
    );
  }
};

export default ModelDownloadIcon;
