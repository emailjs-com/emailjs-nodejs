import { request, type RequestOptions } from 'https';

import { store } from '../store/store.js';
import { EmailJSResponseStatus } from '../models/emailjs_response_status.js';

export const sendJSON = (params: string): Promise<EmailJSResponseStatus> => {
  const options: RequestOptions = {
    host: store._host,
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
        const data = Buffer.concat(chunks).toString();

        if (res.statusCode === 200) {
          resolve(new EmailJSResponseStatus(res.statusCode, data));
        } else {
          reject(new EmailJSResponseStatus(res.statusCode, data));
        }
      });

      res.on('error', (error) => {
        reject(error);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (params) {
      req.write(params);
    }

    req.end();
  });
};
