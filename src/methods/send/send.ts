import type { EmailJSResponseStatus } from '../../models/emailjs_response_status.js';
import type { Options } from '../../types/Options.js';

import { store } from '../../store/store.js';
import { validateParams } from '../../utils/validate_params.js';
import { sendJSON } from '../../api/send_json.js';

/**
 * Send a template to the specific EmailJS service
 * @param {string} serviceID - the EmailJS service ID
 * @param {string} templateID - the EmailJS template ID
 * @param {object} templatePrams - the template params, what will be set to the EmailJS template
 * @param {Options} options - the EmailJS options
 * @returns {Promise<string>}
 */
export const send = (
  serviceID: string,
  templateID: string,
  templatePrams?: Record<string, unknown>,
  options?: Options,
): Promise<EmailJSResponseStatus> => {
  const pubKey = options?.publicKey || store._publicKey;
  const prKey = options?.privateKey || store._privateKey;

  validateParams(pubKey, serviceID, templateID);

  const params = {
    lib_version: process.env.npm_package_version,
    service_id: serviceID,
    template_id: templateID,
    user_id: pubKey,
    accessToken: prKey,
    template_params: templatePrams,
  };

  return sendJSON(JSON.stringify(params));
};
