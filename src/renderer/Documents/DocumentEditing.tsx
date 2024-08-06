import React, { useState } from "react";
import { ListItem, TextField } from "@mui/material";
import renameDocument from "../backend/documents/renameDocument";

type PropsType = {
  document: Doc;
  onFinished: () => void;
};

const DocumentEditing = ({ document, onFinished }: PropsType) => {
  const [title, setTitle] = useState(document.title);

  const handleSave = () => {
    renameDocument(document.id, title);
    onFinished();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <ListItem>
      <TextField
        defaultValue={document.title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleSave}
        value={title}
        focused={true}
        onKeyDown={handleKeyDown}
      />
    </ListItem>
  );
};

export default DocumentEditing;
