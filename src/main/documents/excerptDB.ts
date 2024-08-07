import {
  create,
  insertMultiple,
  Orama,
  removeMultiple,
  search,
} from "@orama/orama";
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
   * @param excerpts The excerpts to be saved. The embeddings must be of length 768.
   * @returns The ids of the saved excerpts in order.
   */
  public async insert(excerpts: Excerpt[]) {
    const ids = await insertMultiple<typeof this.db>(this.db, excerpts);
    await this.persist();
    return ids;
  }

  private async persist() {
    await persistToFile(this.db, "binary", this.filePath);
  }

  /**
   * Searches the database for excerpts that match the query and are from the requested course
   * @param query The text to search for
   * @param vector Embeddings of the query. Must be of length 768. Must be from the same model as the embeddings in the database
   * @param courseId The id of the course to search in
   * @returns The top 3 excerpts that match the query. May return less than 3 if there are not enough matches.
   */
  public async search(
    query: string,
    vector: number[],
    courseId: string
  ): Promise<Excerpt[]> {
    const result = await search(this.db, {
      mode: "hybrid",
      term: query,
      vector: {
        value: vector,
        property: "embeddings",
      },
      properties: ["documentTitle", "text"],
      where: {
        courseId,
      },
      similarity: 0.7,
      limit: 3,
    });
    return result.hits.map((hit) => hit.document);
  }

  /**
   * Deletes all excerpts from a document
   * @param documentId The id of the document to delete excerpts from
   */
  public async deleteExcerptsFromDocument(documentId: string) {
    const result = await search(this.db, {
      where: {
        documentId,
      },
    });
    const ids = result.hits.map((hit) => hit.id);
    await removeMultiple(this.db, ids);
  }

  /**
   * Deletes all excerpts from a course
   * @param courseId The id of the course to delete excerpts from
   */
  public async deleteExcerptsFromCourse(courseId: string) {
    const result = await search(this.db, {
      where: {
        courseId,
      },
    });
    const ids = result.hits.map((hit) => hit.id);
    await removeMultiple(this.db, ids);
  }

  public async renameDocument(documentId: string, newTitle: string) {
    const result = await search(this.db, {
      where: {
        documentId,
      },
      includeVectors: true,
    });
    const ids = result.hits.map((hit) => hit.id);
    await removeMultiple(this.db, ids);
    const newExcerpts = result.hits.map((hit) => ({
      ...hit.document,
      documentTitle: newTitle,
    }));
    await insertMultiple<typeof this.db>(this.db, newExcerpts);
    await this.persist();
  }
}

export default ExcerptsDB;
