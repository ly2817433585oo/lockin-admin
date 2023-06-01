/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-19 11:02:53
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-23 21:47:38
 * @FilePath: /v3ts-lockin/src/utils/is.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isNull(val) || isUnDef(val);
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isUnDef(val: unknown): val is undefined {
  return val === undefined;
}

export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

export function isUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  return reg.test(path);
}
