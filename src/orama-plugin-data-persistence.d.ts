// types/orama-plugin-data-persistence.d.ts
declare module "@orama/plugin-data-persistence/server" {
  export type Runtime = "deno" | "node" | "bun" | "browser" | "unknown";
  export type PersistenceFormat = "json" | "dpack" | "binary";
  export declare const DEFAULT_DB_NAME: string;
  export declare function persistToFile<T extends AnyOrama>(
    db: T,
    format?: PersistenceFormat,
    path?: string,
    runtime?: Runtime
  ): Promise<string>;
  export declare function restoreFromFile<T extends AnyOrama>(
    format?: PersistenceFormat,
    path?: string,
    runtime?: Runtime
  ): Promise<T>;
  export declare function getDefaultFileName(
    format: PersistenceFormat,
    runtime?: Runtime
  ): Promise<string>;
}
