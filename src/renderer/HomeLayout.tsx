import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { Box } from "@mui/material";
import useScrollbarStyle from "./UI/useScrollbarStyle";
import Navbar from "./Navbar";

const HomeLayout = () => {
  const scrollBarStyle = useScrollbarStyle();

  return (
    <Box width={"100%"} display={"flex"} flexDirection={"row"}>
      <Box
        sx={{
          width: "20%",
          borderRight: 1,
          borderColor: "divider",
          height: "100vh",
          overflowY: "auto",
          ...scrollBarStyle,
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          overflowY: "auto",
          ...scrollBarStyle,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "5vh",
          }}
        >
          <Navbar />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "95vh",
            width: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default HomeLayout;
