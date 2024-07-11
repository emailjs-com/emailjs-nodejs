import type { StorageProvider } from '../../types/StorageProvider';

class MemoryStorage {
  private store: Record<string, number> = {};

  public get(key: string): number {
    return this.store[key];
  }

  public set(key: string, value: number): void {
    this.store[key] = value;
  }

  public remove(key: string): void {
    delete this.store[key];
  }
}

export const createMemoryStorage = (): StorageProvider | undefined => {
  const memoryStorage = new MemoryStorage();

  return {
    get: (key) => Promise.resolve(memoryStorage.get(key)),
    set: (key, value) => Promise.resolve(memoryStorage.set(key, value)),
    remove: (key) => Promise.resolve(memoryStorage.remove(key)),
  };
};
