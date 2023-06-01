/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-20 11:07:06
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-20 13:24:16
 * @FilePath: /v3ts-lockin/src/router/routes/basic.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { AppRouteRecordRaw } from "../types";

import { LAYOUT, PAGE_NOT_FOUND_NAME } from "../constant";

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: "/:path(.*)*",
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: "ErrorPage",
  },
  // todo
  //   children: [
  //     {
  //       path: "/:path(.*)*",
  //       name: PAGE_NOT_FOUND_NAME,
  //       component:
  //     },
  //   ],
};
