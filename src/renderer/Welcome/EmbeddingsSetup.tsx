import React from "react";
import { useEmbeddingModels } from "../backend/model";
import { Box, Typography } from "@mui/material";
import ModelCard from "../Settings/modelSelection/ModelCard";

const EmbeddingsSetup = () => {
  const models = useEmbeddingModels();

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
        <Typography variant="h4" marginBottom={2}>
          Download and select an Embedding Model
        </Typography>
        <Typography variant="body1" marginBottom={2}>
          The app needs an embedding model to read and understand your
          documents.
        </Typography>
        <Box>
          {models.map((model) => (
            <ModelCard key={model.id} model={model} type="embeddings" />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default EmbeddingsSetup;
