import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { Box } from "@mui/material";

const HomeLayout = () => {
  return (
    <Box width={"100%"} display={"flex"} flexDirection={"row"}>
      <Box
        sx={{
          width: "20%",
          borderRight: 1,
          borderColor: "divider",
          height: "100vh",
        }}
      >
        <Sidebar />
      </Box>
      <Box width={"80%"}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomeLayout;
