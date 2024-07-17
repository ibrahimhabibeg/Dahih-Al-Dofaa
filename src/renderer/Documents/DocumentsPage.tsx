import React, { useEffect, useState } from "react";
import { Typography, Box, Button, List, Divider } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import DocumentView from "./DocumentView";

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

  const handleDelete = (documentId: string) => {
    window.api.deleteDocument(courseId, documentId).then((documents) => {
      setDocuments(documents);
    });
  };

  const handleRename = (documentId: string, newTitle: string) => {
    window.api
      .renameDocument(courseId, documentId, newTitle)
      .then((documents) => {
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
      <Box marginTop={3}>
        <List>
          {documents.map((document, index) => (
            <>
              <DocumentView
                document={document}
                handleDelete={() => handleDelete(document.id)}
                handleRename={(newTitle: string) =>
                  handleRename(document.id, newTitle)
                }
                key={document.id}
              />
              {index !== documents.length - 1 && <Divider />}
            </>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default DocumentsPage;
