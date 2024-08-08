import { ipcRenderer } from "electron";

const config = {
  getTheme: (): Promise<"light" | "dark"> => {
    return ipcRenderer.invoke("config:theme:get");
  },
  setTheme: (theme: "light" | "dark") => {
    ipcRenderer.invoke("config:theme:set", theme);
  },
  getModelTemperature: (): Promise<number> => {
    return ipcRenderer.invoke("config:modelTemperature:get");
  },
  setModelTemperature: (temperature: number): Promise<number> => {
    return ipcRenderer.invoke("config:modelTemperature:set", temperature);
  },
};

export type IConfigAPI = typeof config;
export default config;
