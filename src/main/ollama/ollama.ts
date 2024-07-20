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
  private static inistance: OllamaManager = null;
  private ollama: Ollama;
  private host: string;
  private childProcess: ChildProcess;
  private llmModel = "llama3";
  private embeddedModel = "nomic-embed-text";

  constructor() {
    this.host = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
    this.ollama = new Ollama({ host: this.host });
  }

  /**
   * Get the instance of OllamaManager.
   * @returns {OllamaManager} The instance of OllamaManager.
   */
  static getInstance(): OllamaManager {
    if (this.inistance === null) {
      this.inistance = new this();
    }
    return this.inistance;
  }

  /**
   * Start the Ollama server.
   * @returns {Promise<string>} The type of Ollama server that is running.
   */
  async start(): Promise<string> {
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
  private async execServe(
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
  private async ping(): Promise<boolean> {
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
  private async waitForPing(delay = 1000, retries = 5): Promise<void> {
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
  stop(): void {
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

  private async pull(model: string): Promise<void> {
    const modelExists = await this.doesModelExist(model);
    if (modelExists) return;
    await this.ollama.pull({ model: model });
  }

  private async doesModelExist(model: string) {
    const { models } = await this.ollama.list();
    for (const m of models) {
      if (m.name.startsWith(model)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Sets up everything needed for Ollama.
   */
  async setup(): Promise<void> {
    await this.pull(this.llmModel);
    await this.pull(this.embeddedModel);
  }

  /**
   * Embeds the given text array.
   * @param textArray The array of text to embed
   * @returns {Promise<number[][]>} The embeddings of the text array.
   */
  async embed(textArray: string[]): Promise<number[][]> {
    const embeddings = [];
    for (const text of textArray) {
      const response = await this.ollama.embeddings({
        model: this.embeddedModel,
        prompt: text,
      });
      embeddings.push(response.embedding);
    }
    return embeddings;
  }

  public getHost(): string {
    return this.host;
  }
}

const ollamaManager = OllamaManager.getInstance();

export default ollamaManager;
