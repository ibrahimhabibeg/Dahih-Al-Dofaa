import React, { useEffect, useState } from "react";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  ListItemButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DocumentIcon from "./DocumentIcon";
import openDocument from "../backend/documents/openDocument";
import deleteDocument from "../backend/documents/deleteDocument";
import renameDocument from "../backend/documents/renameDocument";

type DocumentViewProps = {
  document: Doc;
  courseId: string;
};

const DocumentView = ({ document }: DocumentViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(document.title);

  useEffect(() => {
    setTitle(document.title);
  }, [document]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    deleteDocument(document.id);
  };

  const handleRename = (newTitle: string) => {
    renameDocument(document.id, newTitle);
  };

  const handleSave = () => {
    handleRename(title);
    setIsEditing(false);
  };
  if (isEditing) {
    return (
      <ListItem>
        <TextField
          defaultValue={document.title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          value={title}
          focused={true}
        />
      </ListItem>
    );
  } else {
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
  }
};

export default DocumentView;
