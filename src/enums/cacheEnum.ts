/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-03 14:21:32
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-03 14:26:38
 * @FilePath: /v3ts-lockin/src/enums/cacheEnum.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// token key
export const TOKEN_KEY = 'TOKEN__';
export const LOCALE_KEY = 'LOCALE__';

// user info key
export const USER_INFO_KEY = 'USER__INFO__';

// role info key
export const ROLES_KEY = 'ROLES__KEY__';

// project config key
export const PROJ_CFG_KEY = 'PROJ__CFG__KEY__';

export const LOCK_INFO_KEY = 'LOCK__INFO__KEY__';

export const MULTIPLE_TABS_KEY = 'MULTIPLLE_TABS__KEY__';

export const APP_DARK_MODE_KEY_ = '__APP__DARK__MODE__';

export const APP_LOCAL_CACHE_KEY = 'COMMON__LOCAL__KEY__';

export const APP_SESSION_CACHE_KEY = 'COMMON__SESSION__KEY__';

export enum CacheTypeEnum {
  SESSION,
  LOCAL,
}
