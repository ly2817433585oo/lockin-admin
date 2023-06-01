/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-23 21:54:11
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-19 16:35:44
 * @FilePath: /v3ts-lockin/types/index.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
