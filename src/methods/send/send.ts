import type { EmailJSResponseStatus } from '../../models/emailjs_response_status';
import type { Options } from '../../types/Options';

import { store } from '../../store/store';
import { validateParams } from '../../utils/validate_params';
import { sendJSON } from '../../api/send_json';

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
    user_id: prKey,
    accessToken: options?.privateKey,
    template_params: templatePrams,
  };

  return sendJSON(JSON.stringify(params));
};
