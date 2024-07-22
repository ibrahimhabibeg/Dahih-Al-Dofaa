import { notifyLoadingMessage } from "./messageNotifier";

class LoadingMessage {
  private static inistance: LoadingMessage = null;

  private chatsWithLoadingMessage: Set<string>;

  public static getInistance(): LoadingMessage {
    if (this.inistance === null) this.inistance = new LoadingMessage();
    return this.inistance;
  }

  private constructor() {
    this.chatsWithLoadingMessage = new Set<string>();
  }

  public addLoadingMessageChat(courseId: string, chatId: string) {
    this.chatsWithLoadingMessage.add(this.createKey(courseId, chatId));
    notifyLoadingMessage(courseId, chatId, true);
  }

  public removeLoadingMessageChat(courseId: string, chatId: string) {
    this.chatsWithLoadingMessage.delete(this.createKey(courseId, chatId));
    notifyLoadingMessage(courseId, chatId, false);
  }

  public isChatWithLoadingMessage(courseId: string, chatId: string): boolean {
    return this.chatsWithLoadingMessage.has(this.createKey(courseId, chatId));
  }

  private createKey(courseId: string, chatId: string): string {
    return courseId + " " + chatId;
  }
}

const loadingMessage = LoadingMessage.getInistance();

export default loadingMessage;
