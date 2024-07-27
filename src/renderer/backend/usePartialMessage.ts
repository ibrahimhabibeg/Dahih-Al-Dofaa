import { useEffect, useState } from "react";
import type { IpcRendererEvent } from "electron";

type PropsType = {
  courseId: string;
  chatId: string;
};

const usePartialMessage = ({ courseId, chatId }: PropsType) => {
  const [partialMessage, setPartialMessage] = useState<string>("");

  useEffect(() => {
    const listener = (_event: IpcRendererEvent, message: string) => {
      setPartialMessage(message);
    };

    window.api.message.subscribeToPartialMessage(courseId, chatId, listener);

    return () => {
      window.api.message.unsubscribeFromPartialMessage(courseId, chatId);
    };
  }, [courseId, chatId]);

  return partialMessage;
};

export default usePartialMessage;
