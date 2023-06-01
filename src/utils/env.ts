/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-21 17:09:38
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-29 22:59:44
 * @FilePath: /v3ts-lockin/src/utils/env.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { GlobEnvConfig } from '#/config';

import { getConfigFileName } from '../../build/getConfigFileName';

import pkg from '../../package.json';
// 是否为开发环境
export function isDevMode() {
  return import.meta.env.DEV;
}

export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig();
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
}

// Generate cache key according to version
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}__`}`.toUpperCase();
}

export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);

  const ENV = (import.meta.env.DEV
    ? (import.meta.env as unknown as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown as GlobEnvConfig;

  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = ENV;

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    // warn()
    // todo log
  }

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  };
}

// 开发模式
export const devMode = 'development';

// 生产模式
export const prodMode = 'production';

export function getEnv(): string {
  return import.meta.env.MODE;
}

export function isProdMode(): boolean {
  return import.meta.env.PROD;
}
