import { store } from '../../store/store';
import type { Options } from '../../types/Options';

interface InitOptions extends Options {
  host?: string;
}

/**
 * Initiation
 * @param {InitOptions} options - set emailjs options
 */

export const init = (options: InitOptions): void => {
  store._publicKey = options.publicKey;
  store._privateKey = options.privateKey;
  store._host = options.host || 'api.emailjs.com';
};
