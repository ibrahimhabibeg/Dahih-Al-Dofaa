import React from "react";
import { Box, Typography } from "@mui/material";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from "../../assets/logo.svg";

const UserWelcomePage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Box marginTop={10} textAlign={"center"}>
        <img src={Logo} alt="App Logo" width={150} />
        <Typography variant="h4" marginTop={3}>
          Welcome to Dahih Al-Dofaa
        </Typography>
        <Typography variant="subtitle1"> رفيق ليلة الامتحان</Typography>
      </Box>
      <Box marginTop={12} textAlign={"center"}>
        <Typography variant="body1">
          Dahih Al-Dofaa is your local private AI-powered study companion who
          answers using your textbooks and professors' notes.
        </Typography>
      </Box>
    </Box>
  );
};

export default UserWelcomePage;
