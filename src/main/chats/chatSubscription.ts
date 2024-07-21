class ChatSubscription {
  private static inistance: ChatSubscription = null;
  private chatsWithLoadingMessage: Set<string>;
  private chatListeners: Map<string, Set<Electron.WebContents>>;

  private constructor() {
    this.chatsWithLoadingMessage = new Set<string>();
    this.chatListeners = new Map<string, Set<Electron.WebContents>>();
  }

  public static getInistance(): ChatSubscription {
    if (this.inistance === null) {
      this.inistance = new ChatSubscription();
    }
    return this.inistance;
  }

  public subscribe(chatId: string, webContents: Electron.WebContents) {
    if (!this.chatListeners.has(chatId)) {
      this.chatListeners.set(chatId, new Set<Electron.WebContents>());
    }
    this.chatListeners.get(chatId).add(webContents);
  }

  public unsubscribe(chatId: string, webContents: Electron.WebContents) {
    if (this.chatListeners.has(chatId)) {
      this.chatListeners.get(chatId).delete(webContents);
    }
  }

  public addLoadingMessageChat(chatId: string) {
    this.chatsWithLoadingMessage.add(chatId);
  }

  public removeLoadingMessageChat(chatId: string) {
    this.chatsWithLoadingMessage.delete(chatId);
  }

  public isChatWithLoadingMessage(chatId: string): boolean {
    return this.chatsWithLoadingMessage.has(chatId);
  }

  public notifyChatMessage(chatId: string, message: Message) {
    if (this.chatListeners.has(chatId)) {
      this.chatListeners
        .get(chatId)
        .forEach((webContents: Electron.WebContents) => {
          webContents.send("chat:message:complete", chatId, message);
        });
    }
  }
}

const chatSubscription = ChatSubscription.getInistance();
export default chatSubscription;
