import { ModelResponse, Ollama } from "ollama";
import { ModelID, Model, ModelStatus } from "./types";
import { modelsDescription, isLLMModelId, isEmbeddingModelId } from "./models";
import { notifyDownloadingStatus, notifyModelsUpdate } from "./notifier";
import log from "../utils/log";
import { app } from "electron";
import path from "path";
import fs from "fs";
import { getOllamaHost } from "../ollama";

class ModelsManager {
  private static instance: ModelsManager;
  private inititalOnDeviceModels: ModelResponse[];
  private ollama: Ollama;
  private downloaingModelsAbort: Map<ModelID, () => void>;
  private models: Model[];
  private selectedLLM: ModelID;
  private selectedEmbedding: ModelID;
  private selectedLLMFilePath: string;
  private selectedEmbeddingFilePath: string;

  private constructor() {
    this.ollama = new Ollama({ host: getOllamaHost() });
    this.downloaingModelsAbort = new Map();
    this.selectedLLMFilePath = path.join(
      app.getPath("userData"),
      "selectedLLM.txt"
    );
    if (!fs.existsSync(this.selectedLLMFilePath)) {
      fs.writeFileSync(this.selectedLLMFilePath, "");
    }
    this.selectedEmbeddingFilePath = path.join(
      app.getPath("userData"),
      "selectedEmbedding.txt"
    );
    if (!fs.existsSync(this.selectedEmbeddingFilePath)) {
      fs.writeFileSync(this.selectedEmbeddingFilePath, "");
    }
  }

  public static async getInstance(): Promise<ModelsManager> {
    if (!ModelsManager.instance) {
      ModelsManager.instance = new ModelsManager();
      await ModelsManager.instance.init();
    }
    return ModelsManager.instance;
  }

  private async init() {
    await this.getInitialOnDeviceModels();
    this.initializeSelectedLLM();
    this.initializeSelectedEmbedding();
    this.initializeModels();
  }

  private initializeSelectedLLM(): void {
    const llm = fs.readFileSync(this.selectedLLMFilePath, "utf-8");
    if (!isLLMModelId(llm)) {
      log(`Invalid LLM model ${llm}`);
      fs.writeFileSync(this.selectedLLMFilePath, "");
      this.selectedLLM = null;
      return;
    }
    const status = this.getInitialModelStatus(llm);
    if (status !== "downloaded") {
      log(`LLM model ${llm} is not downloaded`);
      fs.writeFileSync(this.selectedLLMFilePath, "");
      this.selectedLLM = null;
      return;
    }
    log(`Selected LLM model: ${llm}`);
    this.selectedLLM = llm;
  }

  private initializeSelectedEmbedding(): void {
    const embedding = fs.readFileSync(this.selectedEmbeddingFilePath, "utf-8");
    if (!isEmbeddingModelId(embedding)) {
      log(`Invalid embedding model ${embedding}`);
      fs.writeFileSync(this.selectedLLMFilePath, "");
      this.selectedEmbedding = null;
      return;
    }
    const status = this.getInitialModelStatus(embedding);
    if (status !== "downloaded") {
      log(`Embedding model ${embedding} is not downloaded`);
      fs.writeFileSync(this.selectedLLMFilePath, "");
      this.selectedEmbedding = null;
      return;
    }
    log(`Selected embedding model: ${embedding}`);
    this.selectedEmbedding = embedding;
  }

  private initializeModels(): void {
    const models: Model[] = [];
    for (const description of modelsDescription) {
      const status = this.getInitialModelStatus(description.id);
      const isSelectedLlm =
        description.id === this.selectedLLM && description.type === "llm";
      const isSelectedEmbedding =
        description.id === this.selectedEmbedding &&
        description.type === "embedding";
      models.push({
        id: description.id,
        status,
        description,
        isSelectedLlm: isSelectedLlm,
        isSelectedEmbedding: isSelectedEmbedding,
      });
    }
    this.models = models;
  }

