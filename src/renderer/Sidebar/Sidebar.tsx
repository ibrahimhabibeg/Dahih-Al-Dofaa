import React from "react";
import Courses from "./Courses/Courses";
import Chat from "./Chat/Chat";

const Sidebar = () => {
  const [course, setCourse] = React.useState<{ title: string; id: string }>(
    null
  );

  const handleCourseClick = (course: { title: string; id: string }) => {
    setCourse(course);
  };

  const handleBackClick = () => {
    setCourse(null);
  };

  if (course) {
    return <Chat course={course} handleBackClick={handleBackClick} />;
  } else {
    return <Courses handleCourseClick={handleCourseClick} />;
  }
};

export default Sidebar;
