import React from "react";
import { useDownloadingModelProgress } from "../../backend/model";
import { Box, Typography } from "@mui/material";
import LinearProgressWithLabel from "../../UI/LinearProgressWithLabel";

type PropsType = {
  modelId: string;
};

const ModelDownloadProgress = ({ modelId }: PropsType) => {
  const progress = useDownloadingModelProgress(modelId);

  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: 2,
      }}
    >
      {progress?.status && (
        <Typography variant="body2">{capitalize(progress.status)}</Typography>
      )}
      {progress?.total && progress?.completed && (
        <LinearProgressWithLabel
          sx={{ marginTop: 1 }}
          variant="determinate"
          value={Math.round(100 * (progress.completed / progress.total))}
        />
      )}
    </Box>
  );
};

export default ModelDownloadProgress;
