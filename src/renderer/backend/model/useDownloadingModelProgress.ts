import { useEffect, useState } from "react";
import type { ProgressResponse } from "ollama";

const useDownloadingModelProgress = (modelId: string) => {
  const [progress, setProgress] = useState<ProgressResponse | null>(null);
  useEffect(() => {
    window.api.model.subscribeToDownloadProgress(modelId, (_event, status) => {
      setProgress(status);
    });
    return () => {
      window.api.model.unsubscribeFromDownloadProgress(modelId);
    };
  }, [modelId]);

  return progress;
};

export default useDownloadingModelProgress;
