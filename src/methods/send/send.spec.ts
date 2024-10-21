import { it, expect, jest } from '@jest/globals';
import { request, type RequestOptions } from 'https';

import { send } from './send.js';
import emailjs from '../../index.js';

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

it('should call the send method and fail on the public key', () => {
  send('default_service', 'my_test_template', {}, {}).catch((error) => {
    expect(error).toMatch('The public key is required');
  });
});

it('should call the send method and fail on the service ID', () => {
  send('', 'my_test_template', undefined, {
    publicKey: 'C2JWGTestKeySomething',
    privateKey: 'PrKeyTestKeySomething',
  }).catch((error) => {
    expect(error).toMatch('The service ID is required');
  });
});

it('should call the send method and fail on the template ID', () => {
  send('default_service', '', undefined, {
    publicKey: 'C2JWGTestKeySomething',
    privateKey: 'PrKeyTestKeySomething',
  }).catch((error) => {
    expect(error).toMatch('The template ID is required');
  });
});

it('should call the send method and fail on blocklist', async () => {
  try {
    const result = await send(
      'default_service',
      'my_test_template',
      {
        email: 'bar@emailjs.com',
      },
      {
        publicKey: 'C2JWGTestKeySomething',
        privateKey: 'PrKeyTestKeySomething',
        blockList: {
          list: ['foo@emailjs.com', 'bar@emailjs.com'],
          watchVariable: 'email',
        },
      },
    );
    expect(result).toBeUndefined();
  } catch (error) {
    expect(error).toEqual({
      status: 403,
      text: 'Forbidden',
    });
  }
});

it('should call the send method and fail on blocklist as promise', () => {
  return send(
    'default_service',
    'my_test_template',
    {
      email: 'bar@emailjs.com',
    },
    {
      publicKey: 'C2JWGTestKeySomething',
      privateKey: 'PrKeyTestKeySomething',
      blockList: {
        list: ['foo@emailjs.com', 'bar@emailjs.com'],
        watchVariable: 'email',
      },
    },
  ).then(
    (result) => {
      expect(result).toBeUndefined();
    },
    (error) => {
      expect(error).toEqual({
        status: 403,
        text: 'Forbidden',
      });
    },
  );
});

it('should call the send method and fail on limit rate', async () => {
  const sendEmail = () =>
    send('default_service', 'my_test_template', undefined, {
      publicKey: 'C2JWGTestKeySomething',
      privateKey: 'PrKeyTestKeySomething',
      limitRate: {
        id: 'async-send',
        throttle: 100,
      },
    });

  try {
    const result = await sendEmail();
    expect(result).toEqual({ status: 200, text: 'OK' });
  } catch (error) {
    expect(error).toBeUndefined();
  }

  try {
    const result = await sendEmail();
    expect(result).toBeUndefined();
  } catch (error) {
    expect(error).toEqual({
      status: 429,
      text: 'Too Many Requests',
    });
  }
});

it('should call the send method and fail on limit rate as promise', () => {
  const sendEmail = () =>
    send('default_service', 'my_test_template', undefined, {
      publicKey: 'C2JWGTestKeySomething',
      privateKey: 'PrKeyTestKeySomething',
      limitRate: {
        id: 'promise-send',
        throttle: 100,
      },
    });

  return sendEmail().then(
    (result) => {
      expect(result).toEqual({ status: 200, text: 'OK' });

      return sendEmail().then(
        (result) => {
          expect(result).toBeUndefined();
        },
        (error) => {
          expect(error).toEqual({
            status: 429,
            text: 'Too Many Requests',
          });
        },
      );
    },
    (error) => {
      expect(error).toBeUndefined();
    },
  );
});

it('should call the send method successfully with 4 params', async () => {
  try {
    const result = await send(
      'default_service',
      'my_test_template',
      {},
      {
        publicKey: 'C2JWGTestKeySomething',
        privateKey: 'PrKeyTestKeySomething',
      },
    );
    expect(result).toEqual({ status: 200, text: 'OK' });
  } catch (error) {
    expect(error).toBeUndefined();
  }
});

it('should call the send method as promise', () => {
  return send(
    'default_service',
    'my_test_template',
    {},
    {
      publicKey: 'C2JWGTestKeySomething',
      privateKey: 'PrKeyTestKeySomething',
    },
  ).then(
    (result) => {
      expect(result).toEqual({ status: 200, text: 'OK' });
    },
    (error) => {
      expect(error).toBeUndefined();
    },
  );
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
