import { request, type RequestOptions } from 'https';

import { store } from '../store/store';
import { EmailJSResponseStatus } from '../models/EmailJSResponseStatus';

export const sendPost = (data: string): Promise<EmailJSResponseStatus> => {
  const options: RequestOptions = {
    host: store.origin,
    path: '/api/v1.0/email/send',
    port: 443,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = request(options, (res) => {
      const chunks = [] as Uint8Array[];

      res.on('data', (chunk: Uint8Array) => chunks.push(chunk));

      res.on('end', () => {
        const message = Buffer.concat(chunks).toString();
        const responseStatus = new EmailJSResponseStatus(res.statusCode, message);

        if (res.statusCode === 200) {
          resolve(responseStatus);
        } else {
          reject(responseStatus);
        }
      });

      res.on('error', (error) => {
        reject(error);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(data);
    }

    req.end();
  });
};
