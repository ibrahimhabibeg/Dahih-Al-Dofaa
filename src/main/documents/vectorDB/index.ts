import {
  create,
  insertMultiple,
  Orama,
  search,
  removeMultiple,
} from "@orama/orama";

import TextIdsDB from "./textIdsDB";
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
  embedding: "vector[768]",
  documentId: "string",
} as const;

const embed = async (textArray: string[]): Promise<number[][]> => {
  throw new Error("Not implemented");
};

class VectorDB {
  private static instanceMap: Map<string, VectorDB> = new Map<
    string,
    VectorDB
  >();
  private db: Orama<typeof schema>;
  private textIdsDB: TextIdsDB;
  private filePath: string;

  private constructor(
    courseId: string,
    db: Orama<typeof schema>,
    filePath: string
  ) {
    this.db = db;
    this.textIdsDB = TextIdsDB.getInstance(courseId);
    this.filePath = filePath;
  }

  public static async getInstance(courseId: string): Promise<VectorDB> {
    if (!VectorDB.instanceMap.has(courseId)) {
      const folderPath = path.join(
        app.getPath("userData"),
        "courses",
        courseId
      );
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      const filePath = path.join(folderPath, "vectorDB.json");
      if (fs.existsSync(filePath)) {
        const db: Orama<typeof schema> = await restoreFromFile(
          "json",
          filePath
        );
        VectorDB.instanceMap.set(
          courseId,
          new VectorDB(courseId, db, filePath)
        );
      } else {
        const db = await create({ schema });
        await persistToFile(db, "json", filePath);
        VectorDB.instanceMap.set(
          courseId,
          new VectorDB(courseId, db, filePath)
        );
      }
    }
    return VectorDB.instanceMap.get(courseId);
  }

  public async insert(textArray: string[], documentId: string) {
    const embeddings = await embed(textArray);
    const data = embeddings.map((embedding, index) => ({
      text: textArray[index],
      embedding,
      documentId,
    }));
    const ids = await insertMultiple<typeof this.db>(this.db, data);
    this.textIdsDB.saveText(ids, documentId);
    await this.persist();
  }

  public async search(query: string) {
    const [queryEmbedding] = await embed([query]);
    const result = await search<typeof this.db>(this.db, {
      mode: "vector",
      vector: {
        value: queryEmbedding,
        property: "embedding",
      },
      similarity: 0.7,
      limit: 5,
    });
    const documents = result.hits.map((hit) => hit.document);
    return documents;
  }

  public async deleteDocument(documentId: string) {
    const textIds = this.textIdsDB.getTextIds(documentId);
    await removeMultiple(this.db, textIds);
    this.textIdsDB.deleteDocument(documentId);
    await this.persist();
  }

  private async persist() {
    await persistToFile(this.db, "json", this.filePath);
  }
}

export default VectorDB;
