import { Ollama } from "ollama";
import { exec, ChildProcess } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

/**
 * OllamaServeType is an enum that represents the type of Ollama server that is running.
 * SYSTEM: Ollama server is running as a system command.
 * PACKAGED: Ollama server is running as a packaged binary.
 * @enum {string}
 */
const OllamaServeType = Object.freeze({
  SYSTEM: "system",
  PACKAGED: "packaged",
});

/**
 * OllamaManager is a singleton class that manages the Ollama server.
 */
class OllamaManager {
  static inistance: OllamaManager = null;
  ollama: Ollama;
  host: string;
  childProcess: ChildProcess;

  constructor() {
    this.host = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
    this.ollama = new Ollama({ host: this.host });
  }

  /**
   * Get the instance of OllamaManager.
   * @returns {OllamaManager} The instance of OllamaManager.
   */
  static getInstance() {
    if (this.inistance === null) {
      this.inistance = new this();
    }
    return this.inistance;
  }

  /**
   * Start the Ollama server.
   * @returns {Promise<string>} The type of Ollama server that is running.
   */
  async start() {
    try {
      await this.ping();
      return OllamaServeType.SYSTEM;
    } catch (err) {
      // Ollama is not running
      // We will try to start it
    }

    try {
      await this.execServe("ollama");
      return OllamaServeType.SYSTEM;
    } catch (err) {
      // 'ollama serve' command is not available
    }

    // start the packaged ollama server
    let exe = "";
    let appDataPath = "";
    switch (process.platform) {
      case "win32":
        exe = "ollama.exe";
        appDataPath = path.join(os.homedir(), "AppData", "Local", "chatd");
        break;
      case "linux":
        exe = "ollama-linux";
        appDataPath = path.join(os.homedir(), ".config", "chatd");
        break;
      default:
        return;
    }

    const pathToBinary = path.join(__dirname, "runners", exe);
    try {
      await this.execServe(pathToBinary, appDataPath);
      return OllamaServeType.PACKAGED;
    } catch (err) {
      throw new Error(`Failed to start Ollama: ${err}`);
    }
  }

  /**
   * Execute serve command to start the Ollama server.
   * @param path Path to the Ollama server binary.
   * @param appDataDirectory Path to the directory where Ollama will store its data.
   * @returns {Promise<void>} Promise that resolves when the Ollama server is running.
   */
  async execServe(
    path: string,
    appDataDirectory: string = null
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (appDataDirectory && !fs.existsSync(appDataDirectory)) {
        fs.mkdirSync(appDataDirectory, { recursive: true });
      }
      const env = {
        ...process.env,
        OLLAMA_MODELS: appDataDirectory,
      };
      this.childProcess = exec(path + " serve", { env }, () => {
        reject("Can't start ollama");
      });

      // Once the process is started, try to ping Ollama server.
      this.waitForPing()
        .then(() => {
          resolve();
        })
        .catch((pingError) => {
          if (this.childProcess && !this.childProcess.killed) {
            this.childProcess.kill();
          }
          reject(pingError);
        });
    });
  }

  /**
   * Try to ping the Ollama server.
   * @returns {Promise<boolean>} True if the Ollama server is running.
   */
  async ping() {
    const response = await fetch(this.host, {
      method: "GET",
      cache: "no-store",
    });
    if (response.status !== 200) {
      throw new Error(`failed to ping ollama server: ${response.status}`);
    }
    return true;
  }

  /**
   * Try to ping the Ollama server with retries.
   * @param delay Milliseconds to wait before retrying
   * @param retries Number of retries
   * @returns {Promise<void>} Promise that resolves when the Ollama server is running.
   */
  async waitForPing(delay = 1000, retries = 5) {
    for (let i = 0; i < retries; i++) {
      try {
        await this.ping();
        return;
      } catch (err) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    throw new Error("Max retries reached. Ollama server didn't respond.");
  }

  /**
   * Stop the Ollama server.
   * @returns {void}
   */
  stop() {
    if (!this.childProcess) {
      return;
    }

    if (os.platform() === "win32") {
      // Windows: Use taskkill to force kill the process tree
      // This makes sure the child process isn't left running
      exec(`taskkill /pid ${this.childProcess.pid} /f /t`);
    } else {
      this.childProcess.kill();
    }

    this.childProcess = null;
  }
}

/**
 * Start the Ollama server.
 * @returns {Promise<string>} The type of Ollama server that is running.
 */
export const start = async () => {
  const manager = OllamaManager.getInstance();
  return manager.start();
};

/**
 * Stop the Ollama server.
 * @returns {void}
 */
export const stop = () => {
  const manager = OllamaManager.getInstance();
  manager.stop();
};
