/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-19 11:34:44
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-06 14:39:49
 * @FilePath: /v3ts-lockin/src/store/modules/permission.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { AppRouteRecordRaw, Menu } from '@/router/types';

import { defineStore } from 'pinia';
import { store } from '@/store';
// 获取未被监听的原始数据
import { toRaw } from 'vue';
import { useUserStore } from './user';

import projectSetting from '@/settings/projectSetting';

import { PermissionModeEnum } from '@/enums/appEnum';

import { filter } from '@/utils/helper/treeHelper';
import { asyncRoutes } from '@/router/routes';
import { useAppStoreWtihOut } from './app';
import { flatMultiLevelRoutes, transformObjToRoute } from '@/router/helper/routeHelper';
import { transformRouteToMenu } from '@/router/helper/menuHelper';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';
interface PermissionState {
  // Permission code List 权限代码列表
  permCodeList: string[] | number[];
  // whether the route has been dynamically added 路由是否动态添加
  isDynamicAddedRoute: boolean;
  // To trigger a menu update; 触发菜单更新
  lastBuildMenuTime: number;
  // Backstage menu list 后台菜单列表
  backMenuList: Menu[];
  // 菜单列表
  frontMenuList: Menu[];
}

export const usePermissionStore = defineStore({
  id: 'app-permisison',
  state: (): PermissionState => ({
    permCodeList: [],
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    backMenuList: [],
    frontMenuList: [],
  }),
  getters: {
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList;
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList;
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },
    setBackMenuList(list: Menu[]) {
      this.backMenuList = list;
      list?.length > 0 && this.setLastBuildMenuTime();
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.backMenuList = [];
      this.permCodeList = [];
      this.lastBuildMenuTime = 0;
    },
    // 构建路由
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const userStore = useUserStore();
      const appStore = useAppStoreWtihOut();

      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getRoleList) || [];
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig;
      // 权限模式
      //   const { permissionMode = projectSetting.permissionMode } =
      //     appStore.getProjectConfig;

      // 路由过滤器 根据role进行过滤 作为回调传入遍历使用
      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { roles } = meta || {};
        if (!roles) return true;
        return roleList.some((role) => roles.includes(role));
      };
      //
      const routeRemoveIngoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        // ignoreRoute 为true时，路由仅用于菜单生成，不会在实际的路由表中出现
        const { ignoreRoute } = meta || {};
        return !ignoreRoute;
      };

      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        // todo
        return;
      };

      routes = filter(asyncRoutes, routeFilter);
      // 对一级路由根据角色权限过滤
      routes = routes.filter(routeFilter);
      // 根据不同的权限模式来生成不同的路由
      switch (permissionMode) {
        // 角色权限
        case PermissionModeEnum.ROLE:
          // 对非一级路由进行过滤
          routes = filter(asyncRoutes, routeFilter);

          routes = routes.filter(routeFilter);

          // 将多级路由转换为2级路由 为什么？ todo
          routes = flatMultiLevelRoutes(routes);
          break;
        case PermissionModeEnum.ROUTE_MAPPING:
          // todo
          routes = filter(asyncRoutes, routeFilter);

          routes = routes.filter(routeFilter);

          const menuList = transformRouteToMenu(routes, true);

          routes = filter(routes, routeRemoveIngoreFilter);

          routes = routes.filter(routeRemoveIngoreFilter);

          menuList.sort((a, b) => (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0));

          this.setFrontMenuList(menuList);
          console.log(menuList);

          routes = flatMultiLevelRoutes(routes);
          break;
        case PermissionModeEnum.BACK:
          let routeList: AppRouteRecordRaw[] = [];
          try {
            // routeList = (await getMenuList()) as AppRouteRecordRaw[];
          } catch (error) {
            console.error(error);
          }

          routeList = transformObjToRoute(routeList);

          const backMenuList = transformRouteToMenu(routeList);
          this.setBackMenuList(backMenuList);

          routeList = filter(routeList, routeRemoveIngoreFilter);
          routeList = routeList.filter(routeRemoveIngoreFilter);

          routeList = flatMultiLevelRoutes(routeList);
          routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
          // todo
          break;
      }
      debugger;
      return routes;
    },
  },
});

export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
