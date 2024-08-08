import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import ChangeTheme from "./ChangeTheme";
import { ArrowForward, AutoAwesome, Calculate } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ExportModels from "./ExportModels";
import ImportModels from "./ImportModels";
import Temperature from "./Temperature";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "80%", marginTop: 5 }}>
        <Typography variant="h4">Settings</Typography>
        <List>
          <ChangeTheme />
          <ListItemButton onClick={() => navigate("/settings/llm")}>
            <ListItemIcon>
              <AutoAwesome />
            </ListItemIcon>
            <ListItemText primary="LLM Selection" />
            <ArrowForward />
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/settings/embeddings")}>
            <ListItemIcon>
              <Calculate />
            </ListItemIcon>
            <ListItemText primary="Embeddings Model Selection" />
            <ArrowForward />
          </ListItemButton>
          <ExportModels />
          <ImportModels />
          <Temperature />
        </List>
      </Box>
    </Box>
  );
};

export default Settings;
