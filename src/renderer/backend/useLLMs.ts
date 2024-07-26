import { useEffect, useState } from "react";

const useLLMs = () => {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    window.api.model.getAll().then((models) => {
      setModels(models.filter((model) => model.description.type === "llm"));
    });

    window.api.model.subscribeToAll((_event, models) => {
      setModels(models.filter((model) => model.description.type === "llm"));
    });

    return () => {
      window.api.model.unsubscribeFromAll();
    };
  }, []);

  return models;
};

export default useLLMs;
