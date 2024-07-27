import React from "react";
import { useLLMs } from "../backend/model";
import { Box, Typography } from "@mui/material";
import ModelCard from "../Settings/modelSelection/ModelCard";

const LLMSetup = () => {
  const llms = useLLMs();

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
          Download and select an LLM
        </Typography>
        <Typography variant="body1" marginBottom={2}>
          An LLM is needed by the app to generate answers.
        </Typography>
        <Box>
          {llms.map((llm) => (
            <ModelCard key={llm.id} model={llm} type="llm" />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LLMSetup;
