/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-19 11:15:49
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-21 10:43:27
 * @FilePath: /v3ts-lockin/src/router/guard/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Router } from "vue-router";
import { createPermissionGuard } from "./permissionGuard";

export function setupRouterGuard(route: Router) {
  createPermissionGuard(route);
}
