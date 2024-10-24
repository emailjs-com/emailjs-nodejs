import type { LimitRate } from '../../types/LimitRate.js';
import type { StorageProvider } from '../../types/StorageProvider.js';
import { validateLimitRateParams } from '../validateLimitRateParams/validateLimitRateParams.js';

const getLeftTime = async (
  id: string,
  throttle: number,
  storage: StorageProvider,
): Promise<number> => {
  const lastTime = Number((await storage.get(id)) || 0);
  return throttle - Date.now() + lastTime;
};

export const isLimitRateHit = async (
  options: LimitRate,
  storage?: StorageProvider,
): Promise<boolean> => {
  if (!options.throttle || !storage) {
    return false;
  }

  validateLimitRateParams(options.throttle, options.id);

  const id = options.id || 'default';
  const leftTime = await getLeftTime(id, options.throttle, storage);

  if (leftTime > 0) {
    return true;
  }

  await storage.set(id, Date.now());
  return false;
};
