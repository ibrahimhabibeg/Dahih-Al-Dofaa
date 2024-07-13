import path from "path";
import fs from "fs";
import { app } from "electron";
import { v4 as uuidv4 } from "uuid";

export type DocType = "pdf" | "ppt" | "txt" | "md" | "docx";
const validExtensions = ["pdf", "ppt", "txt", "md", "docx"];

export type Document = {
  id: string;
  title: string;
  path: string;
  courseId: string;
  docType: DocType;
};

/**
 * This class manages the documents in the application.
 */
class DocDB {
  static instance: DocDB = null;
  documents: Document[];
  filePath: string;

  constructor(documents: Document[], filePath: string) {
    this.documents = documents;
    this.filePath = filePath;
  }

  static getInstance() {
    if (!this.instance) {
      const filePath = path.join(app.getPath("userData"), "documents.json");
      if (fs.existsSync(filePath)) {
        const file = fs.readFileSync(filePath, "utf-8");
        const { documents } = JSON.parse(file);
        this.instance = new this(documents, filePath);
      } else {
        fs.writeFileSync(filePath, JSON.stringify({ documents: [] }));
        this.instance = new this([], filePath);
      }
    }
    return this.instance;
  }

  addDocument(path: string, courseId: string) {
    const document = {
      id: uuidv4(),
      title: this.extractTitle(path),
      path,
      courseId,
      docType: this.extractExtension(path),
    };
    this.documents.push(document);
    this.save();
    return this.documents;
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
    this.documents = this.documents.filter((doc) => doc.id !== documentId);
    this.save();
    return this.documents;
  }

  renameDocument(documentId: string, newTitle: string) {
    this.documents = this.documents.map((doc) => {
      if (doc.id === documentId) {
        return { ...doc, title: newTitle };
      }
      return doc;
    });
    this.save();
    return this.documents;
  }

  getDocuments(courseId: string) {
    return this.documents.filter((doc) => doc.courseId === courseId);
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

export const addDocument = async (path: string, courseId: string) => {
  const db = DocDB.getInstance();
  return db.addDocument(path, courseId);
};

export const deleteDocument = async (documentId: string) => {
  const db = DocDB.getInstance();
  return db.deleteDocument(documentId);
};

export const renameDocument = async (documentId: string, newTitle: string) => {
  const db = DocDB.getInstance();
  return db.renameDocument(documentId, newTitle);
};
