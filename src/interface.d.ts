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
}

declare global {
  interface Window {
    api: IAPI;
  }
}
