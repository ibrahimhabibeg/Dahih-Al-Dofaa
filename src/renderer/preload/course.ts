import { ipcRenderer, type IpcRendererEvent } from "electron";

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

export default course;