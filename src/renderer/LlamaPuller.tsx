 import { Typography, Box, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from "../assets/logo.svg";

const textDescriptions = [
  "Downloading your study partner: Llama 3!",
  "Hold on tight! We're downloading a whole herd of knowledge",
  "Shhh! Llama 3 is on the phone... downloading all the answers to your exam woes.",
  "Downloading the A in your next exam (along with the LLM, of course).",
  "We're not just downloading, we're llamazing your phone with intelligence!",
  "Llama 3: The secret weapon of top students (except it's not really a secret anymore).",
  "Under the hood of Dahih El-Dofaa: Downloading the powerful Llama 3 LLM.",
];

const LlamaPuller = ({ children }: { children: React.JSX.Element }) => {
  const [pullingLlama, setPullingLlama] = useState(true);
  const [textDescription, setTextDescription] = useState(textDescriptions[0]);

  useEffect(() => {
    window.api.pullOllama('llama3').then(() => {
      setPullingLlama(false);
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

  if (pullingLlama) {
    return (
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Box marginTop={10} textAlign={"center"}>
          <img src={Logo} width={150} />
          <Typography variant="h4" marginTop={3}>
            Dahih Al-Dofaa
          </Typography>
          <Typography variant="subtitle1"> رفيق ليلة الامتحان</Typography>
        </Box>
        <Box marginTop={12} width={"50%"} textAlign={"center"}>
          <Typography marginBottom={1} variant="body1">
            Downloading Llama 3 (4.7GB)
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

export default LlamaPuller;
