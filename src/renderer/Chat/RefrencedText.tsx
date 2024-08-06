import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type PropsType = {
  citation: Citation;
};

const RefrencedText = ({ citation }: PropsType) => {
  if (!document) return null;
  else
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">{citation.documentTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails>{citation.text}</AccordionDetails>
      </Accordion>
    );
};

export default RefrencedText;
