export interface IAPI {
  startOllama: () => Promise<void>;
}

declare global {
  interface Window {
    api: IAPI;
  }
}
