import React from "react";
import { Box, Link as MuiLink, Typography } from "@mui/material";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from "../../assets/logo.svg";
import useSelectEmbeddings from "../backend/model/useSelectedEmbeddings";
import { useNavigate } from "react-router-dom";

type PropsType = {
  children: React.ReactNode;
};

const RequiresEmbeddings = ({ children }: PropsType) => {
  const selectedEmbeddings = useSelectEmbeddings();
  const navigate = useNavigate();

  const handleLinkClick = () => {
    navigate("/settings/embeddings");
  };

  if (selectedEmbeddings) {
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
          Embeddings Model Required
        </Typography>
        <Typography variant="body1" marginTop={2}>
          Please download and select an embeddings model from{" "}
          <span onClick={handleLinkClick}>
            <MuiLink>Embeddings Selection Page</MuiLink>
          </span>{" "}
          to continue.
        </Typography>
      </Box>
    );
  }
};

const requiresEmbeddings = (Component: React.ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => (
    <RequiresEmbeddings>
      <Component {...props} />
    </RequiresEmbeddings>
  );
};

export default requiresEmbeddings;
