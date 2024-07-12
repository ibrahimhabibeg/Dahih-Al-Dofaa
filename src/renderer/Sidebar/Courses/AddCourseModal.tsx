import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

type AddCourseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  addCourse: (courseTitle: string) => void;
};

const AddCourseModal = ({
  isOpen,
  onClose,
  addCourse,
}: AddCourseModalProps) => {
  const [courseTitle, setCourseTitle] = useState("");

  const handleAddCourse = () => {
    addCourse(courseTitle);
    setCourseTitle("");
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Course Title</Typography>
        <TextField
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          sx={{ marginBottom: 3, marginTop: 5 }}
        />
        <Button onClick={handleAddCourse} variant="outlined">
          Add Course
        </Button>
      </Box>
    </Modal>
  );
};

export default AddCourseModal;
