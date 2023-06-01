/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-29 20:10:13
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-01 16:43:44
 * @FilePath: /v3ts-lockin/mock/_util.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

const modules = import.meta.glob<{ [key: string]: any }>('./**/*.ts', { eager: true });

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return;
  }
  mockModules.push(...modules[key].default);
});

export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
