import { webContents } from "electron";

export const notifyChat = (
  courseId: string,
  chats: ChatType[]
) => {
  const windows = webContents.getAllWebContents();
  windows.forEach((webContents) => {
    webContents.send(`chat:update:${courseId}`, chats);
  });
};
