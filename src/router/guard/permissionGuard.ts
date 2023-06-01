/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-19 11:15:57
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-22 16:58:17
 * @FilePath: /v3ts-lockin/src/router/guard/permissionGuard.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Router, RouteRecordRaw } from 'vue-router';

import { PageEnum } from '@/enums/pageEnum';

import { RootRoute } from '@/router/routes';
import { useUserStoreWithOut } from '@/store/modules/user';
import { usePermissionStoreWithOut } from '@/store/modules/permission';

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const ROOT_PATH = RootRoute.path;

const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const permissionStore = usePermissionStoreWithOut();

  router.beforeEach(async (to, from, next) => {
    // console.log("permissionGuard", to);
    // if (
    //   from.path === ROOT_PATH &&
    //   to.path === PageEnum.BASE_HOME &&
    //   userStore.getUserInfo.homePath &&
    //   userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    // ) {
    //   next(PageEnum.BASE_HOME);
    //   return;
    // }

    // const token = userStore.getToken;
    const token = userStore.getToken;

    // Whitelist can be directly entered 白名单不需要进行验证
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        // todo
        // 进行超时判定 和 登陆后的通用处理
      }
      next();
      return;
    }

    // token or user does not exist
    if (!token) {
      // you can access without permission, you need to set the routing meata. ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      const redirectData: {
        path: string;
        replace: boolean;
        query?: Recordable<string>;
      } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }

    // jump to the 404 page after processing the login
    // todo

    // get userinfo while last fetch time is empty
    // 每次刷新页面时都从接口更新用户信息
    // if(userStore.getLastUpdateTime === 0) {

    // }

    // 如果已经添加过动态路由
    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }
    const routes = await permissionStore.buildRoutesAction();
    console.log(routes, 'routes by filter');

    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    console.log(router);

    permissionStore.setDynamicAddedRoute(true);

    // if(to.name === P)
  });
}
