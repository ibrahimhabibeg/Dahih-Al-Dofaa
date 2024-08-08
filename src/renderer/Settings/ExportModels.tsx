import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import exportModels from "../backend/modelTransfer/exportModels";
import { Folder } from "@mui/icons-material";

const ExportModels = () => {
  return (
    <ListItemButton onClick={exportModels}>
      <ListItemIcon>
        <Folder />
      </ListItemIcon>
      <ListItemText
        primary="Export Models"
        secondary={`Create models folder in the selected location that can be imported later`}
      />
    </ListItemButton>
  );
};

export default ExportModels;
