import { it, expect, describe, jest } from '@jest/globals';
import { type RequestOptions } from 'https';
import emailjs, { send, init, EmailJSResponseStatus } from './index.js';

jest.mock('https', () => ({
  ...jest.requireActual<typeof import('https')>('https'),
  request: jest.fn((_: RequestOptions, cb: (res: any) => void) =>
    cb({
      on: (_: string, cb: (chunk: any) => void) => cb(Buffer.from('OK', 'utf8')),
      statusCode: 200,
    }),
  ),
  on: jest.fn(),
  write: jest.fn(),
  end: jest.fn(),
}));

it('should export necessary methods and models', () => {
  expect(init).toBeDefined();
  expect(send).toBeDefined();
  expect(EmailJSResponseStatus).toBeDefined();
});

describe('send method', () => {
  it('should call the init and the send method successfully', async () => {
    emailjs.init({
      publicKey: 'LC2JWGTestKeySomething',
      privateKey: 'PrKeyTestKeySomething',
    });

    try {
      const result = await emailjs.send('default_service', 'my_test_template');
      expect(result).toEqual({ status: 200, text: 'OK' });
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('should call the init and the send method successfully as promise', () => {
    emailjs.init({
      publicKey: 'LC2JWGTestKeySomething',
      privateKey: 'PrKeyTestKeySomething',
    });

    return emailjs.send('default_service', 'my_test_template').then(
      (result) => {
        expect(result).toEqual({ status: 200, text: 'OK' });
      },
      (error) => {
        expect(error).toBeUndefined();
      },
    );
  });
});
