import { app } from "electron";
import fs from "fs";
import path from "path";

const log = (message: string) => {
  // Format date as dd/mm/yyyy hh:mm:ss
  const logMessage = `[${new Date().toLocaleString('en-GB')}] ${message}\n`;
  const logFilePath = path.join(app.getPath("userData"), "logs.txt");
  fs.appendFileSync(logFilePath, logMessage);
};

export default log;
