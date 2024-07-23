import { notifyLoadingDocument } from "./documentNotifier";

class DocumentLoading {
  private static inistance: DocumentLoading = null;
  private documents: Set<string>;

  private constructor() {
    this.documents = new Set<string>();
  }

  /**
   * Get the instance of DocumentLoading.
   * @returns {DocumentLoading} The instance of DocumentLoading.
   */
  static getInstance(): DocumentLoading {
    if (this.inistance === null) {
      this.inistance = new this();
    }
    return this.inistance;
  }

  public addDocument(courseId: string, documentId: string): void {
    const key = this.createKey(courseId, documentId);
    this.documents.add(key);
    notifyLoadingDocument(courseId, documentId, true);
  }

  public removeDocument(courseId: string, documentId: string): void {
    const key = this.createKey(courseId, documentId);
    this.documents.delete(key);
    notifyLoadingDocument(courseId, documentId, false);
  }

  public isLoading(courseId: string, documentId: string) {
    const key = this.createKey(courseId, documentId);
    return this.documents.has(key);
  }

  private createKey(courseId: string, documentId: string): string {
    return courseId + " " + documentId;
  }
}

const documentLoading = DocumentLoading.getInstance();

export default documentLoading;