  private getInitialModelStatus(modelId: ModelID): ModelStatus {
    for (const model of this.inititalOnDeviceModels)
      if (model.name.startsWith(modelId)) return "downloaded";
    return "not downloaded";
  }

  private async getInitialOnDeviceModels(): Promise<void> {
    const { models } = await this.ollama.list();
    this.inititalOnDeviceModels = models;
  }

  public downloadModel(modelId: ModelID): void {
    if (
      this.models.find((model) => model.id === modelId).status !==
      "not downloaded"
    ) {
      log(`Model ${modelId} is already downloaded`);
      return;
    }
    log(`Downloading model ${modelId}`);
    this.ollama.pull({ model: modelId, stream: true }).then(async (stream) => {
      this.downloaingModelsAbort.set(modelId, () => stream.abort());
      try {
        this.setModelStatus(modelId, "downloading");
        for await (const chunk of stream) {
          notifyDownloadingStatus(chunk);
        }
        this.downloaingModelsAbort.delete(modelId);
        this.setModelStatus(modelId, "downloaded");
      } catch (error) {
        log(`Error downloading model ${modelId}`);
        this.setModelStatus(modelId, "not downloaded");
        this.downloaingModelsAbort.delete(modelId);
      }
    });
  }

  public abortDownloadingModel(modelId: ModelID): void {
    const abort = this.downloaingModelsAbort.get(modelId);
    log(`Aborting downloading model ${modelId}`);
    if (abort) {
      abort();
      this.downloaingModelsAbort.delete(modelId);
      this.setModelStatus(modelId, "not downloaded");
    } else {
      log(`Model ${modelId} is not downloading`);
    }
  }

  public deleteModel(modelId: ModelID): void {
    log(`Deleting model ${modelId}`);
    this.ollama.delete({ model: modelId }).then(() => {
      this.setModelStatus(modelId, "not downloaded");
    });
  }

  public getModels(): Model[] {
    return this.models;
  }

  public getSelectedLLM(): ModelID {
    return this.selectedLLM;
  }

  public getSelectedEmbedding(): ModelID {
    return this.selectedEmbedding;
  }

  public selectLLM(modelId: ModelID): void {
    const isDownloaded =
      this.models.find((model) => model.id === modelId).status === "downloaded";
    if (!isDownloaded) {
      log(`Model ${modelId} is not downloaded`);
      return;
    }
    const previousSelectedLLM = this.selectedLLM;
    this.selectedLLM = modelId;
    fs.writeFileSync(this.selectedLLMFilePath, modelId);
    this.setModels(
      this.models.map((model) =>
        model.id === previousSelectedLLM
          ? { ...model, isSelectedLlm: false }
          : model.id === modelId
          ? { ...model, isSelectedLlm: true }
          : model
      )
    );
  }

  public selectEmbedding(modelId: ModelID): void {
    const isDownloaded =
      this.models.find((model) => model.id === modelId).status === "downloaded";
    if (!isDownloaded) {
      log(`Model ${modelId} is not downloaded`);
      return;
    }
    const previousSelectedEmbedding = this.selectedEmbedding;
    this.selectedEmbedding = modelId;
    fs.writeFileSync(this.selectedEmbeddingFilePath, modelId);
    this.setModels(
      this.models.map((model) =>
        model.id === previousSelectedEmbedding
          ? { ...model, isSelectedEmbedding: false }
          : model.id === modelId
          ? { ...model, isSelectedLlm: true }
          : model
      )
    );
  }

  private setModelStatus(modelId: ModelID, status: ModelStatus): void {
    this.setModels(
      this.models.map((model) =>
        model.id === modelId ? { ...model, status } : model
      )
    );
  }

  private setModels(models: Model[]): void {
    this.models = models;
    notifyModelsUpdate(models);
  }
}

export default ModelsManager;
