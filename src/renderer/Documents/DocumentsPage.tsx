import React, { useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { useParams } from "react-router-dom";

const DocumentsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = React.useState<{ id: string; title: string }>({
    id: courseId,
    title: "",
  });

  useEffect(() => {
    window.api.getCourse(courseId).then((course) => {
      setCourse(course);
    });
  });

  return (
    <Box display={"flex"} flexDirection={"column"} width={"90%"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginTop={4}
      >
        <Typography variant={"h5"}>{course.title} Documents</Typography>
        <Button startIcon={<Upload />} variant={"outlined"}>
          Import
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentsPage;
