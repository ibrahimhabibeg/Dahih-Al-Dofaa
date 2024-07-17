import { create, insertMultiple, Orama, search } from "@orama/orama";
import { embed } from "../ollama";

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

  private constructor(courseId: string, db: Orama<typeof schema>) {
    this.db = db;
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
    return insertMultiple<typeof this.db>(this.db, data);
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
}

export default VectorDB;
