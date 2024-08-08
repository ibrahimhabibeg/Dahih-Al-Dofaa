import { contextBridge } from "electron";
import ollama from "./preload/ollama";
import message from "./preload/message";
import chat from "./preload/chat";
import document from "./preload/document";
import course from "./preload/course";
import model from "./preload/model";
import config from "./preload/config";
import modelsTransfer from "./preload/modelsTransfer";

const api: Window["api"] = {
  message,
  chat,
  document,
  course,
  ollama,
  model,
  config,
  modelsTransfer,
};

contextBridge.exposeInMainWorld("api", api);
