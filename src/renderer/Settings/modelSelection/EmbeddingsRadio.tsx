import React, { useState, useEffect } from "react";
import { setSelectedEmbedding } from "../../backend/model";
import ModelRadio from "./ModelRadio";

type PropsType = {
  model: Model;
};

const EmbeddingsRadio = ({ model }: PropsType) => {
  const [isSelected, setIsSelected] = useState(model.isSelectedEmbedding);

  useEffect(() => {
    setIsSelected(model.isSelectedEmbedding);
  }, [model.isSelectedEmbedding]);

  const setSelectedModel = (modelId: string) => {
    setSelectedEmbedding(modelId);
  };

  return (
    <ModelRadio
      model={model}
      isSelected={isSelected}
      setSelectedModel={setSelectedModel}
    />
  );
};

export default EmbeddingsRadio;
