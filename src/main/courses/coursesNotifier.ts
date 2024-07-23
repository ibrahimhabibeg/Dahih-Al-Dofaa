import { webContents } from "electron";
import { Course } from "./courses";

export const notifyCourseUpdate = (course: Course) => {
  const windows = webContents.getAllWebContents();
  windows.forEach((webContents) => {
    webContents.send(`course:update:${course.id}`, course);
  });
};

export const notifyCoursesUpdate = (courses: Course[]) => {
  const windows = webContents.getAllWebContents();
  windows.forEach((webContents) => {
    webContents.send(`course:update:all`, courses);
  });
};
