class DocumentLoading {
  private static inistance: DocumentLoading = null;
  private documents: Set<string>;
  private documentListeners: Map<string, Set<Electron.WebContents>>;

  private constructor() {
    this.documents = new Set<string>();
    this.documentListeners = new Map<string, Set<Electron.WebContents>>();
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

  /**
   * Add a document to the list of documents being loaded.
   * @param documentId The id of the document being loaded.
   * @returns {void}
   */
  public addDocument(documentId: string): void {
    this.documents.add(documentId);
    const listeners = this.documentListeners.get(documentId);
    if (listeners) {
      for (const listener of listeners) {
        listener.send("document:loading", documentId);
      }
    }
  }

  /**
   * Delete a document from the list of documents being loaded.
   * @param documentId The id of the document being deleted.
   * @returns {void}
   */
  public deleteDocument(documentId: string): void {
    this.documents.delete(documentId);
    const listeners = this.documentListeners.get(documentId);
    if (listeners) {
      for (const listener of listeners) {
        listener.send("document:loaded", documentId);
      }
    }
  }

  /**
   * Listen to a document being loaded.
   * When the document is loaded, the listener will be sent document:loading.
   * When the document is deleted, the listener will be sent document:loaded.
   * @param documentId The id of the document to listen to.
   * @param webContents The webContents to send the message to.
   * @returns True if the document is loading, false otherwise.
   */
  public listenToDocument(
    documentId: string,
    webContents: Electron.WebContents
  ) {
    if (!this.documentListeners.has(documentId)) {
      this.documentListeners.set(documentId, new Set());
    }
    this.documentListeners.get(documentId).add(webContents);
    return this.isLoading(documentId);
  }

  /**
   * Remove a listener from a document.
   * @param documentId The id of the document to stop listening to.
   * @param webContents The webContents to remove from the listeners.
   * @returns True if the document is loading, false otherwise.
   */
  public stopListeningToDocument(
    documentId: string,
    webContents: Electron.WebContents
  ) {
    if (this.documentListeners.has(documentId)) {
      this.documentListeners.get(documentId).delete(webContents);
    }
    return this.isLoading(documentId);
  }

  /**
   * Check if a document is loading.
   * @param documentId The id of the document to check.
   * @returns True if the document is loading, false otherwise.
   */
  public isLoading(documentId: string) {
    return this.documents.has(documentId);
  }
}

const documentLoading = DocumentLoading.getInstance();

export default documentLoading;
