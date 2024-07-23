import { Box, List, Typography } from "@mui/material";
import React from "react";
import ChangeTheme from "./ChangeTheme";

const Settings = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "80%", marginTop: 5 }}>
        <Typography variant="h4">Settings</Typography>
        <List>
          <ChangeTheme />
        </List>
      </Box>
    </Box>
  );
};

export default Settings;
