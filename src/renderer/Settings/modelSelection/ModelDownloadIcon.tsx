import React, { useState } from "react";
import { Close, Delete, Download } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import {
  abortDownloadingModel,
  downloadModel,
  deleteModel,
} from "../../backend/model";
import ModelDeleteModal from "./ModelDeleteModal";
import ModelAbortModal from "./ModelAbortModal";

type PropsType = {
  model: Model;
};

const ModelDownloadIcon = ({ model }: PropsType) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    deleteModel(model.id);
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const [isAbortModalOpen, setIsAbortModalOpen] = useState(false);

  const openAbortModal = () => {
    setIsAbortModalOpen(true);
  };

  const closeAbortModal = () => {
    setIsAbortModalOpen(false);
  };

  const handleAbortDownload = () => {
    abortDownloadingModel(model.id);
    setIsAbortModalOpen(false);
  };

  if (model.status === "downloading") {
    return (
      <>
        <Tooltip title="Cancel Download">
          <IconButton onClick={openAbortModal}>
            <Close />
          </IconButton>
        </Tooltip>
        <ModelAbortModal
          isOpen={isAbortModalOpen}
          onClose={closeAbortModal}
          handleAbortDownload={handleAbortDownload}
          model={model}
        />
      </>
    );
  } else if (model.status === "downloaded") {
    return (
      <>
        <Tooltip title="Delete Model">
          <IconButton onClick={openDeleteModal}>
            <Delete />
          </IconButton>
        </Tooltip>
        <ModelDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          handleDelete={handleDelete}
          model={model}
        />
      </>
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
