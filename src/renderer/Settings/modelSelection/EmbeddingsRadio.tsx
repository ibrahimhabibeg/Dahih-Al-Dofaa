import React, { useState, useEffect } from "react";
import { Radio } from "@mui/material";
import { setSelectedEmbedding } from "../../backend/model";

type PropsType = {
  model: Model;
};

const EmbeddingsRadio = ({ model }: PropsType) => {
  const [isSelected, setIsSelected] = useState(model.isSelectedEmbedding);

  useEffect(() => {
    setIsSelected(model.isSelectedEmbedding);
  }, [model.isSelectedEmbedding]);

  const handleClick = () => {
    if (!isSelected) {
      setSelectedEmbedding(model.id);
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

export default EmbeddingsRadio;
