/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-21 16:27:31
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-22 18:49:16
 * @FilePath: /v3ts-lockin/src/utils/cache/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createStorage as create, CreateStorageParams } from './storageCache';
import { getStorageShortName } from '../env';
import { enableStorageEncryption } from '@/settings/encryptSetting'; // 判断是否需要加密
import { DEFAULT_CACHE_TIME } from '@/settings/encryptSetting'; // 默认过期时间 7天

export type Options = Partial<CreateStorageParams>;

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  };
};

export const WebStorage = create(createOptions(sessionStorage));

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options));
};

export const createSessionStorage = (optoins: Options = {}) => {
  return createStorage(sessionStorage, {
    ...optoins,
    timeout: DEFAULT_CACHE_TIME,
  });
};

export const createLocalStorage = (options: Options = {}) => {
  debugger;
  return createStorage(localStorage, {
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  });
};

// 无过期时间
export default WebStorage;
