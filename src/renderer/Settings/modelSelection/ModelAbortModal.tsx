import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  useTheme,
  Divider,
} from "@mui/material";

type PropsType = {
  model: Model;
  onClose: () => void;
  handleAbortDownload: () => void;
  isOpen: boolean;
};

const ModelAbortModal = ({
  model,
  onClose,
  handleAbortDownload,
  isOpen,
}: PropsType) => {
  const theme = useTheme();

  return (
    <Modal onClose={onClose} open={isOpen}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 4,
            borderRadius: 4,
            alignItems: "center",
          }}
        >
          <Typography>
            Are you sure you want to abort the download of the model{" "}
            {model.description.name}?
          </Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "80%",
            }}
          >
            <Button onClick={onClose} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleAbortDownload}
              variant="contained"
              color={"error"}
            >
              Abort Download
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModelAbortModal;
