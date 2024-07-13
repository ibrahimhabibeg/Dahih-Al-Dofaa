import { app } from "electron";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export type chat = {
  id: string;
  name: string;
  courseId: string;
};

class ChatDB {
  static instance: ChatDB = null;

  chats: chat[] = [];
  filePath: string;

  constructor(chats: chat[], filePath: string) {
    this.chats = chats;
    this.filePath = filePath;
  }

  static async getInstance() {
    if (this.instance === null) {
      const filePath = path.join(app.getPath("userData"), "chat.json");
      if (fs.existsSync(filePath)) {
        const file = fs.readFileSync(filePath, "utf-8");
        const { chats } = JSON.parse(file);
        this.instance = new this(chats, filePath);
      } else {
        fs.writeFileSync(filePath, JSON.stringify({ chats: [] }));
        this.instance = new this([], filePath);
      }
    }
    return this.instance;
  }

  addChat(courseId:string, chatName = "Unnamed Chat") {
    const chat: chat = {
      id: uuidv4(),
      name: chatName,
      courseId: courseId
    };
    this.chats.push(chat);
    this.save();
    return this.chats;
  }

  removeChat(chatId: string) {
    this.chats = this.chats.filter((chat) => chat.id !== chatId);
    this.save();
    return this.chats;
  }

  changeChatName(chatId: string, chatName: string) {
    this.chats.map((chat) => {
      if (chat.id === chatId) {
        chat.name = chatName;
      }
      return chat;
    });
    this.save();
    return this.chats;
  }

  getChats(courseId:string) {
    return this.chats.filter((chat) => chat.courseId === courseId);
  }

  save() {
    fs.writeFileSync(this.filePath, JSON.stringify({ chats: this.chats }));
  }
}

export const addChaDb = async (courseId: string, chatName: string = undefined) => {
  const chatDB = await ChatDB.getInstance();
  return chatDB.addChat(courseId, chatName);
};

export const removeChatDb = async (chatId: string) => {
  const chatDB = await ChatDB.getInstance();
  return chatDB.removeChat(chatId);
};

export const getChatsDb = async (courseId: string) => {
  const chatDB = await ChatDB.getInstance();
  return chatDB.getChats(courseId);
}
