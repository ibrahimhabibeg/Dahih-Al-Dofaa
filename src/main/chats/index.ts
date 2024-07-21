import { ipcMain } from "electron";
import ChatsManager from "./chatsManager";
import ChatDB from "./chatDB";
import message from "./message";
import chatSubscription from "./chatSubscription";

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

ipcMain.handle(
  "chat:remove",
  async (event, courseId: string, chatId: string) => {
    const chatManager = ChatsManager.getInistance(courseId);
    return chatManager.removeChat(chatId);
  }
);

ipcMain.handle(
  "chat:getMessages",
  async (event, courseId: string, chatId: string) => {
    const chatDB = ChatDB.getInstance(courseId, chatId);
    return chatDB.getMessages();
  }
);

ipcMain.handle("chat:message", message);

ipcMain.handle(
  "chat:subscribe",
  async (event, courseId: string, chatId: string) => {
    chatSubscription.subscribe(chatId, event.sender);
  }
);

ipcMain.handle(
  "chat:unsubscribe",
  async (event, courseId: string, chatId: string) => {
    chatSubscription.unsubscribe(chatId, event.sender);
  }
);

ipcMain.handle(
  "chat:loadingMessage",
  async (event, courseId: string, chatId: string) => {
    return chatSubscription.isChatWithLoadingMessage(chatId);
  }
);
