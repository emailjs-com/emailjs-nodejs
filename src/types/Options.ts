import type { BlockList } from './BlockList.js';
import type { LimitRate } from './LimitRate.js';
import type { StorageProvider } from './StorageProvider.js';

export interface Options {
  origin?: string;
  publicKey?: string;
  privateKey?: string;
  blockList?: BlockList;
  limitRate?: LimitRate;
  storageProvider?: StorageProvider;
}
