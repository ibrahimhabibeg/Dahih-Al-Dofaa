import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Article } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface PropsType {
  courseId: string;
}

const DocumnetsButton = ({ courseId }: PropsType) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <List>
        <ListItemButton onClick={() => navigate(`/documents/${courseId}`)}>
          <ListItemIcon>
            <Article />
          </ListItemIcon>
          <ListItemText primary={"Documents"} />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default DocumnetsButton;
