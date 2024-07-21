import path from "path";
import { app } from "electron";
import fs from "fs";

class ChatDB {
  private static inistances: Map<string, ChatDB> = new Map();
  private messages: Message[];
  private filePath: string;

  public static getInstance(courseId: string, chatId: string): ChatDB {
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
      this.inistances.set(chatId, new ChatDB(messages, filePath));
    } else {
      const messages: Message[] = [];
      fs.writeFileSync(filePath, JSON.stringify({ messages }));
      this.inistances.set(chatId, new ChatDB(messages, filePath));
    }
    return this.inistances.get(chatId);
  }

  private constructor(messages: Message[], filePath: string) {
    this.messages = messages;
    this.filePath = filePath;
  }

  public addMessage(content: string, sender: "human" | "bot"): Message {
    const message: Message = { content, sender };
    this.messages.push(message);
    this.save();
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

export default ChatDB;
