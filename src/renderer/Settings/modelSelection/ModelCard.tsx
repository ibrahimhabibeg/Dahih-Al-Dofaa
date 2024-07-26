import React from "react";
import { Box, Typography } from "@mui/material";
import ModelDownloadIcon from "./ModelDownloadIcon";
import { Memory, Storage } from "@mui/icons-material";
import LLMRadio from "./LLMRadio";
import EmbeddingsRadio from "./EmbeddingsRadio";
import humanizeSize from "../../utils/humanizeSize";

type PropsType = {
  model: Model;
  type: "llm" | "embeddings";
};

const ModelCard = ({ model, type }: PropsType) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        marginTop: 3,
        marginBottom: 3,
      }}
    >
      <Box sx={{ width: "10%" }}>
        {type === "llm" ? (
          <LLMRadio model={model} />
        ) : (
          <EmbeddingsRadio model={model} />
        )}
      </Box>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">{model.description.name}</Typography>
        <Typography variant="body2">{model.description.description}</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            marginTop: 2,
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Storage sx={{ marginRight: 2 }} />
            <Typography variant="body2">
              {humanizeSize(model.description.size, 1, "MB")} download size
            </Typography>
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Memory sx={{ marginRight: 2 }} />
            <Typography variant="body2">
              {humanizeSize(model.description.minimumRAM, 0, "GB")} RAM required
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "10%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <ModelDownloadIcon model={model} />
      </Box>
    </Box>
  );
};

export default ModelCard;
