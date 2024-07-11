import type { StorageProvider } from './types/StorageProvider';
import { EmailJSResponseStatus } from './models/EmailJSResponseStatus';
import { init } from './methods/init/init';
import { send } from './methods/send/send';

export type { StorageProvider };

export { init, send, EmailJSResponseStatus };

export default {
  init,
  send,
  EmailJSResponseStatus,
};
