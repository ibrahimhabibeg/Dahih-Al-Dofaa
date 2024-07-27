import React, { useState, useEffect } from "react";
import { Radio } from "@mui/material";
import { setSelectedLLM } from "../../backend/model";

type PropsType = {
  model: Model;
};

const LLMRadio = ({ model }: PropsType) => {
  const [isSelected, setIsSelected] = useState(model.isSelectedLlm);

  useEffect(() => {
    setIsSelected(model.isSelectedLlm);
  }, [model.isSelectedLlm]);

  const handleClick = () => {
    if (!isSelected) {
      setSelectedLLM(model.id);
    }
  };

  return (
    <Radio
      checked={isSelected}
      disabled={model.status != "downloaded"}
      onClick={handleClick}
    />
  );
};

export default LLMRadio;
