/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-23 21:33:25
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-28 16:41:17
 * @FilePath: /v3ts-lockin/src/router/helper/menuHelper.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AppRouteModule } from '@/router/types';
import type { MenuModule, Menu, AppRouteRecordRaw } from '@/router/types';
import { findPath, treeMap } from '@/utils/helper/treeHelper';
import { cloneDeep } from 'lodash-es';

import { isUrl } from '@/utils/is';

import { RouteParams } from 'vue-router';
import { toRaw } from 'vue';

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as Menu[];
  return (menuList || []).map((item) => item.path);
}

// 路径处理  给非父路由加上父路由的前缀
function joinParenPath(menus: Menu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // 不以'/'开头或不为url时，在路径前拼上parentPath
      menu.path = `${parentPath}/${menu.path}`;
    }
    if (menu?.children?.length) {
      joinParenPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path);
    }
  }
}

export function tranformMenuModule(menuModule: MenuModule): Menu {
  const { menu } = menuModule;

  const menuList = [menu];

  joinParenPath(menuList);
  return menuList[0];
}

export function transformRouteToMenu(routeModList: AppRouteModule[], routerMapping = false) {
  const cloneRouteModList = cloneDeep(routeModList);
  const routeList: AppRouteRecordRaw[] = [];

  cloneRouteModList.forEach((item) => {
    if (routerMapping && item.meta.hideChildrenInMenu && typeof item.redirect === 'string') {
      item.path = item.redirect;
    }

    if (item.meta?.single) {
      const realItem = item?.children?.[0];
      realItem && routeList.push(realItem);
    } else {
      routeList.push(item);
    }
  });

  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = node;

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {}),
      };
    },
  });

  joinParenPath(list);
  return cloneDeep(list);
}
