# Official EmailJS SDK for Node.js

SDK for [EmailJS.com](https://www.emailjs.com) customers.
\
Use you EmailJS account for sending emails.

[![codecov](https://codecov.io/gh/emailjs-com/emailjs-nodejs/branch/main/graph/badge.svg)](https://codecov.io/gh/emailjs-com/emailjs-nodejs)
[![npm version](https://img.shields.io/npm/v/@emailjs/nodejs.svg)](https://www.npmjs.com/package/@emailjs/nodejs)

## Disclaimer

This is a NodeJS-only version, otherwise use
- [Browser SDK](https://www.npmjs.com/package/@emailjs/browser)
- [Flutter SDK](https://pub.dev/packages/emailjs)
- [REST API](https://www.emailjs.com/docs/rest-api/send/)

## Links

[Official SDK Docs](https://www.emailjs.com/docs)

## Intro

EmailJS helps to send emails directly from your code.
No large knowledge is required – just connect EmailJS to one of the supported
email services, create an email template, and use our SDK
to trigger an email.

## Usage

Install EmailJS SDK using [npm](https://www.npmjs.com/):

```bash
$ npm install @emailjs/nodejs
```

***Note***: By default, API requests are disabled for non-browser applications.
You need to activate them through [Account:Security](https://dashboard.emailjs.com/admin/account/security).

## FAQ

#### API calls are disabled for non-browser applications
You need to activate API requests
through [Account:Security](https://dashboard.emailjs.com/admin/account/security).

## Examples

### ECMAScript modules

**send email**

```js
import emailjs from '@emailjs/nodejs';

const templateParams = {
  name: 'James',
  notes: 'Check this out!',
};

emailjs
  .send('<YOUR_SERVICE_ID>', '<YOUR_TEMPLATE_ID>', templateParams, {
    publicKey: '<YOUR_PUBLIC_KEY>',
    privateKey: '<YOUR_PRIVATE_KEY>', // optional, highly recommended for security reasons
  })
  .then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (err) => {
      console.log('FAILED...', err);
    },
  );
```

**init (optional)**

```js
import emailjs from '@emailjs/nodejs';

// set Public Key as global settings
emailjs.init({
  publicKey: '<YOUR_PUBLIC_KEY>',
  privateKey: '<YOUR_PRIVATE_KEY>', // optional, highly recommended for security reasons
});

emailjs.send('<YOUR_SERVICE_ID>', '<YOUR_TEMPLATE_ID>').then(
  (response) => {
    console.log('SUCCESS!', response.status, response.text);
  },
  (err) => {
    console.log('FAILED...', err);
  },
);
```

**await/async with EmailJS error handler**

```js
import emailjs, { EmailJSResponseStatus } from '@emailjs/nodejs';

try {
  await emailjs.send(
    '<YOUR_SERVICE_ID>',
    '<YOUR_TEMPLATE_ID>',
    {},
    {
      publicKey: '<YOUR_PUBLIC_KEY>',
      privateKey: '<YOUR_PRIVATE_KEY>', // optional, highly recommended for security reasons
    },
  );
  console.log('SUCCESS!');
} catch (err) {
  if (err instanceof EmailJSResponseStatus) {
    console.log('EMAILJS FAILED...', err);
    return;
  }

  console.log('ERROR', err);
}
```

### CommonJS modules

**send email**

```js
const emailjs = require('@emailjs/nodejs');

var templateParams = {
  name: 'James',
  notes: 'Check this out!',
};

emailjs
  .send('<YOUR_SERVICE_ID>', '<YOUR_TEMPLATE_ID>', templateParams, {
    publicKey: '<YOUR_PUBLIC_KEY>',
    privateKey: '<YOUR_PRIVATE_KEY>', // optional, highly recommended for security reasons
  })
  .then(
    function (response) {
      console.log('SUCCESS!', response.status, response.text);
    },
    function (err) {
      console.log('FAILED...', err);
    },
  );
```
