import { it, expect, beforeAll } from '@jest/globals';
import { createMemoryStorage } from './createMemoryStorage';
import type { StorageProvider } from '../../types/StorageProvider';

let storage: StorageProvider;

beforeAll(async () => {
  storage = createMemoryStorage()!;
  await storage.set('test', 100);
});

it('get value', async () => {
  expect(await storage.get('test')).toEqual(100);
});

it('remove value', async () => {
  await storage.remove('test');
  expect(await storage.get('test')).toEqual(undefined);
});
