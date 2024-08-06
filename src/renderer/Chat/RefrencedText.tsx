import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useDocument from "../backend/documents/useDocument";
import Markdown from "react-markdown";

type PropsType = {
  refrencedText: RefrencedText;
};

const RefrencedText = ({ refrencedText }: PropsType) => {
  const document = useDocument(refrencedText.documentId);
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
