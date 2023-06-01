/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-19 11:34:37
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-19 11:41:09
 * @FilePath: /v3ts-lockin/src/store/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
