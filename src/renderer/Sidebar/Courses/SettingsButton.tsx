import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SettingsButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/settings");
  };

  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary={"Settings"} />
      </ListItemButton>
    </List>
  );
};

export default SettingsButton;
