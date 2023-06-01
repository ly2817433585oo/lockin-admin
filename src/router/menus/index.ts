/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-22 19:49:54
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-06 10:20:19
 * @FilePath: /v3ts-lockin/src/router/menus/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Menu, MenuModule } from '@/router/types';
import type { RouteRecordNormalized } from 'vue-router';

import { useAppStoreWtihOut } from '@/store/modules/app';
import { usePermissionStore } from '@/store/modules/permission';

import { tranformMenuModule, getAllParentPath } from '@/router/helper/menuHelper';
import { filter } from '@/utils/helper/treeHelper';
import { isUrl } from '@/utils/is';
import { router } from '@/router';
import { PermissionModeEnum } from '@/enums/appEnum';
import { pathToRegexp } from 'path-to-regexp';

import { transform, transformModel } from '@vue/compiler-core';

// 为空
const modules = import.meta.glob<{ [key: string]: any }>('./modules/**/*.ts', { eager: true });

const menuModules: MenuModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  menuModules.push(...modList);
});

// ===========================
// ==========Helper===========
// ===========================

const getPermissionMode = () => {
  const appStore = useAppStoreWtihOut();
  return appStore.getProjectConfig.permissionMode;
};

const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK;
};

const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING;
};

const isRoleMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROLE;
};

const staticMenus: Menu[] = [];

(() => {
  menuModules.sort((a, b) => {
    return (a.orderNo || 0) - (b.orderNo || 0);
  });

  for (const menu of menuModules) {
    staticMenus.push(tranformMenuModule(menu));
  }
})();

// 过滤所有隐藏的菜单
async function getAsyncMenus() {
  const permissionStore = usePermissionStore();
  // 递归过滤所有隐藏的菜单
  const menuFilter = (items) => {
    return items.filter((item) => {
      const show = !item.menu?.hideMenu && !item.hideMenu;
      if (show && item.children) {
        item.children = menuFilter(item.children);
      }
      return show;
    });
  };
  if (isBackMode()) {
    return menuFilter(permissionStore.getBackMenuList);
  }
  if (isRouteMappingMode()) {
    return menuFilter(permissionStore.getFrontMenuList);
  }
}

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus();
  return menus;
};

// function basicFilter(routes: RouteRecordNormalized[]) {
//   return (menu: Menu) => {
//     const matchRoute = routes.find((route) => {
//       if (isUrl(menu.path)) return true;

//       if(route.meta?.carryParam) {

//       }
//     });
//   };
// }
