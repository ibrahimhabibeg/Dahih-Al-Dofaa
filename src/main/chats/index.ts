import { ipcMain } from "electron";
import ChatsManager from "./chatsManager";

ipcMain.handle("chat:getAll", async (event, courseId: string) => {
  const chatManager = ChatsManager.getInistance(courseId);
  return chatManager.getChats();
});

ipcMain.handle(
  "chat:add",
  async (event, courseId: string, chatName?: string) => {
    const chatManager = ChatsManager.getInistance(courseId);
    return chatManager.addChat(chatName);
  }
);

ipcMain.handle(
  "chat:remove",
  async (event, courseId: string, chatId: string) => {
    const chatManager = ChatsManager.getInistance(courseId);
    return chatManager.removeChat(chatId);
  }
);

ipcMain.handle("chat:get", async (event, courseId: string, chatId: string) => {
  const chatManager = ChatsManager.getInistance(courseId);
  return chatManager.getChat(chatId);
});

ipcMain.handle(
  "chat:rename",
  async (event, courseId: string, chatId: string, newTitle: string) => {
    const chatManager = ChatsManager.getInistance(courseId);
    return chatManager.renameChat(chatId, newTitle);
  }
);

export const recordNewChatActivity = (courseId: string, chatId: string) => {
  const chatManager = ChatsManager.getInistance(courseId);
  chatManager.recordNewActivity(chatId);
};
