import { ipcMain } from "electron";
import ChatsManager from "./chatsManager";

ipcMain.handle("chat:get", async (event, courseId: string) => {
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

ipcMain.handle("chat:remove", async (event, courseId: string, chatId: string) => {
  const chatManager = ChatsManager.getInistance(courseId);
  return chatManager.removeChat(chatId);
});
