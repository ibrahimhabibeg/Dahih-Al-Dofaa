import path from "path";
import fs from "fs";
import { app } from "electron";
import { v4 as uuidv4 } from "uuid";
import { validExtensions } from ".";
import { notifyDocumentsUpdate } from "./documentNotifier";

/**
 * This class manages the documents in the application.
 */
class DocDB {
  private static instancesMap: Map<string, DocDB> = new Map();
  private documents: Doc[];
  private filePath: string;
  private documentsFolderPath: string;
  private courseID: string;

  private constructor(courseId: string) {
    this.courseID = courseId;
    const folderPath = path.join(app.getPath("userData"), "courses", courseId);
    const documentsFolderPath = path.join(folderPath, "documents");
    if (!fs.existsSync(documentsFolderPath)) {
      fs.mkdirSync(documentsFolderPath, { recursive: true });
    }
    const filePath = path.join(folderPath, "documents.json");
    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath, "utf-8");
      const { documents } = JSON.parse(file);
      this.documents = documents;
    } else {
      fs.writeFileSync(filePath, JSON.stringify({ documents: [] }));
      this.documents = [];
    }
    this.filePath = filePath;
    this.documentsFolderPath = documentsFolderPath;
  }

  static getInstance(courseId: string) {
    let instance = this.instancesMap.get(courseId);
    if (!instance) {
      instance = new DocDB(courseId);
      this.instancesMap.set(courseId, instance);
    }
    return instance;
  }

  addDocument(path: string) {
    const id = uuidv4();
    const newPath = this.copyDocument(id, path);
    const document = {
      id,
      title: this.extractTitle(path),
      path: newPath,
      docType: this.extractExtension(path),
    };
    this.documents.push(document);
    this.save();
    notifyDocumentsUpdate(this.courseID, this.documents);
    return { documents: this.documents, document };
  }

  private copyDocument(id: string, originalPath: string) {
    const newPath = path.join(
      this.documentsFolderPath,
      id + "." + this.extractExtension(originalPath)
    );
    fs.copyFileSync(originalPath, newPath);
    return newPath;
  }

  private extractExtension(path: string): DocType {
    const parts = path.split(".");
    const extension = parts[parts.length - 1];
    if (!validExtensions.includes(extension)) {
      throw new Error("Invalid document type");
    }
    return parts[parts.length - 1] as DocType;
  }

  private extractTitle(path: string): string {
    const parts = path.split("/");
    const nameWithExtension = parts[parts.length - 1];
    const nameParts = nameWithExtension.split(".");
    const title = nameParts.slice(0, nameParts.length - 1).join(".");
    return title;
  }

  deleteDocument(documentId: string) {
    const document = this.documents.find((doc) => doc.id === documentId);
    if (document) {
      this.deleteFile(document.path);
    }
    this.documents = this.documents.filter((doc) => doc.id !== documentId);
    this.save();
    notifyDocumentsUpdate(this.courseID, this.documents);
    return this.documents;
  }

  private deleteFile(path: string) {
    if (fs.existsSync(path)) fs.unlinkSync(path);
  }

  renameDocument(documentId: string, newTitle: string) {
    this.documents = this.documents.map((doc) => {
      if (doc.id === documentId) {
        return { ...doc, title: newTitle };
      }
      return doc;
    });
    this.save();
    notifyDocumentsUpdate(this.courseID, this.documents);
    return this.documents;
  }

  getDocuments() {
    return this.documents;
  }

  getDocument(documentId: string) {
    return this.documents.find((doc) => doc.id === documentId);
  }

  private save() {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify({ documents: this.documents })
    );
  }
}

export default DocDB;
