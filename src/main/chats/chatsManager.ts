import path from "path";
import { app } from "electron";
import fs from "fs";
import { v4 as uuid4 } from "uuid";
import ChatDB from "./chatDB";

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
      this.instances.set(courseId, new ChatsManager(chats, filePath, courseId));
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
    console.log("Adding chat", id, title);
    const chat: ChatType = { id, title };
    this.chats.push(chat);
    this.save();
    return chat;
  }

  public removeChat(chatId: string): ChatType[] {
    this.chats = this.chats.filter((chat) => chat.id !== chatId);
    this.save();
    ChatDB.getInstance(this.courseId, chatId).deleteDB();
    return this.chats;
  }

  private save() {
    fs.writeFileSync(this.filepath, JSON.stringify({ chats: this.chats }));
  }
}

export default ChatsManager;
