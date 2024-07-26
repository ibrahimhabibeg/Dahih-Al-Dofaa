import { useEffect, useState } from "react";
import type { IpcRendererEvent } from "electron";

const useMessage = ({
  courseId,
  chatId,
}: {
  courseId: string;
  chatId: string;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    window.api.message.getMessages(courseId, chatId).then((messages) => {
      setMessages(messages);
    });

    const completeMessageListener = (
      _event: IpcRendererEvent,
      message: Message
    ) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    window.api.message.subscribeToCompleteMessage(
      courseId,
      chatId,
      completeMessageListener
    );

    return () => {
      window.api.message.unsubscribeFromCompleteMessage(courseId, chatId);
    };
  }, [courseId, chatId]);

  return messages;
};

export default useMessage;
