import React from "react";
import { Box } from "@mui/material";
import Markdown from "react-markdown";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from "../../assets/logo.svg";

const PartialMessage = ({ message }: { message: string }) => {
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
        <Markdown>{message}</Markdown>
      </Box>
    </Box>
  );
};

export default PartialMessage;
