import { ChildProcess, exec } from "child_process";
import path from "path";
import { app } from "electron";
import fs from "fs";
import logger from "electron-log";
const log = logger.log;
import os from "os";
import dotenv from "dotenv";
import { notifyOllamaReady } from "./notifier";
import { getModelInstallationFolder } from "../config";
dotenv.config();

type OllamaInstanceType = "readyOnDevice" | "startedFromDevice" | "prepackaged";

class OllamaStarter {
  private static instance: OllamaStarter;

  public static getInstance(): OllamaStarter {
    if (!OllamaStarter.instance) {
      OllamaStarter.instance = new OllamaStarter();
    }
    return OllamaStarter.instance;
  }

  private isRunning: boolean;
  private instanceType: OllamaInstanceType;
  private host: string;
  private childProcess: ChildProcess;

  private constructor() {
    this.isRunning = false;
    this.instanceType = null;
    this.host = null;
  }

  public stop(): void {
    log("Stopping Ollama server");
    if (this.childProcess) {
      this.childProcess.kill();
    }
    this.isRunning = false;
    this.instanceType = null;
    this.host = null;
  }

  /**
   * Tells weather the Ollama server is running or not
   * @returns running if the server is running, not running otherwise
   */
  public getOllamaStatus(): "running" | "not running" {
    return this.isRunning ? "running" : "not running";
  }

  /**
   * Return the host of the Ollama server that is running. If the server is not running, return null
   * @returns The host of the Ollama server
   */
  public getHost(): string {
    return this.host;
  }

  /**
   * Try to start the Ollama server
   * @returns The type of the Ollama instance that was started
   * @throws An error if the server could not be started
   */
  public async start(): Promise<OllamaInstanceType> {
    if (this.isRunning) {
      return this.instanceType;
    }

    try {
      await this.attemptStartReadyOnDevice();
      log("Connected to server on device");
      notifyOllamaReady();
      return this.instanceType;
    } catch (error) {
      // If the server is not running, try to start it from the device
    }

    try {
      await this.attemptStartStartedFromDevice();
      log("Started server from device");
      notifyOllamaReady();
      return this.instanceType;
    } catch (error) {
      // If ollama is not installed on the device, try to start the prepackaged server
    }

    try {
      await this.attemptStartPrepackaged();
      log("Prepackaged server started");
      notifyOllamaReady();
      return this.instanceType;
    } catch (error) {
      log(`Could not start prepackaged server: ${error}`);
    }

    throw new Error("Could not start Ollama server");
  }

  /**
   * Attempt to connect to a running Ollama server on the device
   * @returns A promise that resolves when the server is connected
   * @throws An error if the server could not be connected
   */
  private async attemptStartReadyOnDevice(): Promise<void> {
    const host = process.env.OLLAMA_HOST || "http://localhost:11434";
    const isRunning = await this.ping(host);
    if (isRunning) {
      this.isRunning = true;
      this.instanceType = "readyOnDevice";
      this.host = host;
    } else {
      throw new Error("Could not start Ollama server");
    }
  }

  /**
   * Attempt to start the Ollama server from the device
   * @returns A promise that resolves when the server is started
   * @throws An error if the server could not be started
   */
  private async attemptStartStartedFromDevice(): Promise<void> {
    return new Promise((resolve, reject) => {
      const host = process.env.OLLAMA_HOST || "http://localhost:11434";
      const env = { OLLAMA_HOST: host };
      this.childProcess = exec("ollama serve", { env }, (error) => {
        if (error) {
          reject(error);
        }
        this.ping(host, 5).then((isRunning) => {
          if (isRunning) {
            this.isRunning = true;
            this.instanceType = "startedFromDevice";
            this.host = host;
            resolve();
          } else {
            reject(new Error("Could not start Ollama server"));
          }
        });
      });
    });
  }

  /**
   * Attempt to start the prepackaged Ollama server
   * @returns A promise that resolves when the server is started
   * @throws An error if the server could not be started
   */
  private async attemptStartPrepackaged(): Promise<void> {
    return new Promise((resolve, reject) => {
      const host = process.env.OLLAMA_HOST || "http://localhost:11434";
      const modelPath = getModelInstallationFolder();
      if (!fs.existsSync(modelPath)) {
        fs.mkdirSync(modelPath, { recursive: true });
      }
      const env = {
        OLLAMA_HOST: host,
        OLLAMA_MODELS: modelPath,
        HOME: os.homedir(),
      };
      const pathToBinary = this.getPathToBinary();
      this.childProcess = exec(`${pathToBinary} serve`, { env }, (error) => {
        if (error) {
          reject(error);
        }
      });
      this.ping(host, 5).then((isRunning) => {
        if (isRunning) {
          this.isRunning = true;
          this.instanceType = "prepackaged";
          this.host = host;
          resolve();
        } else {
          reject(new Error("Could not start Ollama server"));
        }
      });
    });
  }

  /**
   * Get the path to the Ollama binary based on the environment
   * @returns The path to the Ollama binary
   */
  private getPathToBinary(): string {
    let folderPath = "";
    if (app.isPackaged) {
      folderPath = path.join(process.resourcesPath, "ollama");
    } else {
      folderPath = path.join(__dirname, "../../extraResources", "ollama");
    }
    let fileName = "";
    if (process.platform === "linux") {
      fileName = "ollama-linux-amd64";
    } else if (process.platform === "win32") {
      fileName = "ollama.exe";
    } else {
      log("Operating system isn't supported. Ollama won't be able to start.");
      throw new Error(
        "Operating system isn't supported. Ollama won't be able to start."
      );
    }
    const filePath = path.join(folderPath, fileName);
    return filePath;
  }

  /**
   * Ping the host to check if ollama server is running
   * @param host The host to ping
   * @param retries The number of times to retry the ping
   * @returns True if the host is running, false otherwise
   */
  private async ping(host: string, retries = 1): Promise<boolean> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(host);
        if (response.ok) {
          return true;
        }
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    return false;
  }
}

export default OllamaStarter;
