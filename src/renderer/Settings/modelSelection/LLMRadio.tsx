import React from "react";
import { Radio } from "@mui/material";

type PropsType = {
  model: Model;
};

const LLMRadio = ({ model }: PropsType) => {
  return (
    <Radio
      value={model.isSelectedLlm}
      disabled={model.status != "downloaded"}
    />
  );
};

export default LLMRadio;
