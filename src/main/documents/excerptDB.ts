import { create, insertMultiple, Orama } from "@orama/orama";
import path from "path";
import { app } from "electron";
import fs from "fs";
import {
  restoreFromFile,
  persistToFile,
  // eslint-disable-next-line import/no-unresolved
} from "@orama/plugin-data-persistence/server";

const schema = {
  text: "string",
  documentTitle: "string",
  courseId: "string",
  documentId: "string",
  embeddings: "vector[768]",
} as const;

class ExcerptsDB {
  private static instance: ExcerptsDB | null = null;

  public static async getInstance(): Promise<ExcerptsDB> {
    if (!ExcerptsDB.instance) {
      const filePath = this.getFilePath();
      const db = await this.readDB(filePath);
      ExcerptsDB.instance = new ExcerptsDB(db, filePath);
    }
    return ExcerptsDB.instance;
  }

  private static getFilePath() {
    const folderPath = path.join(app.getPath("userData"), "excerpts");
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    const filePath = path.join(folderPath, "excerpts.mps");
    return filePath;
  }

  private static async readDB(filePath: string) {
    if (fs.existsSync(filePath)) {
      const db: Orama<typeof schema> = await restoreFromFile(
        "binary",
        filePath
      );
      return db;
    } else {
      const db = await create({ schema });
      await persistToFile(db, "binary", filePath);
      return db;
    }
  }

  private db: Orama<typeof schema>;
  private filePath: string;

  private constructor(db: Orama<typeof schema>, filePath: string) {
    this.db = db;
    this.filePath = filePath;
  }

  /**
   * Saves the excerpt to the database
   * @param excerpts The excerpts to be saved
   * @returns The ids of the saved excerpts in order
   */
  public async insert(excerpts: Excerpt[]) {
    const ids = await insertMultiple<typeof this.db>(this.db, excerpts);
    await this.persist();
    return ids;
  }

  private async persist() {
    await persistToFile(this.db, "binary", this.filePath);
  }
}

export default ExcerptsDB;