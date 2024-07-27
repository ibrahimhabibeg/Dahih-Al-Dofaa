import { useEffect, useState } from "react";

const useIsOllamaReady = () => {
  const [isOllamaReady, setIsOllamaReady] = useState(false);

  useEffect(() => {
    window.api.ollama.isReady().then((ready) => {
      setIsOllamaReady(ready);
    });

    window.api.ollama.subscribeToReady(() => {
      setIsOllamaReady(true);
    });

    return () => {
      window.api.ollama.unsubscribeFromReady();
    };
  }, []);

  return isOllamaReady;
};

export default useIsOllamaReady;
