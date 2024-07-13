import { course } from "./main/courses/courses";
import { Document } from "./main/documents/docDB";

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
  addDocument: (courseId: string) => Promise<Document[]>;
  deleteDocument: (documentId: string) => Promise<Document[]>;
  renameDocument: (documentId: string, newTitle: string) => Promise<Document[]>;
  getDocuments: (courseId: string) => Promise<Document[]>;
  getDocument: (documentId: string) => Promise<Document>;
}

declare global {
  interface Window {
    api: IAPI;
  }
}
