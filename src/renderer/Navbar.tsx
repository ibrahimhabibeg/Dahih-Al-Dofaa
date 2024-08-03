import React from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  if (location.pathname === "/main_window") {
    return <></>;
  } else {
    return (
      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          mt: 1,
          mb: 1,
          display: "flex",
        }}
      >
        <Box width={"80%"}>
          <IconButton onClick={handleBack}>
            <ArrowBack fontSize="medium" />
          </IconButton>
        </Box>
      </Box>
    );
  }
};

export default Navbar;
