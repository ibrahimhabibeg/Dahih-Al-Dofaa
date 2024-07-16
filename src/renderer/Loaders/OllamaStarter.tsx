import { Typography, Box, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from "../../assets/logo.svg";

const textDescriptions = [
  "Waking up the Dahih... almost there!",
  "Shhh! Ollama's busy learning all the smart stuff.",
  "Don't worry! We're getting your study buddy ready.",
  "Hold on to your neurons, knowledge incoming!",
  "We're downloading the entire library of Alexandria... well, maybe not all of it.",
  "We may be AI, but loading can still be a pain. Thanks for your patience!",
];

const OllamaStarter = ({ children }: { children: React.JSX.Element }) => {
  const [startingOllama, setStartingOllama] = useState(true);
  const [textDescription, setTextDescription] = useState(textDescriptions[0]);

  useEffect(() => {
    
    window.api.startOllama().then(() => {
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
            Starting Ollama
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

export default OllamaStarter;
