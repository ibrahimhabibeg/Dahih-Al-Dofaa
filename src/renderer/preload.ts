import { contextBridge } from "electron";
import ollama from "./preload/ollama";
import message from "./preload/message";
import chat from "./preload/chat";
import document from "./preload/document";
import course from "./preload/course";
import model from "./preload/model";

const api: Window["api"] = {
  message,
  chat,
  document,
  course,
  ollama,
  model,
};

contextBridge.exposeInMainWorld("api", api);
