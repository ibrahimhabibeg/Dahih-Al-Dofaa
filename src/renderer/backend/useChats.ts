import { useEffect, useState } from "react";

const useChats = (courseId: string) => {
  const [chats, setChats] = useState<ChatType[]>([]);

  useEffect(() => {
    window.api.chat.getChats(courseId).then((chats) => {
      setChats(chats);
    });

    window.api.chat.subscribeToChats(courseId, (_event, chats) => {
      setChats(chats);
    });

    return () => {
      window.api.chat.unsubscribeFromChats(courseId);
    };
  }, [courseId]);

  return chats;
};

export default useChats;
