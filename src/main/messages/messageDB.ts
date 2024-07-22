import path from "path";
import { app } from "electron";
import fs from "fs";
import { notifyCompleteMessage } from "./messageNotifier";

class MessageDB {
  private static inistances: Map<string, MessageDB> = new Map();
  private messages: Message[];
  private filePath: string;
  private courseId: string;
  private chatId: string;

  public static getInstance(courseId: string, chatId: string): MessageDB {
    if (this.inistances.has(chatId)) return this.inistances.get(chatId);
    const folderPath = path.join(
      app.getPath("userData"),
      "courses",
      courseId,
      "chats"
    );
    fs.mkdirSync(folderPath, { recursive: true });
    const filePath = path.join(folderPath, chatId + ".json");
    if (fs.existsSync(filePath)) {
      const { messages }: { messages: Message[] } = JSON.parse(
        fs.readFileSync(filePath, "utf-8")
      );
      this.inistances.set(
        chatId,
        new MessageDB(courseId, chatId, messages, filePath)
      );
    } else {
      const messages: Message[] = [];
      fs.writeFileSync(filePath, JSON.stringify({ messages }));
      this.inistances.set(
        chatId,
        new MessageDB(courseId, chatId, messages, filePath)
      );
    }
    return this.inistances.get(chatId);
  }

  private constructor(
    courseId: string,
    chatId: string,
    messages: Message[],
    filePath: string
  ) {
    this.courseId = courseId;
    this.chatId = chatId;
    this.messages = messages;
    this.filePath = filePath;
  }

  public addMessage(content: string, sender: "human" | "bot"): Message {
    const message: Message = { content, sender };
    this.messages.push(message);
    this.save();
    notifyCompleteMessage(this.courseId, this.chatId, message);
    return message;
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  public deleteDB() {
    fs.unlinkSync(this.filePath);
  }

  private save() {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify({ messages: this.messages })
    );
  }
}

export default MessageDB;
