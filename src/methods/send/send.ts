import type { EmailJSResponseStatus } from '../../models/emailjs_response_status';

import { store } from '../../store/store';
import { validateParams } from '../../utils/validate_params';
import { sendJSON } from '../../api/send_json';

/**
 * Send a template to the specific EmailJS service
 * @param {string} serviceID - the EmailJS service ID
 * @param {string} templateID - the EmailJS template ID
 * @param {object} templatePrams - the template params, what will be set to the EmailJS template
 * @param {string} publicKey - the EmailJS public key
 * @returns {Promise<string>}
 */
export const send = (
  serviceID: string,
  templateID: string,
  templatePrams?: Record<string, unknown>,
  publicKey?: string,
): Promise<EmailJSResponseStatus> => {
  const pubKey = publicKey || store._userID;

  validateParams(pubKey, serviceID, templateID);

  const params = {
    lib_version: process.env.npm_package_version,
    user_id: pubKey,
    service_id: serviceID,
    template_id: templateID,
    template_params: templatePrams,
  };

  return sendJSON(JSON.stringify(params));
};
