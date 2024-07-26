import { ProgressResponse } from "ollama";
import { Model } from "./types";

export const notifyDownloadingStatus = (status: ProgressResponse) => {
  // Not implemented
  console.log(status);
};

export const notifyModelsUpdate = (models: Model[]) => {
  // Not implemented
};
