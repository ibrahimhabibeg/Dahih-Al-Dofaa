import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { type Course } from "../main/courses/courses";

const message = {
  getMessages: (courseId: string, chatId: string) => {
    return ipcRenderer.invoke("message:get", courseId, chatId);
  },
  isLoadingMessage: (courseId: string, chatId: string) => {
    return ipcRenderer.invoke("message:isLoading", courseId, chatId);
  },
  sendMessage: (courseId: string, chatId: string, message: string) => {
    ipcRenderer.invoke("message:send", courseId, chatId, message);
  },
  subscribeToIsLoadingMessage: (
    courseId: string,
    chatId: string,
    listener: (_event: IpcRendererEvent, isLoading: boolean) => void
  ) => {
    ipcRenderer.on(`message:update:loading:${courseId}:${chatId}`, listener);
  },
  unsubscribeFromIsLoadingMessage: (courseId: string, chatId: string) => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(
      `message:update:loading:${courseId}:${chatId}`
    );
  },
  subscribeToCompleteMessage: (
    courseId: string,
    chatId: string,
    listener: (_event: IpcRendererEvent, message: Message) => void
  ) => {
    ipcRenderer.on(`message:update:complete:${courseId}:${chatId}`, listener);
  },
  unsubscribeFromCompleteMessage: (courseId: string, chatId: string) => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(
      `message:update:complete:${courseId}:${chatId}`
    );
  },
  subscribeToPartialMessage: (
    courseId: string,
    chatId: string,
    listener: (_event: IpcRendererEvent, message: string) => void
  ) => {
    ipcRenderer.on(`message:update:partial:${courseId}:${chatId}`, listener);
  },
  unsubscribeFromPartialMessage: (courseId: string, chatId: string) => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(
      `message:update:partial:${courseId}:${chatId}`
    );
  },
};

const chat = {
  subscribeToChats: (
    courseId: string,
    listener: (_event: IpcRendererEvent, chats: ChatType[]) => void
  ) => {
    ipcRenderer.on(`chat:update:${courseId}`, listener);
  },
  unsubscribeFromChats: (courseId: string) => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(`chat:update:${courseId}`);
  },
};

const ollama = {
  isReady: () => ipcRenderer.invoke("ollama:isReady"),
  subscribeToReady: (listener: (_event: IpcRendererEvent) => void) => {
    ipcRenderer.on("ollama:ready", listener);
  },
  unsubscribeFromReady: () => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners("ollama:ready");
  },
};

const document = {
  get: (courseId: string, documentId: string) =>
    ipcRenderer.invoke("document:get", courseId, documentId),
  getAll: (courseId: string) => ipcRenderer.invoke("document:getAll", courseId),
  add: (courseId: string) => ipcRenderer.invoke("document:add", courseId),
  rename: (courseId: string, documentId: string, newTitle: string) =>
    ipcRenderer.invoke("document:rename", courseId, documentId, newTitle),
  delete: (courseId: string, documentId: string) =>
    ipcRenderer.invoke("document:delete", courseId, documentId),
  isLoading: (courseId: string, documentId: string) =>
    ipcRenderer.invoke("document:isLoading", courseId, documentId),
  subscribeToIsLoading: (
    courseId: string,
    documentId: string,
    listener: (_event: IpcRendererEvent, isLoading: boolean) => void
  ) => {
    ipcRenderer.on(
      `document:update:loading:${courseId}:${documentId}`,
      listener
    );
  },
  unsubscribeFromIsLoading: (courseId: string, documentId: string) => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(
      `document:update:loading:${courseId}:${documentId}`
    );
  },
  subscribeToAllDocuments: (
    courseId: string,
    listener: (_event: IpcRendererEvent, documents: Doc[]) => void
  ) => {
    ipcRenderer.on(`document:update:${courseId}`, listener);
  },
  unsubscribeFromAllDocuments: (courseId: string) => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(`document:update:${courseId}`);
  },
};

const course = {
  get: (courseId: string) => ipcRenderer.invoke("course:get", courseId),
  getAll: () => ipcRenderer.invoke("course:getAll"),
  add: (courseTitle: string) => ipcRenderer.invoke("course:add", courseTitle),
  delete: (courseId: string) => ipcRenderer.invoke("course:delete", courseId),
  rename: (courseId: string, courseTitle: string) =>
    ipcRenderer.invoke("course:rename", courseId, courseTitle),
  subscribeToCourse: (
    courseId: string,
    listener: (_event: IpcRendererEvent, course: Course) => void
  ) => {
    ipcRenderer.on(`course:update:${courseId}`, listener);
  },
  unsubscribeFromCourse: (courseId: string) => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(`course:update:${courseId}`);
  },
  subscribeToAllCourses: (
    listener: (_event: IpcRendererEvent, courses: Course[]) => void
  ) => {
    ipcRenderer.on(`course:update:all`, listener);
  },
  unsubscribeFromAllCourses: () => {
    // Warning: Removing ALL listeners may cause unintended side effects
    ipcRenderer.removeAllListeners(`course:update:all`);
  },
};

const api: Window["api"] = {
  getChats: (courseId: string) => ipcRenderer.invoke("chat:getAll", courseId),
  getChat: (courseId: string, chatId: string) =>
    ipcRenderer.invoke("chat:get", courseId, chatId),
  addChat: (courseId: string, chatName?: string) =>
    ipcRenderer.invoke("chat:add", courseId, chatName),
  removeChat: (courseId: string, chatId: string) =>
    ipcRenderer.invoke("chat:remove", courseId, chatId),
  renameChat: (courseId: string, chatId: string, newTitle: string) =>
    ipcRenderer.invoke("chat:rename", courseId, chatId, newTitle),
  message,
  chat,
  document,
  course,
  ollama,
};

contextBridge.exposeInMainWorld("api", api);
