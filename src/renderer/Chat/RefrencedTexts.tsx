import React from "react";
import { Box, Typography } from "@mui/material";
import RefrencedText from "./RefrencedText";

type PropsType = {
  refrencedTexts: RefrencedText[];
};

const RefrencedTexts = ({ refrencedTexts }: PropsType) => {
  return (
    <Box width="100%">
      {refrencedTexts.length !== 0 && (
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
          {refrencedTexts.map((refrencedText, index) => (
            <RefrencedText key={index} refrencedText={refrencedText} />
          ))}
        </>
      )}
    </Box>
  );
};

export default RefrencedTexts;
