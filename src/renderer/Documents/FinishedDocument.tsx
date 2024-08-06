import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DocumentIcon from "./DocumentIcon";
import openDocument from "../backend/documents/openDocument";
import deleteDocument from "../backend/documents/deleteDocument";

type PropsType = {
  document: Doc;
  handleEdit: () => void;
};

const FinishedDocument = ({ document, handleEdit }: PropsType) => {
  const handleDelete = () => {
    deleteDocument(document.id);
  };

  return (
    <ListItem>
      <ListItemButton onClick={() => openDocument(document.id)}>
        <ListItemIcon>
          <DocumentIcon docType={document.docType} />
        </ListItemIcon>
        <ListItemText>
          <Typography>{document.title}</Typography>
        </ListItemText>
      </ListItemButton>
      <ListItemIcon>
        <IconButton onClick={handleEdit} sx={{ marginRight: 2 }}>
          <Edit />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

export default FinishedDocument;
