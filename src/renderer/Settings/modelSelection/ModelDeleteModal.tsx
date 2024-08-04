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
  handleDelete: () => void;
  isOpen: boolean;
};

const ModelDeleteModal = ({
  model,
  onClose,
  handleDelete,
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
            Are you sure you want to delete the model {model.description.name}?
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
            <Button onClick={onClose}
              color="inherit"
            >
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="contained" color={"error"}>
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModelDeleteModal;
