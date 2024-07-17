import path from "path";
import fs from "fs";
import { app } from "electron";

class TextIdsDB {
  private static instancesMap: Map<string, TextIdsDB> = new Map();
  private docToText: { [key: string]: string[] };
  private filePath: string;

  private constructor(courseId: string) {
    const folderPath = path.join(app.getPath("userData"), "courses", courseId);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    const filePath = path.join(folderPath, "documents.json");
    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath, "utf-8");
      const docToText = JSON.parse(file);
      this.docToText = docToText;
    } else {
      fs.writeFileSync(filePath, JSON.stringify({}));
      this.docToText = {};
    }
    this.filePath = filePath;
  }

  static getInstance(courseId: string) {
    let instance = this.instancesMap.get(courseId);
    if (!instance) {
      instance = new TextIdsDB(courseId);
      this.instancesMap.set(courseId, instance);
    }
    return instance;
  }

  public saveText(textIds: string[], documentId: string) {
    if (!this.docToText[documentId]) {
      this.docToText[documentId] = [];
    }
    this.docToText[documentId].push(...textIds);
    this.save();
  }

  public getTextIds(documentId: string) {
    return this.docToText[documentId] || [];
  }

  public deleteDocument(documentId: string) {
    delete this.docToText[documentId];
    this.save();
  }

  private save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.docToText));
  }
}

export default TextIdsDB;
