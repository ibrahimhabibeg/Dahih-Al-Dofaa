import { Typography, Box, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from "../../assets/logo.svg";

const textDescriptions = [
  "First-time setup! This might take a moment as we prepare your personalized study companion.",
  "Building your study arsenal: Downloading essential models (it takes a while, but worth it!)",
  "Hold tight! We're brewing a potent knowledge potion (downloading models takes time).",
  "Shhh! Supercharging Dahih El-Dofaa... patience is key (and rewarded with awesome study tools!).",
  "Unleashing the power of AI for your studies... download in progress!",
  "Get ready for an intelligence boost! Downloading essential models for Dahih El-Dofaa...",
];

const OllamaSetup = ({ children }: { children: React.JSX.Element }) => {
  const [startingOllama, setStartingOllama] = useState(true);
  const [textDescription, setTextDescription] = useState(textDescriptions[0]);

  useEffect(() => {
    window.api.setupOllama().then(() => {
      setStartingOllama(false);
    });

    const timer = setInterval(() => {
      setTextDescription(
        textDescriptions[Math.floor(Math.random() * textDescriptions.length)]
      );
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (startingOllama) {
    return (
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Box marginTop={10} textAlign={"center"}>
          <img src={Logo} alt="Ollama Logo" width={150} />
          <Typography variant="h4" marginTop={3}>
            Dahih Al-Dofaa
          </Typography>
          <Typography variant="subtitle1"> رفيق ليلة الامتحان</Typography>
        </Box>
        <Box marginTop={12} width={"50%"} textAlign={"center"}>
          <Typography marginBottom={1} variant="body1">
            Setting up Ollama
          </Typography>
          <Typography marginBottom={1} variant="body1">
            Downloading required files (5 GB)
          </Typography>
          <LinearProgress />
          <Typography variant="caption" marginTop={1}>
            {textDescription}
          </Typography>
        </Box>
      </Box>
    );
  } else {
    return children;
  }
};

export default OllamaSetup;
