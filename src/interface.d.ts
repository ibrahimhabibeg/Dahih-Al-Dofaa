import { course } from "./main/courses/courses";

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
  removeChat: (courseId:string, chatId: string) => Promise<ChatType[]>;
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
  chat: (courseId: string, chatId: string, message: string) => Promise<void>;
  getMessages: (courseId: string, chatId: string) => Promise<Message[]>;
  chatSubscribe: (courseId: string, chatId: string) => Promise<void>;
  chatUnsubscribe: (courseId: string, chatId: string) => Promise<void>;
  chatIsLoadingMessage: (courseId: string, chatId: string) => Promise<boolean>;
  onChatMessage: (listener: (chatId: string, message: Message) => void) => void;
  unsubscribeChatMessage: () => void;
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
