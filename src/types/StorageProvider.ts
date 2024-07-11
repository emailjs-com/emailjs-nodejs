export interface StorageProvider {
  get: (key: string) => Promise<number | null | undefined>;
  set: (key: string, value: number) => Promise<void>;
  remove: (key: string) => Promise<void>;
}
