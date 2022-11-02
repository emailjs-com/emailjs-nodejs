import { EmailJSResponseStatus } from './models/emailjs_response_status.js';
import { init } from './methods/init/init.js';
import { send } from './methods/send/send.js';

export { init, send, EmailJSResponseStatus };

export default {
  init,
  send,
  EmailJSResponseStatus,
};
