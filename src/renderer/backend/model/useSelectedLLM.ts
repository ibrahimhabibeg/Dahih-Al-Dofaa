import { useEffect, useState } from "react";

const useSelectedLLM = () => {
  const [selectedLLM, setSelectedLLM] = useState<string | null>(null);

  useEffect(() => {
    window.api.model.getSelectedLLM().then((llm: string) => {
      setSelectedLLM(llm);
    });

    window.api.model.subscribeToSelectedLLM((_event, llm) =>
      setSelectedLLM(llm)
    );

    return () => {
      window.api.model.unsubscribeFromSelectedLLM();
    };
  }, []);

  return selectedLLM;
};

export default useSelectedLLM;
