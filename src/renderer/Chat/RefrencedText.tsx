import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useDocument from "../backend/useDocument";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";

type PropsType = {
  refrencedText: RefrencedText;
};

const RefrencedText = ({ refrencedText }: PropsType) => {
  const { courseId } = useParams();
  const document = useDocument({
    courseId,
    documentId: refrencedText.documentId,
  });
  if (!document) return null;
  else
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Markdown>{document.title}</Markdown>
        </AccordionSummary>
        <AccordionDetails>{refrencedText.text}</AccordionDetails>
      </Accordion>
    );
};

export default RefrencedText;
