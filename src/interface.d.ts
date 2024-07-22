import { course } from "./main/courses/courses";

interface IMessageAPI {
  getMessages: (courseId: string, chatId: string) => Promise<Message[]>;
  isLoadingMessage: (courseId: string, chatId: string) => Promise<boolean>;
  sendMessage: (courseId: string, chatId: string, message: string) => void;
  subscribeToIsLoadingMessage: (
    courseId: string,
    chatId: string,
    listener: (_event: IpcRendererEvent, isLoading: boolean) => void
  ) => void;
  unsubscribeFromIsLoadingMessage: (courseId: string, chatId: string) => void;
  subscribeToCompleteMessage: (
    courseId: string,
    chatId: string,
    listener: (_event: IpcRendererEvent, message: Message) => void
  ) => void;
  unsubscribeFromCompleteMessage: (courseId: string, chatId: string) => void;
}

interface IChatAPI {
  subscribeToChats: (
    courseId: string,
    listener: (_event: IpcRendererEvent, chats: ChatType[]) => void
  ) => void;
  unsubscribeFromChats: (courseId: string) => void;
}

export interface IAPI {
  startOllama: () => Promise<void>;
  setupOllama: () => Promise<void>;
  addCourse: (courseTitle: string) => Promise<course[]>;
  removeCourse: (courseId: string) => Promise<course[]>;
  getCourse: (courseId: string) => Promise<course>;
  getCourses: () => Promise<course[]>;
  updateCourse: (course: course) => Promise<course[]>;
  getChats: (courseId: string) => Promise<ChatType[]>;
  addChat: (courseId: string, chatName?: string) => Promise<ChatType>;
  removeChat: (courseId: string, chatId: string) => Promise<ChatType[]>;
  addDocument: (courseId: string) => Promise<Doc[]>;
  deleteDocument: (courseId: string, documentId: string) => Promise<Doc[]>;
  renameDocument: (
    courseId: string,
    documentId: string,
    newTitle: string
  ) => Promise<Doc[]>;
  getDocuments: (courseId: string) => Promise<Doc[]>;
  getDocument: (courseId: string, documentId: string) => Promise<Doc>;
  listenToDocument: (documentId: string) => Promise<boolean>;
  stopListeningToDocument: (documentId: string) => Promise<boolean>;
  onDocumentLoading: (listener: (documentId: string) => void) => void;
  onDocumentLoaded: (listener: (documentId: string) => void) => void;
  getChat: (courseId: string, chatId: string) => Promise<ChatType>;
  renameChat: (
    courseId: string,
    chatId: string,
    newTitle: string
  ) => Promise<void>;
  message: IMessageAPI;
  chat: IChatAPI;
}

declare global {
  interface Window {
    api: IAPI;
  }

  type DocType = "pdf" | "docx" | "pptx";

  interface Doc {
    id: string;
    title: string;
    path: string;
    docType: DocType;
  }

  interface ChatType {
    id: string;
    title: string;
  }

  interface Message {
    content: string;
    sender: "human" | "bot";
  }
}
