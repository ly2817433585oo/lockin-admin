/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-18 14:51:18
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-01 16:20:15
 * @FilePath: /v3ts-lockin/src/router/routes/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { AppRouteRecordRaw, AppRouteModule } from "@/router/types";

import { PageEnum } from "@/enums/pageEnum";

const modules = import.meta.glob("./modules/**/*.ts", { eager: true });

const routeModuleList: AppRouteModule[] = [];

console.log(modules);
Object.keys(modules).forEach((key) => {
  //@ts-ignore
  const mod = modules[key].default || {};
  console.log(mod);
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

// todo
export const asyncRoutes = [...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "",
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "login",
  component: () => import("@/views/sys/login/Login.vue"),
  meta: {
    title: "登录",
  },
};

export const basicRoutes = [RootRoute, LoginRoute];
