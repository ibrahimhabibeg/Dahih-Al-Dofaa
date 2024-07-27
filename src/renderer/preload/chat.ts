import { ipcRenderer, type IpcRendererEvent } from "electron";

const chat = {
  subscribeToChats: (
    courseId: string,
    listener: (_event: IpcRendererEvent, chats: ChatType[]) => void
  ) => {
    ipcRenderer.on(`chat:update:${courseId}`, listener);
  },
  unsubscribeFromChats: (courseId: string) => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(`chat:update:${courseId}`);
  },
  getChats: (courseId: string) => ipcRenderer.invoke("chat:getAll", courseId),
  getChat: (courseId: string, chatId: string) =>
    ipcRenderer.invoke("chat:get", courseId, chatId),
  addChat: (courseId: string, chatName?: string) =>
    ipcRenderer.invoke("chat:add", courseId, chatName),
  removeChat: (courseId: string, chatId: string) =>
    ipcRenderer.invoke("chat:remove", courseId, chatId),
  renameChat: (courseId: string, chatId: string, newTitle: string) =>
    ipcRenderer.invoke("chat:rename", courseId, chatId, newTitle),
};

export default chat;
