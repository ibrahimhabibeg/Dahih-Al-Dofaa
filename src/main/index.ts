import { app, BrowserWindow, ipcMain } from "electron";
import {
  start as startOllama,
  stop as stopOllama,
  pull as pullOllama,
} from "./ollama/ollama";
import {
  addCourse,
  removeCourse,
  updateCourse,
  getCourse,
  getCourses,
  course,
} from "./courses/courses";
import { getChats, addChat, removeChat } from "./chats/chats";

// IPC handlers
import "./documents";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  ipcMain.handle("ollama:start", startOllama);
  ipcMain.handle("ollama:pull", async (event, model: string) => {
    await pullOllama(model);
  });
  ipcMain.handle("course:add", async (event, courseTitle: string) => {
    const courses = await addCourse(courseTitle);
    return courses;
  });
  ipcMain.handle("course:remove", async (event, courseId: string) => {
    const courses = await removeCourse(courseId);
    return courses;
  });
  ipcMain.handle("course:get", async (event, courseId: string) => {
    const course = await getCourse(courseId);
    return course;
  });
  ipcMain.handle("course:getAll", async () => {
    const courses = await getCourses();
    return courses;
  });
  ipcMain.handle("course:update", async (event, course: course) => {
    const courses = await updateCourse(course);
    return courses;
  });
  ipcMain.handle("chat:get", async (event, courseId: string) => {
    const chats = await getChats(courseId);
    return chats;
  });
  ipcMain.handle(
    "chat:add",
    async (event, courseId: string, chatName: string) => {
      const chats = await addChat(courseId, chatName);
      return chats;
    }
  );
  ipcMain.handle("chat:remove", async (event, chatId: string) => {
    const chats = await removeChat(chatId);
    return chats;
  });
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

app.on("before-quit", () => {
  // Stop the Ollama server when the app is quitting
  stopOllama();
});
