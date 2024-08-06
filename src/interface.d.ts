import { IDocumentAPI } from "./renderer/preload/document";
import { IChatAPI } from "./renderer/preload/chat";
import { IMessageAPI } from "./renderer/preload/message";
import { ICourseAPI } from "./renderer/preload/course";
import { IOllamaAPI } from "./renderer/preload/ollama";
import { IModelAPI } from "./renderer/preload/model";

export interface IAPI {
  message: IMessageAPI;
  chat: IChatAPI;
  document: IDocumentAPI;
  course: ICourseAPI;
  ollama: IOllamaAPI;
  model: IModelAPI;
}

declare global {
  interface Window {
    api: IAPI;
  }

  type DocType = "pdf" | "docx" | "pptx" | "other";

  interface Doc {
    id: string;
    courseId: string;
    title: string;
    path: string;
    docType: DocType;
  }

  interface ChatType {
    id: string;
    title: string;
    latestActivity: Date;
  }

  interface Message {
    content: string;
    sender: "human" | "bot";
    citations: Citation[];
  }

  interface Citation {
    documentTitle: string;
    text: string;
  }

  type Course = Course;

  type ModelID =
    | "llama3.1:8b"
    | "gemma2:9b"
    | "mistral-nemo:12b"
    | "qwen2:0.5b"
    | "qwen2:1.5b"
    | "qwen2:7b"
    | "deepseek-coder-v2:16b"
    | "phi3:3.8b"
    | "phi3:14b"
    | "mistral:7b"
    | "codegemma:2b"
    | "codegemma:7b"
    | "nomic-embed-text:v1.5"
    | "mxbai-embed-large:335m";

  type ModelStatus = "downloading" | "downloaded" | "not downloaded";

  export type ModelType = "llm" | "embedding";

  /**
   * Model description
   * @param id - The name of the model in ollama including the parameter size
   * @param name - The name of the model. Not related to ollama name
   * @param description - A brief description of the model
   * @param size - The size of the model in MB
   * @param minimumRAM - The minimum RAM required to run the model in GB
   */
  type ModelDescription = {
    id: ModelID;
    name: string;
    description: string;
    size: number;
    minimumRAM: number;
    type: ModelType;
  };

  type Model = {
    id: ModelID;
    status: ModelStatus;
    description: ModelDescription;
    isSelectedLlm: boolean;
    isSelectedEmbedding: boolean;
  };

  interface Excerpt {
    text: string;
    documentTitle: string;
    courseId: string;
    documentId: string;
    embeddings: number[];
  }

  type DocumentImportState = Array<{
    stage: DocumentImportStage;
    progress: DocumentImportProgress;
    completed?: number;
    total?: number;
  }>;

  type DocumentImportStage =
    | "Initialize"
    | "Parse"
    | "Split"
    | "Embed"
    | "Save Excerpts";
  type DocumentImportProgress = "Not Started" | "In Progress" | "Finished";
}
