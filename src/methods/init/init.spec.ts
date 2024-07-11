import { it, expect, beforeEach } from '@jest/globals';

import { init } from './init';
import { store } from '../../store/store';

beforeEach(() => {
  store.origin = 'https://api.emailjs.com';
  store.publicKey = undefined;
  store.storageProvider = undefined;
});

it('should call the init method with empty options and get default values', () => {
  init({});

  expect(store).toEqual({
    origin: 'api.emailjs.com',
  });
});

it('should call the init method with custom options', () => {
  init({
    publicKey: 'C2JWGTestKeySomething',
    privateKey: 'privateC2JWGTestKeySomething',
    blockList: {
      list: ['block@email.com'],
    },
    limitRate: {
      throttle: 10000,
    },
  });

  expect(store).toEqual({
    origin: 'api.emailjs.com',
    publicKey: 'C2JWGTestKeySomething',
    privateKey: 'privateC2JWGTestKeySomething',
    blockList: {
      list: ['block@email.com'],
    },
    limitRate: {
      throttle: 10000,
    },
    storageProvider: undefined,
  });
});
