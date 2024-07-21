import { contextBridge, ipcRenderer } from "electron";
import { type course } from "../main/courses/courses";

const api: Window["api"] = {
  startOllama: () => ipcRenderer.invoke("ollama:start"),
  setupOllama: () => ipcRenderer.invoke("ollama:setup"),
  addCourse: (courseTitle: string) =>
    ipcRenderer.invoke("course:add", courseTitle),
  removeCourse: (courseId: string) =>
    ipcRenderer.invoke("course:remove", courseId),
  getCourse: (courseId: string) => ipcRenderer.invoke("course:get", courseId),
  getCourses: () => ipcRenderer.invoke("course:getAll"),
  updateCourse: (course: course) => ipcRenderer.invoke("course:update", course),
  getChats: (courseId: string) => ipcRenderer.invoke("chat:getAll", courseId),
  getChat: (courseId: string, chatId: string) =>
    ipcRenderer.invoke("chat:get", courseId, chatId),
  addChat: (courseId: string, chatName?: string) =>
    ipcRenderer.invoke("chat:add", courseId, chatName),
  removeChat: (courseId: string, chatId: string) =>
    ipcRenderer.invoke("chat:remove", courseId, chatId),
  addDocument: (courseId: string) =>
    ipcRenderer.invoke("document:add", courseId),
  deleteDocument: (courseId: string, documentId: string) =>
    ipcRenderer.invoke("document:delete", courseId, documentId),
  renameDocument: (courseId: string, documentId: string, newTitle: string) =>
    ipcRenderer.invoke("document:rename", courseId, documentId, newTitle),
  getDocuments: (courseId: string) =>
    ipcRenderer.invoke("document:getAll", courseId),
  getDocument: (courseId: string, documentId: string) =>
    ipcRenderer.invoke("document:get", courseId, documentId),
  listenToDocument: (documentId: string) =>
    ipcRenderer.invoke("document:listen", documentId),
  stopListeningToDocument: (documentId: string) =>
    ipcRenderer.invoke("document:stopListening", documentId),
  onDocumentLoading: (listener: (documentId: string) => void) =>
    ipcRenderer.on("document:loading", (_event, documentId) =>
      listener(documentId)
    ),
  onDocumentLoaded: (listener: (documentId: string) => void) =>
    ipcRenderer.on("document:loaded", (_event, documentId) =>
      listener(documentId)
    ),
  chat: (courseId: string, chatId: string, message: string) =>
    ipcRenderer.invoke("chat:message", courseId, chatId, message),
  getMessages: (courseId: string, chatId: string) =>
    ipcRenderer.invoke("chat:getMessages", courseId, chatId),
  chatSubscribe: (courseId: string, chatId: string) =>
    ipcRenderer.invoke("chat:subscribe", courseId, chatId),
  chatUnsubscribe: (courseId: string, chatId: string) =>
    ipcRenderer.invoke("chat:unsubscribe", courseId, chatId),
  chatIsLoadingMessage: (courseId: string, chatId: string) =>
    ipcRenderer.invoke("chat:loadingMessage", courseId, chatId),
  onChatMessage: (listener: (chatId: string, message: Message) => void) => {
    ipcRenderer.on(
      "chat:message:complete",
      (_event, chatId, message) => listener(chatId, message)
    );
  },
  unsubscribeChatMessage: () =>
    ipcRenderer.removeAllListeners("chat:message:complete"),
};

contextBridge.exposeInMainWorld("api", api);
