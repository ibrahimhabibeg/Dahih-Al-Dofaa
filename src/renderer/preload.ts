import { contextBridge, ipcRenderer } from "electron";
import { type course } from "../main/courses/courses";

contextBridge.exposeInMainWorld("api", {
  startOllama: () => ipcRenderer.invoke("ollama:start"),
  pullOllama: (model: string) => ipcRenderer.invoke("ollama:pull", model),
  stopOllama: () => ipcRenderer.invoke("ollama:stop"),
  addCourse: (courseTitle: string) =>
    ipcRenderer.invoke("course:add", courseTitle),
  removeCourse: (courseId: string) =>
    ipcRenderer.invoke("course:remove", courseId),
  getCourse: (courseId: string) => ipcRenderer.invoke("course:get", courseId),
  getCourses: () => ipcRenderer.invoke("course:get"),
  updateCourse: (course: course) => ipcRenderer.invoke("course:update", course),
});
