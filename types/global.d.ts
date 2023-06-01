/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-17 16:26:35
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-03 13:49:32
 * @FilePath: /v3ts-lockin/types/global.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
declare global {
  // 类型为T或null
  type Nullable<T> = T | null;
  /**
   * Construct a type with a set of properties K of type T
   */
  type Recordable<T = any> = Record<string, T>; // key为string，类型为T 的集合
  interface ViteEnv {
    VITE_PORT: number;
    VITE_USE_MOCK: boolean;
    VITE_USE_PWA: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
    VITE_GLOB_APP_TITLE: string;
    VITE_GLOB_APP_SHORT_NAME: string;
    VITE_USE_CDN: boolean;
    VITE_DROP_CONSOLE: boolean;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_LEGACY: boolean;
    VITE_USE_IMAGEMIN: boolean;
    VITE_GENERATE_UI: string;
  }
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
}
export {};
