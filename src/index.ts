import type { StorageProvider } from './types/StorageProvider.js';
import { EmailJSResponseStatus } from './models/EmailJSResponseStatus.js';
import { init } from './methods/init/init.js';
import { send } from './methods/send/send.js';

export type { StorageProvider };

export { init, send, EmailJSResponseStatus };

export default {
  init,
  send,
  EmailJSResponseStatus,
};
