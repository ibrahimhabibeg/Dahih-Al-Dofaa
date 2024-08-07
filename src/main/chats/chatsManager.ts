import path from "path";
import { app } from "electron";
import fs from "fs";
import { v4 as uuid4 } from "uuid";
import MessageDB from "../messages/messageDB";
import { notifyChat } from "./chatNotifier";

class ChatsManager {
  private static instances: Map<string, ChatsManager> = new Map();
  private filepath: string;
  private chats: ChatType[];
  private courseId: string;

  public static getInistance(courseId: string): ChatsManager {
    if (this.instances.has(courseId)) return this.instances.get(courseId);

    const folderPath = path.join(app.getPath("userData"), "courses", courseId);
    fs.mkdirSync(folderPath, { recursive: true });

    const filePath = path.join(folderPath, "chats.json");

    if (fs.existsSync(filePath)) {
      const { chats }: { chats: ChatType[] } = JSON.parse(
        fs.readFileSync(filePath, "utf-8")
      );
      const chatsWithParsedDate = chats.map((chat) => ({
        ...chat,
        latestActivity: new Date(chat.latestActivity),
      }));
      this.instances.set(
        courseId,
        new ChatsManager(chatsWithParsedDate, filePath, courseId)
      );
    } else {
      const chats: ChatType[] = [];
      fs.writeFileSync(filePath, JSON.stringify({ chats }));
      this.instances.set(courseId, new ChatsManager(chats, filePath, courseId));
    }

    return this.instances.get(courseId);
  }

  private constructor(chats: ChatType[], filepath: string, courseId: string) {
    this.chats = chats;
    this.filepath = filepath;
    this.courseId = courseId;
  }

  public getChats(): ChatType[] {
    return this.chats;
  }

  public addChat(title = "Unnamed Chat"): ChatType {
    const id = uuid4();
    const chat: ChatType = { id, title, latestActivity: new Date() };
    this.chats.push(chat);
    this.sortChats();
    this.save();
    notifyChat(this.courseId, this.chats);
    return chat;
  }

  public removeChat(chatId: string): ChatType[] {
    this.chats = this.chats.filter((chat) => chat.id !== chatId);
    this.save();
    MessageDB.getInstance(this.courseId, chatId).deleteDB();
    notifyChat(this.courseId, this.chats);
    return this.chats;
  }

  public getChat(chatId: string): ChatType {
    return this.chats.find((chat) => chat.id === chatId);
  }

  public renameChat(chatId: string, newTitle: string) {
    this.chats = this.chats.map((chat) => {
      if (chat.id === chatId) {
        chat.title = newTitle;
      }
      return chat;
    });
    this.save();
    notifyChat(this.courseId, this.chats);
  }

  public recordNewActivity(chatId: string) {
    this.chats = this.chats.map((chat) => {
      if (chat.id === chatId) {
        chat.latestActivity = new Date();
      }
      return chat;
    });
    this.sortChats();
    this.save();
    notifyChat(this.courseId, this.chats);
  }

  private sortChats() {
    this.chats = this.chats.sort(
      (a, b) => b.latestActivity.getTime() - a.latestActivity.getTime()
    );
  }

  private save() {
    fs.writeFileSync(this.filepath, JSON.stringify({ chats: this.chats }));
  }
}

export default ChatsManager;
