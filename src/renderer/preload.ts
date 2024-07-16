import { contextBridge, ipcRenderer } from "electron";
import { type course } from "../main/courses/courses";

contextBridge.exposeInMainWorld("api", {
  startOllama: () => ipcRenderer.invoke("ollama:start"),
  setupOllama: () => ipcRenderer.invoke("ollama:setup"),
  addCourse: (courseTitle: string) =>
    ipcRenderer.invoke("course:add", courseTitle),
  removeCourse: (courseId: string) =>
    ipcRenderer.invoke("course:remove", courseId),
  getCourse: (courseId: string) => ipcRenderer.invoke("course:get", courseId),
  getCourses: () => ipcRenderer.invoke("course:getAll"),
  updateCourse: (course: course) => ipcRenderer.invoke("course:update", course),
  getChats: (courseId: string) => ipcRenderer.invoke("chat:get", courseId),
  addChat: (courseId: string, chatName?: string) =>
    ipcRenderer.invoke("chat:add", courseId, chatName),
  removeChat: (chatId: string) => ipcRenderer.invoke("chat:remove", chatId),
  addDocument: (courseId: string) =>
    ipcRenderer.invoke("document:add", courseId),
  deleteDocument: (courseId: string, documentId: string) =>
    ipcRenderer.invoke("document:delete", courseId, documentId),
  renameDocument: (courseId: string, documentId: string, newTitle: string) =>
    ipcRenderer.invoke("document:rename", courseId, documentId, newTitle),
  getDocuments: (courseId: string) =>
    ipcRenderer.invoke("document:getAll", courseId),
  getDocument: (courseId: string, documentId: string) =>
    ipcRenderer.invoke("document:get", courseId, documentId),
});
