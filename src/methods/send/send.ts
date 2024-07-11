import type { EmailJSResponseStatus } from '../../models/EmailJSResponseStatus';
import type { Options } from '../../types/Options';

import { store } from '../../store/store';
import { sendPost } from '../../api/sendPost';
import { validateParams } from '../../utils/validateParams/validateParams';
import { validateTemplateParams } from '../../utils/validateTemplateParams/validateTemplateParams';
import { isBlockedValueInParams } from '../../utils/isBlockedValueInParams/isBlockedValueInParams';
import { blockedEmailError } from '../../errors/blockedEmailError/blockedEmailError';
import { isLimitRateHit } from '../../utils/isLimitRateHit/isLimitRateHit';
import { limitRateError } from '../../errors/limitRateError/limitRateError';

/**
 * Send a template to the specific EmailJS service
 * @param {string} serviceID - the EmailJS service ID
 * @param {string} templateID - the EmailJS template ID
 * @param {object} templateParams - the template params, what will be set to the EmailJS template
 * @param {object} options - the EmailJS SDK config options
 * @returns {Promise<EmailJSResponseStatus>}
 */
export const send = async (
  serviceID: string,
  templateID: string,
  templateParams?: Record<string, unknown>,
  options?: Options,
): Promise<EmailJSResponseStatus> => {
  const publicKey = options?.publicKey || store.publicKey;
  const privateKey = options?.privateKey || store.privateKey;
  const storageProvider = options?.storageProvider || store.storageProvider;
  const blockList = { ...store.blockList, ...options?.blockList };
  const limitRate = { ...store.limitRate, ...options?.limitRate };

  validateParams(publicKey, serviceID, templateID);
  validateTemplateParams(templateParams);

  if (templateParams && isBlockedValueInParams(blockList, templateParams)) {
    return Promise.reject(blockedEmailError());
  }

  if (await isLimitRateHit(limitRate, storageProvider)) {
    return Promise.reject(limitRateError());
  }

  const params = {
    lib_version: process.env.npm_package_version,
    user_id: publicKey,
    accessToken: privateKey,
    service_id: serviceID,
    template_id: templateID,
    template_params: templateParams,
  };

  return sendPost(JSON.stringify(params));
};
