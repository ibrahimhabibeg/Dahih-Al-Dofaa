import React from "react";
import Courses from "./Courses/Courses";
import Chat from "./Chat/Chat";
import { IconButton, Box } from "@mui/material";
import { Menu } from "@mui/icons-material";
import useScrollbarStyle from "../UI/useScrollbarStyle";

type PropsType = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ isOpen, toggleSidebar }: PropsType) => {
  const scrollBarStyle = useScrollbarStyle();

  const [course, setCourse] = React.useState<{ title: string; id: string }>(
    null
  );

  const handleCourseClick = (course: { title: string; id: string }) => {
    setCourse(course);
  };

  const handleBackClick = () => {
    setCourse(null);
  };

  if (!isOpen) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <IconButton sx={{ mt: 3, ml: 2 }} onClick={toggleSidebar}>
          <Menu />
        </IconButton>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
          overflowY: "auto",
          ...scrollBarStyle,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            height: "7vh",
          }}
        >
          <Box>
            <IconButton sx={{ mt: 3, ml: 2 }} onClick={toggleSidebar}>
              <Menu />
            </IconButton>
          </Box>
        </Box>

        <Box height={"93vh"}>
          {course ? (
            <Chat course={course} handleBackClick={handleBackClick} />
          ) : (
            <Courses handleCourseClick={handleCourseClick} />
          )}
        </Box>
      </Box>
    );
  }
};

export default Sidebar;
