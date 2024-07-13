import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { useParams } from "react-router-dom";

const DocumentsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<{ id: string; title: string }>({
    id: courseId,
    title: "",
  });

  useEffect(() => {
    window.api.getCourse(courseId).then((course) => {
      setCourse(course);
    });
  }, [courseId]);

  const [documents, setDocuments] = useState<Doc[]>([]);

  useEffect(() => {
    window.api.getDocuments(courseId).then((documents) => {
      setDocuments(documents);
    });
  }, [courseId]);

  const handleImport = () => {
    window.api.addDocument(courseId).then((documents) => {
      setDocuments(documents);
    });
  };

  return (
    <Box display={"flex"} flexDirection={"column"} width={"90%"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginTop={4}
      >
        <Typography variant={"h5"}>{course.title} Documents</Typography>
        <Button
          startIcon={<Upload />}
          variant={"outlined"}
          onClick={handleImport}
        >
          Import
        </Button>
      </Box>
      <Box>
        {documents.map((document) => (
          <Box key={document.id} marginTop={2}>
            <Typography>{document.title}</Typography>
            <Typography>{document.docType}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DocumentsPage;
