import type { Options } from '../types/Options';
import { createMemoryStorage } from '../utils/createMemoryStorage/createMemoryStorage';

export const store: Options = {
  origin: 'api.emailjs.com',
  storageProvider: createMemoryStorage(),
};
