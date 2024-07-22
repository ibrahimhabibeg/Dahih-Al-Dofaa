import { webContents } from "electron";

export const notifyCompleteMessage = (
  courseId: string,
  chatId: string,
  message: Message
) => {
  const windows = webContents.getAllWebContents();
  windows.forEach((webContents) => {
    webContents.send(`message:update:complete:${courseId}:${chatId}`, message);
  });
};

export const notifyLoadingMessage = (
  courseId: string,
  chatId: string,
  isLoading: boolean
) => {
  const windows = webContents.getAllWebContents();
  windows.forEach((webContents) => {
    webContents.send(
      `message:update:loading:${courseId}:${chatId}`,
      isLoading
    );
  });
}

export const notifyPartialMessage = (courseId: string, chatId: string, message: string) => {
  const windows = webContents.getAllWebContents();
  windows.forEach((webContents) => {
    webContents.send(`message:update:partial:${courseId}:${chatId}`, message);
  });
}