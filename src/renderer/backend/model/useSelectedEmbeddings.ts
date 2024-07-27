import { useEffect, useState } from "react";

const useSelectEmbeddings = () => {
  const [selectedEmbeddings, setSelectedEmbeddings] = useState<string | null>(
    null
  );

  useEffect(() => {
    window.api.model.getSelectedEmbedding().then((model: string) => {
      setSelectedEmbeddings(model);
    });

    window.api.model.subscribeToSelectedEmbedding((_event, model) =>
      setSelectedEmbeddings(model)
    );

    return () => {
      window.api.model.unsubscribeFromSelectedEmbedding();
    };
  }, []);

  return selectedEmbeddings;
};

export default useSelectEmbeddings;
