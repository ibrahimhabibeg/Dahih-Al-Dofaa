import React from "react";
import { Typography } from "@mui/material";
import useIsOllamaReady from "../backend/useIsOllamaReady";

const OllamaStatus = () => {
  const isReady = useIsOllamaReady();

  return (
    <Typography>
      {isReady ? "Ollama is ready" : "Ollama is not ready"}
    </Typography>
  );
};

export default OllamaStatus;
