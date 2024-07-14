import { course } from "./main/courses/courses";

export interface IAPI {
  startOllama: () => Promise<void>;
  pullOllama: (model: string) => Promise<void>;
  stopOllama: () => Promise<void>;
  addCourse: (courseTitle: string) => Promise<course[]>;
  removeCourse: (courseId: string) => Promise<course[]>;
  getCourse: (courseId: string) => Promise<course>;
  getCourses: () => Promise<course[]>;
  updateCourse: (course: course) => Promise<course[]>;
  getChats: (courseId: string) => Promise<chat[]>;
  addChat: (courseId: string, chatName?: string) => Promise<chat[]>;
  removeChat: (chatId: string) => Promise<chat[]>;
  addDocument: (courseId: string) => Promise<Doc[]>;
  deleteDocument: (documentId: string) => Promise<Doc[]>;
  renameDocument: (documentId: string, newTitle: string) => Promise<Doc[]>;
  getDocuments: (courseId: string) => Promise<Doc[]>;
  getDocument: (documentId: string) => Promise<Doc>;
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
    courseId: string;
    docType: DocType;
  }
}
