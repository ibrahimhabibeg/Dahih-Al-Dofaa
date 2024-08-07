import React from "react";
import { Typography, Box, List, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import DocumentView from "./DocumentView";
import useCourseDocuments from "../backend/documents/useCourseDocuments";
import ImportDocumentButton from "./ImportDocumentButton";
import useCourse from "../backend/useCourse";
import requiresEmbeddings from "../Requirers/RequiresEmbeddings";

const DocumentsPage = () => {
  const { courseId } = useParams();
  const course = useCourse(courseId);

  const documents = useCourseDocuments(courseId);

  return (
    <Box display={"flex"} flexDirection={"column"} width={"80%"}>
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

export default requiresEmbeddings(DocumentsPage);
