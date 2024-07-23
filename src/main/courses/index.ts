import { ipcMain } from "electron";
import {
  getCourses,
  getCourse,
  addCourse,
  removeCourse,
  updateCourse,
} from "./courses";

ipcMain.handle("course:getAll", async () => {
  return await getCourses();
});

ipcMain.handle("course:get", async (_, courseId: string) => {
  return await getCourse(courseId);
});

ipcMain.handle("course:add", async (_, courseTitle: string) => {
  await addCourse(courseTitle);
});

ipcMain.handle("course:delete", async (_, courseId: string) => {
  await removeCourse(courseId);
});

ipcMain.handle(
  "course:rename",
  async (_, courseId: string, courseTitle: string) => {
    await updateCourse({ id: courseId, title: courseTitle });
  }
);
