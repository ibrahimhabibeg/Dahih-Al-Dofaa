import React from "react";
import { Box, Typography } from "@mui/material";
import ModelCard from "./ModelCard";
import useScrollbarStyle from "../../UI/useScrollbarStyle";
import { useEmbeddingModels } from "../../backend/model";

const EmbeddingsSelection = () => {
  const embeddingModels = useEmbeddingModels();
  const scrollBarStyle = useScrollbarStyle();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        overflowY: "auto",
        ...scrollBarStyle,
      }}
    >
      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          marginTop: 5,
        }}
      >
        <Typography variant="h4" marginBottom={5}>
          Embeddings Model Selection
        </Typography>
        <Box>
          {embeddingModels.map((model) => (
            <ModelCard key={model.id} model={model} type="embeddings" />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default EmbeddingsSelection;
