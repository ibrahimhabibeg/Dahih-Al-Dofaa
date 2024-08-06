import path from "path";
import fs from "fs";
import { app } from "electron";
import { v4 as uuidv4 } from "uuid";
import { notifyCourseDocumentsUpdate, notifyDocumentsUpdate } from "./notifier";

class DocumentsDB {
  private static instance: DocumentsDB | null = null;

  /**
   * This function returns the instance of DocumentsDB.
   * If the instance does not exist, it creates a new instance.
   * @returns the instance of DocumentsDB
   */
  public static getInstance(): DocumentsDB {
    if (DocumentsDB.instance === null) {
      DocumentsDB.instance = DocumentsDB.createInstance();
    }
    return DocumentsDB.instance;
  }

  /**
   * This function creates a new instance of DocumentsDB
   * and writes an empty array to the file if it does not exist.
   * @returns a new instance of DocumentsDB
   */
  private static createInstance(): DocumentsDB {
    const filePath = DocumentsDB.generateFilePath();
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const documents = JSON.parse(fs.readFileSync(filePath).toString());
    return new DocumentsDB(documents, filePath);
  }

  private static generateFilePath(): string {
    const folderPath = path.join(app.getPath("userData"), "documents");
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    return path.join(folderPath, "documents.json");
  }

  private documents: Doc[];
  private filePath: string;

  private constructor(documents: Doc[], filePath: string) {
    this.documents = documents;
    this.filePath = filePath;
  }

  /**
   * This function creates a new document and stores it in the database.
   * It also saves the document to the documents directory.
   * @param documentPath The path of the document to be added
   * @param courseId The id of the course to which the document belongs
   * @returns the newly created document
   */
  public createDocument(documentPath: string, courseId: string): Doc {
    const docId = this.generateDocId();
    const docType = this.getDocType(documentPath);
    const title = this.extractTitle(documentPath);
    const path = this.saveDocumentToDocumentsDirectory(documentPath, docId);
    const newDocument: Doc = {
      id: docId,
      courseId,
      title,
      docType,
      path,
    };
    this.addDocument(newDocument);
    return newDocument;
  }

  private generateDocId(): string {
    return uuidv4();
  }

  private getDocType(documentPath: string): DocType {
    const extension = this.extractExtension(documentPath);
    switch (extension) {
      case ".pdf":
        return "pdf";
      case ".docx":
        return "docx";
      case ".pptx":
        return "pptx";
      default:
        "other";
    }
  }

  private extractExtension(documentPath: string): string {
    return path.extname(documentPath).toLowerCase();
  }

  private extractTitle(documentPath: string): string {
    return path.basename(documentPath, this.extractExtension(documentPath));
  }

  /**
   * This function saves the document to the documents directory.
   * @param documentPath the path of the document to be saved
   * @param docId the id of the document
   * @returns the path where the document is saved
   * @throws Error if the document cannot be saved
   */
  private saveDocumentToDocumentsDirectory(
    documentPath: string,
    docId: string
  ): string {
    const destination = path.join(
      app.getPath("userData"),
      "documents",
      docId + this.extractExtension(documentPath)
    );
    fs.copyFileSync(documentPath, destination);
    return destination;
  }

  public addDocument(document: Doc): void {
    this.updateDocuments([...this.documents, document]);
    notifyCourseDocumentsUpdate(
      document.courseId,
      this.getDocumentsByCourseId(document.courseId)
    );
  }

  public getDocumentsByCourseId(courseId: string): Doc[] {
    return this.documents.filter((doc) => doc.courseId === courseId);
  }

  public getDocumentById(docId: string): Doc | undefined {
    return this.documents.find((doc) => doc.id === docId);
  }

  public deleteDocument(docId: string): void {
    this.deletePhysicalDocument(docId);
    const document = this.getDocumentById(docId);
    if (document) {
      this.updateDocuments(this.documents.filter((doc) => doc.id !== docId));
      notifyCourseDocumentsUpdate(
        document.courseId,
        this.getDocumentsByCourseId(document.courseId)
      );
    }
  }

  private deletePhysicalDocument(docID: string): void {
    const document = this.getDocumentById(docID);
    if (document) {
      fs.unlinkSync(document.path);
    }
  }

  public deleteDocumentsByCourseId(courseId: string): void {
    const documents = this.getDocumentsByCourseId(courseId);
    for (const document of documents) {
      this.deleteDocument(document.id);
    }
    notifyCourseDocumentsUpdate(
      courseId,
      this.getDocumentsByCourseId(courseId)
    );
  }

  public renameDocument(docId: string, newName: string): void {
    const document = this.getDocumentById(docId);
    if (document) {
      this.updateDocuments(
        this.documents.map((doc) =>
          doc.id === docId ? { ...doc, title: newName } : doc
        )
      );
      notifyCourseDocumentsUpdate(
        document.courseId,
        this.getDocumentsByCourseId(document.courseId)
      );
    }
  }

  private updateDocuments(documents: Doc[]): void {
    this.documents = documents;
    notifyDocumentsUpdate(this.documents);
    this.saveDocumentsToFile();
  }

  private saveDocumentsToFile(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.documents));
  }
}

const documentsDB = DocumentsDB.getInstance();
export default documentsDB;
