import { addChaDb, removeChatDb, getChatsDb } from "./chatDB";

export const addChat = async (courseId: string, chatName: string = undefined) =>
  addChaDb(courseId, chatName);

export const removeChat = async (chatId: string) => removeChatDb(chatId);

export const getChats = async (courseId: string) => getChatsDb(courseId);
