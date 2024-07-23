import React, { useEffect, useState } from "react";
import { Typography, Box, List, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import DocumentView from "./DocumentView";
import useDocuments from "./useDocuments";
import ImportDocumentButton from "./ImportDocumentButton";

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

  const documents = useDocuments(courseId);

  return (
    <Box display={"flex"} flexDirection={"column"} width={"90%"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginTop={4}
      >
        <Typography variant={"h5"}>{course.title} Documents</Typography>
        <ImportDocumentButton courseId={courseId} />
      </Box>
      <Box marginTop={3}>
        <List>
          {documents.map((document, index) => (
            <Box key={index}>
              <DocumentView document={document} courseId={courseId} />
              {index !== documents.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default DocumentsPage;
