/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-18 14:40:18
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-21 11:26:13
 * @FilePath: /v3ts-lockin/src/router/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";

import { createRouter, createWebHashHistory } from "vue-router";
import { basicRoutes } from "./routes";

//
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否禁止尾部斜杠
  strict: true,
});
// console.log(router.getRoutes());

export function setupRouter(app: App<Element>) {
  app.use(router);
}
