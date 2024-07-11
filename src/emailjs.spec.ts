import { it, expect, describe, jest } from '@jest/globals';
import { type RequestOptions, request } from 'https';
import emailjs, { send, init, EmailJSResponseStatus } from './emailjs.js';

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

describe('required params validator', () => {
  it('should send method and fail on the public key', () => {
    expect(() => emailjs.send('default_service', 'my_test_template')).toThrow(
      'The public key is required',
    );
  });

  it('should send method and fail on the service ID', () => {
    emailjs.init({
      publicKey: 'LC2JWGTestKeySomething',
    });

    expect(() => emailjs.send('', 'my_test_template')).toThrow('The service ID is required');
  });

  it('should send method and fail on the template ID', () => {
    emailjs.init({
      publicKey: 'LC2JWGTestKeySomething',
    });

    expect(() => emailjs.send('default_service', '')).toThrow('The template ID is required');
  });
});

describe('emailjs.send method', () => {
  it('should init and send method successfully', async () => {
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

  it('should send method successfully with 4 params', async () => {
    try {
      const result = await emailjs.send(
        'default_service',
        'my_test_template',
        {},
        {
          publicKey: 'LC2JWGTestKeySomething',
          privateKey: 'PrKeyTestKeySomething',
        },
      );
      expect(result).toEqual({ status: 200, text: 'OK' });
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('should send method and fail', async () => {
    (request as jest.Mock<any>).mockImplementationOnce((_: RequestOptions, cb: (res: any) => void) =>
      cb({
        on: (_: string, cb: (chunk: any) => void) =>
          cb(Buffer.from('The Public Key is required', 'utf8')),
        statusCode: 403,
      }),
    );

    try {
      const result = await emailjs.send(
        'default_service',
        'my_test_template',
        {},
        {
          publicKey: 'LC2JWGTestKeySomething',
          privateKey: 'PrKeyTestKeySomething',
        },
      );
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toEqual({
        status: 403,
        text: 'The Public Key is required',
      });
    }
  });
});
