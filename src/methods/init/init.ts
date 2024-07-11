import { store } from '../../store/store';
import type { Options } from '../../types/Options';

/**
 * EmailJS global SDK config
 * @param {object} options - the EmailJS global SDK config options
 * @param {string} origin - the non-default EmailJS origin
 */
export const init = (options: Options, origin: string = 'api.emailjs.com'): void => {
  if (!options) return;

  store.publicKey = options.publicKey;
  store.privateKey = options.privateKey;
  store.storageProvider = options.storageProvider;
  store.blockList = options.blockList;
  store.limitRate = options.limitRate;
  store.origin = options.origin || origin;
};
