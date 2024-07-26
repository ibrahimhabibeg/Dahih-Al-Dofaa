import React from "react";
import useLLMs from "../../backend/useLLMs";
import { Box, Typography } from "@mui/material";
import ModelCard from "./ModelCard";
import useScrollbarStyle from "../../UI/useScrollbarStyle";

const LLMSelection = () => {
  const llms = useLLMs();
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

export default LLMSelection;
