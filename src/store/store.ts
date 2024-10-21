import type { Options } from '../types/Options.js';
import { createMemoryStorage } from '../utils/createMemoryStorage/createMemoryStorage.js';

export const store: Options = {
  origin: 'api.emailjs.com',
  storageProvider: createMemoryStorage(),
};
