import React, { useState } from "react";
import { Radio, Snackbar, IconButton, Portal, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";

type PropsType = {
  isSelected: boolean;
  model: Model;
  setSelectedModel: (modelId: string) => void;
};

const ModelRadio = ({ model, isSelected, setSelectedModel }: PropsType) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const theme = useTheme();

  const handleClick = () => {
    if (model.status == "downloading") {
      setSnackbarMessage("Please wait for the download to finish.");
      setSnackbarOpen(true);
      return;
    } else if (model.status == "not downloaded") {
      setSnackbarMessage("Download model first.");
      setSnackbarOpen(true);
      return;
    } else {
      setSelectedModel(model.id);
    }
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Radio checked={isSelected} onClick={handleClick} />
      <Portal>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          action={[
            <IconButton
              onClick={handleClose}
              sx={{
                color: theme.palette.background.default,
              }}
            >
              <Close />
            </IconButton>,
          ]}
        />
      </Portal>
    </>
  );
};

export default ModelRadio;
