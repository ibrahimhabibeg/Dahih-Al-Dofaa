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
  subscribeToPartialMessage: (
    courseId: string,
    chatId: string,
    listener: (_event: IpcRendererEvent, message: string) => void
  ) => void;
  unsubscribeFromPartialMessage: (courseId: string, chatId: string) => void;
}

interface IChatAPI {
  subscribeToChats: (
    courseId: string,
    listener: (_event: IpcRendererEvent, chats: ChatType[]) => void
  ) => void;
  unsubscribeFromChats: (courseId: string) => void;
}

interface IDocumentAPI {
  getAll: (courseId: string) => Promise<Doc[]>;
  add: (courseId: string) => Promise<void>;
  rename: (courseId: string, docId: string, newTitle: string) => Promise<void>;
  delete: (courseId: string, docId: string) => Promise<void>;
  isLoading: (courseId: string, documentId: string) => Promise<boolean>;
  subscribeToIsLoading: (
    courseId: string,
    docId: string,
    listener: (_event: IpcRendererEvent, isLoading: boolean) => void
  ) => void;
  unsubscribeFromIsLoading: (courseId: string, docId: string) => void;
  subscribeToAllDocuments: (
    courseId: string,
    listener: (_event: IpcRendererEvent, documents: Doc[]) => void
  ) => void;
  unsubscribeFromAllDocuments: (courseId: string) => void;
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
  getChat: (courseId: string, chatId: string) => Promise<ChatType>;
  renameChat: (
    courseId: string,
    chatId: string,
    newTitle: string
  ) => Promise<void>;
  message: IMessageAPI;
  chat: IChatAPI;
  document: IDocumentAPI;
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
    latestActivity: Date;
  }

  interface Message {
    content: string;
    sender: "human" | "bot";
  }
}
