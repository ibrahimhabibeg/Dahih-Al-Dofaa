import React, { useEffect, useState } from "react";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";

type CourseItemProps = {
  course: { title: string; id: string };
  handleCourseClick: (course: { title: string; id: string }) => void;
};

const CourseItem = ({ course, handleCourseClick }: CourseItemProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(course.title);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsSelected(location.pathname.includes(course.id));
  }, [location, course.id]);

  const handleEdit = () => {
    setNewTitle(course.title);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newTitle !== "") {
      window.api.course.rename(course.id, newTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleDelete = () => {
    if (isSelected) {
      navigate("/main_window");
    }
    window.api.course.delete(course.id);
  };

  return (
    <ListItemButton selected={isSelected}>
      {isEditing ? (
        <TextField
          autoFocus
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <ListItem onClick={() => handleCourseClick(course)}>
          <ListItemText primary={course.title} />
        </ListItem>
      )}
      <ListItemIcon>
        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </ListItemIcon>
    </ListItemButton>
  );
};

export default CourseItem;
