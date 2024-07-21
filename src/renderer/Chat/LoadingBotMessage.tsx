import React from "react";
import { Box, Skeleton } from "@mui/material";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from "../../assets/logo.svg";

const LoadingBotMessage = () => {
  return (
    <Box
      sx={{
        marginTop: 3,
        marginBottom: 3,
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Box width={"10%"}>
        <img src={Logo} alt="Ollama Logo" width={24} />
      </Box>
      <Box width={"90%"}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Box>
    </Box>
  );
};

export default LoadingBotMessage;
