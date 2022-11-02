import { EmailJSResponseStatus } from './models/emailjs_response_status';
import { init } from './methods/init/init';
import { send } from './methods/send/send';

export { init, send, EmailJSResponseStatus };

export default {
  init,
  send,
  EmailJSResponseStatus,
};
