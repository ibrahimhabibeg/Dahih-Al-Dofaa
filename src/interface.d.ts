import { Course } from "./main/courses/courses";

interface IModelAPI {
  getAll: () => Promise<Model[]>;
  subscribeToAll: (
    listener: (_event: IpcRendererEvent, models: Model[]) => void
  ) => void;
  unsubscribeFromAll: () => void;
  subscribeToDownloadProgress: (
    modelId: string,
    listener: (_event: IpcRendererEvent, status: ProgressResponse) => void
  ) => void;
  unsubscribeFromDownloadProgress: (modelId: string) => void;
  download: (modelId: string) => void;
  abortDownloading: (modelId: string) => void;
  delete: (modelId: string) => void;
  setSelectedEmbedding: (modelId: string) => void;
  setSelectedLLM: (modelId: string) => void;
}

interface IMessageAPI {
  getMessages: (courseId: string, chatId: string) => Promise<Message[]>;
  isLoadingMessage: (courseId: string, chatId: string) => Promise<boolean>;
  sendMessage: (courseId: string, chatId: string, message: string) => void;
  subscribeToIsLoadingMessage: (
    courseId: string,
    chatId: string,
    listener: (_event: IpcRendererEvent, isLoading: boolean) => void
  ) => void;
  unsubscribeFromIsLoadingMessage: (courseId: string, chatId: string) => void;
  subscribeToCompleteMessage: (
    courseId: string,
    chatId: string,
    listener: (_event: IpcRendererEvent, message: Message) => void
  ) => void;
  unsubscribeFromCompleteMessage: (courseId: string, chatId: string) => void;
  subscribeToPartialMessage: (
    courseId: string,
    chatId: string,
    listener: (_event: IpcRendererEvent, message: string) => void
  ) => void;
  unsubscribeFromPartialMessage: (courseId: string, chatId: string) => void;
}

interface IChatAPI {
  subscribeToChats: (
    courseId: string,
    listener: (_event: IpcRendererEvent, chats: ChatType[]) => void
  ) => void;
  unsubscribeFromChats: (courseId: string) => void;
  getChats: (courseId: string) => Promise<ChatType[]>;
  addChat: (courseId: string, chatName?: string) => Promise<ChatType>;
  removeChat: (courseId: string, chatId: string) => Promise<ChatType[]>;
  getChat: (courseId: string, chatId: string) => Promise<ChatType>;
  renameChat: (
    courseId: string,
    chatId: string,
    newTitle: string
  ) => Promise<void>;
}

interface IDocumentAPI {
  get: (courseId: string, docId: string) => Promise<Doc>;
  getAll: (courseId: string) => Promise<Doc[]>;
  add: (courseId: string) => Promise<void>;
  rename: (courseId: string, docId: string, newTitle: string) => Promise<void>;
  delete: (courseId: string, docId: string) => Promise<void>;
  isLoading: (courseId: string, documentId: string) => Promise<boolean>;
  subscribeToIsLoading: (
    courseId: string,
    docId: string,
    listener: (_event: IpcRendererEvent, isLoading: boolean) => void
  ) => void;
  unsubscribeFromIsLoading: (courseId: string, docId: string) => void;
  subscribeToAllDocuments: (
    courseId: string,
    listener: (_event: IpcRendererEvent, documents: Doc[]) => void
  ) => void;
  unsubscribeFromAllDocuments: (courseId: string) => void;
}

interface ICourseAPI {
  get: (courseId: string) => Promise<Course>;
  getAll: () => Promise<Course[]>;
  add: (courseTitle: string) => Promise<void>;
  delete: (courseId: string) => Promise<void>;
  rename: (courseId: string, courseTitle: string) => Promise<void>;
  subscribeToCourse: (
    courseId: string,
    listener: (_event: IpcRendererEvent, course: Course) => void
  ) => void;
  unsubscribeFromCourse: (courseId: string) => void;
  subscribeToAllCourses: (
    listener: (_event: IpcRendererEvent, courses: Course[]) => void
  ) => void;
  unsubscribeFromAllCourses: () => void;
}

interface IOllamAPI {
  isReady: () => Promise<boolean>;
  subscribeToReady: (listener: (_event: IpcRendererEvent) => void) => void;
  unsubscribeFromReady: () => void;
}

export interface IAPI {
  message: IMessageAPI;
  chat: IChatAPI;
  document: IDocumentAPI;
  course: ICourseAPI;
  ollama: IOllamAPI;
  model: IModelAPI;
}

declare global {
  interface Window {
    api: IAPI;
  }

  type DocType = "pdf" | "docx" | "pptx";

  interface Doc {
    id: string;
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
    refrencedTexts: RefrencedText[];
  }

  interface RefrencedText {
    text: string;
    documentId: string;
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
}
