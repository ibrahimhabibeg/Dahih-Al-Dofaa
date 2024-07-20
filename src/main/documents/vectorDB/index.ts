import TextIdsDB from "./textIdsDB";
import path from "path";
import { app } from "electron";
import fs from "fs";
import { getEmbeddingsModel } from "../../embeddings";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import getLoader from "../loader";

class VectorDB {
  private static instanceMap: Map<string, VectorDB> = new Map<
    string,
    VectorDB
  >();

  private vectorStore: FaissStore;
  private directory: string;
  private textIdsDB: TextIdsDB;

  private constructor(
    courseId: string,
    vectorStore: FaissStore,
    directory: string
  ) {
    this.directory = directory;
    this.vectorStore = vectorStore;
    this.textIdsDB = TextIdsDB.getInstance(courseId);
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
      const directory = path.join(folderPath, "vectorDB");
      if (fs.existsSync(directory)) {
        const vectorStore = await FaissStore.load(
          directory,
          getEmbeddingsModel()
        );
        VectorDB.instanceMap.set(
          courseId,
          new VectorDB(courseId, vectorStore, directory)
        );
      } else {
        const vectorStore = await FaissStore.fromDocuments(
          [],
          getEmbeddingsModel()
        );
        VectorDB.instanceMap.set(
          courseId,
          new VectorDB(courseId, vectorStore, directory)
        );
      }
    }
    return VectorDB.instanceMap.get(courseId);
  }

  public async insert(document: Doc) {
    const loader = getLoader(document);
    const docs = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splittedDocuments = await textSplitter.splitDocuments(docs);
    const ids = await this.vectorStore.addDocuments(splittedDocuments);
    this.textIdsDB.saveText(ids, document.id);
    await this.save();
  }

  public async deleteDocument(documentId: string) {
    const textIds = this.textIdsDB.getTextIds(documentId);
    await this.vectorStore.delete({ ids: textIds });
    this.textIdsDB.deleteDocument(documentId);
    await this.save();
  }

  private async save() {
    await this.vectorStore.save(this.directory);
  }

  public getRetriver() {
    return this.vectorStore.asRetriever();
  }
}

export default VectorDB;
