import React from "react";
import { Box, Link as MuiLink, Typography } from "@mui/material";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import useSelectedLLM from "../backend/model/useSelectedLLM";

type PropsType = {
  children: React.ReactNode;
};

const RequiresLLM = ({ children }: PropsType) => {
  const selectedLLM = useSelectedLLM();
  const navigate = useNavigate();

  const handleLinkClick = () => {
    navigate("/settings/llm");
  };

  if (selectedLLM) {
    return <>{children}</>;
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          width: "80%",
        }}
      >
        <img src={Logo} alt="App Logo" width={150} style={{ marginTop: 50 }} />
        <Typography variant="h5" marginTop={5}>
          LLM Required
        </Typography>
        <Typography variant="body1" marginTop={2}>
          Please download and select an llm model from{" "}
          <span onClick={handleLinkClick}>
            <MuiLink>LLM Selection Page</MuiLink>
          </span>{" "}
          to continue.
        </Typography>
      </Box>
    );
  }
};

const requiresLLM = (Component: React.ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => (
    <RequiresLLM>
      <Component {...props} />
    </RequiresLLM>
  );
};

export default requiresLLM;
