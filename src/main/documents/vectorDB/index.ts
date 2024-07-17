import {
  create,
  insertMultiple,
  Orama,
  search,
  removeMultiple,
} from "@orama/orama";
import { embed } from "../../ollama";
import TextIdsDB from "./textIdsDB";

const schema = {
  text: "string",
  embedding: "vector[768]",
  documentId: "string",
} as const;

class VectorDB {
  private static instanceMap: Map<string, VectorDB> = new Map<
    string,
    VectorDB
  >();
  private db: Orama<typeof schema>;
  private textIdsDB: TextIdsDB;

  private constructor(courseId: string, db: Orama<typeof schema>) {
    this.db = db;
    this.textIdsDB = TextIdsDB.getInstance(courseId);
  }

  public static async getInstance(courseId: string): Promise<VectorDB> {
    if (!VectorDB.instanceMap.has(courseId)) {
      const db = await create({ schema });
      VectorDB.instanceMap.set(courseId, new VectorDB(courseId, db));
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
  }

  public async search(query: string) {
    const [queryEmbedding] = await embed([query]);
    const result = await search<typeof this.db>(this.db, {
      mode: "vector",
      vector: {
        value: queryEmbedding,
        property: "embedding",
      },
      limit: 5,
    });
    const documents = result.hits.map((hit) => hit.document);
    return documents;
  }

  public async deleteDocument(documentId: string) {
    const textIds = this.textIdsDB.getTextIds(documentId);
    await removeMultiple(this.db, textIds);
    this.textIdsDB.deleteDocument(documentId);
  }
}

export default VectorDB;
