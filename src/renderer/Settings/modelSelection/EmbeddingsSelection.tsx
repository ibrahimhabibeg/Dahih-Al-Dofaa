import React from "react";
import { Box, Typography } from "@mui/material";
import ModelCard from "./ModelCard";
import { useEmbeddingModels } from "../../backend/model";
import requiresOllama from "../../Requirers/RequiresOllama";

const EmbeddingsSelection = () => {
  const embeddingModels = useEmbeddingModels();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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

export default requiresOllama(EmbeddingsSelection);
