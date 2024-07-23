import React from "react";
import { Box, Typography } from "@mui/material";
import { SentimentVeryDissatisfiedRounded } from "@mui/icons-material";

const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Box>
        <SentimentVeryDissatisfiedRounded
          sx={{ fontSize: 150, marginTop: 15 }}
        />
        <Typography variant="h4" marginTop={10}>
          Oops..
        </Typography>
        <Typography variant="h6">
          Dahih is experiencing a knowledge overload
        </Typography>
        <Typography variant="h6">Please restart the app</Typography>
      </Box>
    </Box>
  );
};

export default ErrorPage;
