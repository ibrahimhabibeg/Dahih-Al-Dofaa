import { useEffect, useState } from "react";
import type { IpcRendererEvent } from "electron";

const useIsLoadingMessage = ({
  courseId,
  chatId,
}: {
  courseId: string;
  chatId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.api.message.isLoadingMessage(courseId, chatId).then((isLoading) => {
      setIsLoading(isLoading);
    });

    const loadingListener = (_event: IpcRendererEvent, isLoading: boolean) => {
      setIsLoading(isLoading);
    };

    window.api.message.subscribeToIsLoadingMessage(
      courseId,
      chatId,
      loadingListener
    );

    return () => {
      window.api.message.unsubscribeFromIsLoadingMessage(courseId, chatId);
    };
  }, [courseId, chatId]);

  return isLoading;
};

export default useIsLoadingMessage;
