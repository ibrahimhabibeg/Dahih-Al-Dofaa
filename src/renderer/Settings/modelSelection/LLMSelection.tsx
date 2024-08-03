import React from "react";
import { useLLMs } from "../../backend/model";
import { Box, Typography } from "@mui/material";
import ModelCard from "./ModelCard";
import requiresOllama from "../../Requirers/RequiresOllama";

const LLMSelection = () => {
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
        <Typography variant="h4" marginBottom={5}>
          LLM Selection
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

export default requiresOllama(LLMSelection);
