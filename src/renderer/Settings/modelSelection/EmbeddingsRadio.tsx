import React from "react";
import { Radio } from "@mui/material";

type PropsType = {
  model: Model;
};

const EmbeddingsRadio = ({ model }: PropsType) => {
  return (
    <Radio
      value={model.isSelectedEmbedding}
      disabled={model.status != "downloaded"}
    />
  );
};

export default EmbeddingsRadio;
