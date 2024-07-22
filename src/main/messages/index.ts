import { ipcMain } from "electron";
import MessageDB from "./messageDB";
import loadingMessage from "./loadingMessages";
import sendMessage from "./sendMessage";

ipcMain.handle(
  "message:get",
  async (event, courseId: string, chatId: string) => {
    const messageDB = MessageDB.getInstance(courseId, chatId);
    return messageDB.getMessages();
  }
);

ipcMain.handle(
  "message:isLoading",
  async (event, courseId: string, chatId: string) => {
    return loadingMessage.isChatWithLoadingMessage(courseId, chatId);
  }
);


ipcMain.handle(
  "message:send",
  async (event, courseId: string, chatId: string, message: string) => {
    sendMessage(courseId, chatId, message);
  }
);
