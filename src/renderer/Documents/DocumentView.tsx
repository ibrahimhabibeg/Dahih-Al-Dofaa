import React, { useEffect, useState } from "react";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DocumentIcon from "./DocumentIcon";

type DocumentViewProps = {
  document: Doc;
  handleDelete: () => void;
  handleRename: (newTitle: string) => void;
};

const DocumentView = ({
  document,
  handleDelete,
  handleRename,
}: DocumentViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(document.title);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(document.title);

    window.api.listenToDocument(document.id).then((loading) => {
      setIsLoading(loading);
    });

    window.api.onDocumentLoading((documentId: string) => {
      if (documentId === document.id) {
        setIsLoading(true);
      }
    });

    window.api.onDocumentLoaded((documentId: string) => {
      if (documentId === document.id) {
        setIsLoading(false);
      }
    });

    return () => {
      window.api.stopListeningToDocument(document.id);
    };
  }, [document]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    handleRename(title);
    setIsEditing(false);
  };

  return (
    <>
      <ListItem>
        <ListItemIcon>
          <DocumentIcon docType={document.docType} />
        </ListItemIcon>
        <ListItemText>
          {isEditing ? (
            <TextField
              defaultValue={document.title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSave}
              value={title}
              focused={true}
            />
          ) : (
            <Typography>{document.title}</Typography>
          )}
        </ListItemText>
        {isLoading && <CircularProgress size={24} sx={{ marginRight: 2 }} color="inherit" />}
        <ListItemIcon>
          <IconButton onClick={handleEdit} sx={{ marginRight: 2 }}>
            <Edit />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </ListItemIcon>
      </ListItem>
    </>
  );
};

export default DocumentView;
