import React from "react";
import { Box, Typography } from "@mui/material";
import RefrencedText from "./RefrencedText";

type PropsType = {
  citations: Citation[];
};

const RefrencedTexts = ({ citations }: PropsType) => {
  return (
    <Box width="100%">
      {citations.length !== 0 && (
        <>
          <Typography
            variant="subtitle1"
            sx={{
              marginTop: 2,
              marginBottom: 1,
            }}
          >
            Refrences
          </Typography>
          {citations.map((refrencedText, index) => (
            <RefrencedText key={index} citation={refrencedText} />
          ))}
        </>
      )}
    </Box>
  );
};

export default RefrencedTexts;
