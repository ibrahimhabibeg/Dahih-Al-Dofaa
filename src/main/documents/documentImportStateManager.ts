import Logger from "electron-log";
import { notifyDocumentImportUpdate } from "./notifier";

const inititalState: DocumentImportState = [
  {
    stage: "Initialize",
    progress: "Finished",
  },
  {
    stage: "Parse",
    progress: "Not Started",
  },
  {
    stage: "Generate Excerpts",
    progress: "Not Started",
  },
  {
    stage: "Save Excerpts",
    progress: "Not Started",
  },
];

class DocumentImportStateManager {
  private static instance: DocumentImportStateManager = null;

  public static getInstance(): DocumentImportStateManager {
    if (DocumentImportStateManager.instance === null) {
      DocumentImportStateManager.instance = new DocumentImportStateManager();
    }
    return DocumentImportStateManager.instance;
  }

  private documentStates: Map<string, DocumentImportState>;

  private constructor() {
    this.documentStates = new Map();
  }

  public getDocumentState(documentID: string): DocumentImportState {
    return this.documentStates.get(documentID);
  }

  public updateDocumentImportState(
    documentID: string,
    stage: DocumentImportStage,
    progress: DocumentImportProgress
  ) {
    Logger.info(
      `Updating document ${documentID} state to ${stage} - ${progress}`
    );
    if (!this.documentStates.has(documentID)) {
      this.addDocumentToImporting(documentID);
    }
    this.documentStates.set(
      documentID,
      this.documentStates.get(documentID).map((step) => {
        if (step.stage === stage) {
          return {
            ...step,
            progress,
          };
        }
        return step;
      })
    );
    notifyDocumentImportUpdate(documentID, this.documentStates.get(documentID));
  }

  public addDocumentToImporting(documentID: string) {
    Logger.info(`Adding document ${documentID} to importing`);
    this.documentStates.set(documentID, inititalState);
    notifyDocumentImportUpdate(documentID, inititalState);
  }

  public removeDocumentFromImporting(documentID: string) {
    Logger.info(`Removing document ${documentID} from importing`);
    this.documentStates.delete(documentID);
    notifyDocumentImportUpdate(documentID, null);
  }
}

const documentImportStateManager = DocumentImportStateManager.getInstance();

export default documentImportStateManager;
