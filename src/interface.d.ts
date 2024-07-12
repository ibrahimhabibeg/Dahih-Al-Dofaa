export interface IAPI {
  startOllama: () => Promise<void>;
  pullOllama: (model: string) => Promise<void>;
  addCourse: (courseTitle: string) => Promise<void>;
  removeCourse: (courseId: string) => Promise<void>;
  getCourse: (courseId: string) => Promise<void>;
  getCourses: () => Promise<void>;
  updateCourse: (course: course) => Promise<void>;
}

declare global {
  interface Window {
    api: IAPI;
  }
}
