/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-05-22 13:23:25
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-22 13:24:48
 * @FilePath: /v3ts-lockin/build/vite/plugins/proxy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { ProxyOptions } from 'vite';

type ProxyItem = [string, string];
type ProxyList = ProxyItem[];
type ProxyTargList = Record<string, ProxyOptions>;

const httpsRE = /^https:\/\//;
