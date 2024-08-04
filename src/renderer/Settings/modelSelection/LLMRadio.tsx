import React, { useState, useEffect } from "react";
import { setSelectedLLM } from "../../backend/model";
import ModelRadio from "./ModelRadio";

type PropsType = {
  model: Model;
};

const LLMRadio = ({ model }: PropsType) => {
  const [isSelected, setIsSelected] = useState(model.isSelectedLlm);

  useEffect(() => {
    setIsSelected(model.isSelectedLlm);
  }, [model.isSelectedLlm]);

  const setSelectedModel = (modelId: string) => {
    setSelectedLLM(modelId);
  };

  return (
    <ModelRadio
      model={model}
      isSelected={isSelected}
      setSelectedModel={setSelectedModel}
    />
  );
};

export default LLMRadio;
