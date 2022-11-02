import { store } from '../../store/store';

/**
 * Initiation
 * @param {string} publicKey - set the EmailJS public key
 * @param {string} origin - set the EmailJS origin
 */

export const init = (publicKey: string, origin = 'api.emailjs.com'): void => {
  store._userID = publicKey;
  store._origin = origin;
};
