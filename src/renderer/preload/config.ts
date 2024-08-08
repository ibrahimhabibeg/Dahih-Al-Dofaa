import { ipcRenderer } from "electron";

const config = {
  getTheme: (): Promise<"light" | "dark"> => {
    return ipcRenderer.invoke("config:theme:get");
  },
  setTheme: (theme: "light" | "dark") => {
    ipcRenderer.invoke("config:theme:set", theme);
  },
};

export type IConfigAPI = typeof config;
export default config;
