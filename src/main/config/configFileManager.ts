import path from "path";
import { app } from "electron";
import fs from "fs";
import Logger from "electron-log";

interface IConfigFile {
  theme: "light" | "dark";
}

const defaultConfig: IConfigFile = {
  theme: "dark",
};

class ConfigFileManager {
  private static instance: ConfigFileManager;

  public static getInstance(): ConfigFileManager {
    const configFilePath = ConfigFileManager.getConfigFilePath();
    if (!ConfigFileManager.instance) {
      const config = this.loadConfigFromFile(configFilePath);
      ConfigFileManager.instance = new ConfigFileManager(
        config,
        configFilePath
      );
    }
    return ConfigFileManager.instance;
  }

  private static getConfigFilePath(): string {
    return path.join(app.getPath("userData"), "config.json");
  }

  /**
   * Load the config file from the given path if it exists.
   * Otherwise create a default config file at the given path and return it.
   * If the config file is missing properties, they will be added with default values.
   * @param configFilePath The path to the config file
   * @returns The loaded or created config
   */
  private static loadConfigFromFile(configFilePath: string): IConfigFile {
    try {
      const config = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
      return { ...defaultConfig, ...config };
    } catch (e) {
      Logger.error(`Failed to load config file: ${e}`);
      return ConfigFileManager.createDefaultConfigFile(configFilePath);
    }
  }

  /**
   * Create a default config file in the given path and return the created config
   * @param configFilePath The path to the config file
   * @returns The written config
   */
  private static createDefaultConfigFile(configFilePath: string): IConfigFile {
    const directory = path.dirname(configFilePath);
    if (!fs.existsSync(directory)) {
      Logger.info(`Creating directory ${directory}`);
      fs.mkdirSync(directory, { recursive: true });
    }
    Logger.info(`Creating default config file at ${configFilePath}`);
    fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig));
    return defaultConfig;
  }

  private config: IConfigFile;
  private configFilePath: string;

  private constructor(config: IConfigFile, configFilePath: string) {
    this.config = config;
    this.configFilePath = configFilePath;
  }

  /**
   * Get the value of the given key from the config file
   * @param key The key to get the value for
   * @returns The value of the key
   */
  public getKeyValue(key: keyof IConfigFile): IConfigFile[keyof IConfigFile] {
    return this.config[key];
  }

  /**
   * Set the value of the given key in the config file
   * @param key The key to set the value for
   * @param value The value to set
   */
  public setKeyValue(
    key: keyof IConfigFile,
    value: IConfigFile[keyof IConfigFile]
  ): void {
    this.config[key] = value;
    this.saveConfig();
  }

  private saveConfig(): void {
    fs.writeFileSync(this.configFilePath, JSON.stringify(this.config));
  }
}

const configFileManager = ConfigFileManager.getInstance();
export default configFileManager;
