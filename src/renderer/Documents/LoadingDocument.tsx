import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { CheckCircle, Loop, Pending } from "@mui/icons-material";

type PropsType = {
  document: Doc;
  importState: DocumentImportState;
};

const LoadingDocument = ({ document, importState }: PropsType) => {
  return (
    <ListItem>
      <ListItemText>
        <Typography>{document.title}</Typography>
      </ListItemText>
      <List>
        {importState.map(({ stage, progress, completed, total }, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              {progress === "Not Started" ? (
                <Pending color="disabled" />
              ) : progress === "In Progress" ? (
                <Loop color="primary" />
              ) : (
                <CheckCircle color="success" />
              )}
            </ListItemIcon>
            <ListItemText>
              <Typography>
                {stage} {completed && total ? `${completed}/${total}` : ""}
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </ListItem>
  );
};

export default LoadingDocument;
