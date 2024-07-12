import { Typography, Box } from "@mui/material";
import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from "../assets/logo.svg";

const GetStartedPage = () => {

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Box marginTop={10} textAlign={"center"}>
        <img src={Logo} alt="Ollama Logo" width={150} />
        <Typography variant="h4" marginTop={3}>
          Dahih Al-Dofaa
        </Typography>
        <Typography variant="subtitle1"> رفيق ليلة الامتحان</Typography>
      </Box>
      <Box marginTop={12} textAlign={"center"}>
        <Typography variant="body1">
          Create a new course or select an existing one to get started!
        </Typography>
      </Box>
    </Box>
  );
};

export default GetStartedPage;
