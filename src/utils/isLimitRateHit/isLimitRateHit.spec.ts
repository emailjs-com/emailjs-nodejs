import { it, describe, expect, beforeEach } from '@jest/globals';
import type { LimitRate } from '../../types/LimitRate';
import type { StorageProvider } from '../../types/StorageProvider';
import { isLimitRateHit } from './isLimitRateHit';
import { createMemoryStorage } from '../createMemoryStorage/createMemoryStorage';

let storage: StorageProvider;

beforeEach(() => {
  storage = createMemoryStorage()!;
});

describe('limit rate is disabled', () => {
  it('empty limit rate options', async () => {
    const limitRate: LimitRate = {};

    expect(await isLimitRateHit(limitRate, storage)).toBeFalsy();
  });

  it('throttle is 0', async () => {
    const limitRate: LimitRate = {
      throttle: 0,
    };

    expect(await isLimitRateHit(limitRate, storage)).toBeFalsy();
  });

  it('no record', async () => {
    const limitRate: LimitRate = {
      id: 'app',
      throttle: 1000,
    };

    expect(await isLimitRateHit(limitRate, storage)).toBeFalsy();
  });

  it('no hit limit', async () => {
    const limitRate: LimitRate = {
      id: 'app',
      throttle: 100,
    };

    expect(await isLimitRateHit(limitRate, storage)).toBeFalsy();

    await new Promise((r) => setTimeout(r, 150));

    expect(await isLimitRateHit(limitRate, storage)).toBeFalsy();
  });

  it('not same page or ID', async () => {
    let limitRate: LimitRate = {
      id: 'app',
      throttle: 100,
    };

    expect(await isLimitRateHit(limitRate, storage)).toBeFalsy();

    limitRate = {
      id: 'new-app',
      throttle: 100,
    };

    expect(await isLimitRateHit(limitRate, storage)).toBeFalsy();
  });
});

describe('limit rate is enabled', () => {
  it('hit limit', async () => {
    const limitRate: LimitRate = {
      id: 'app',
      throttle: 100,
    };

    expect(await isLimitRateHit(limitRate, storage)).toBeFalsy();
    expect(await isLimitRateHit(limitRate, storage)).toBeTruthy();
  });
});
