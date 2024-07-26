import { useEffect, useState } from "react";

const useEmbeddingModels = () => {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    window.api.model.getAll().then((models) => {
      setModels(
        models.filter((model) => model.description.type === "embedding")
      );
    });

    window.api.model.subscribeToAll((_event, models) => {
      setModels(
        models.filter((model) => model.description.type === "embedding")
      );
    });

    return () => {
      window.api.model.unsubscribeFromAll();
    };
  }, []);

  return models;
};

export default useEmbeddingModels;
