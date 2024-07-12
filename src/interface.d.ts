export interface IAPI {
  startOllama: () => Promise<void>;
  pullOllama: (model: string) => Promise<void>;
}

declare global {
  interface Window {
    api: IAPI;
  }
}
