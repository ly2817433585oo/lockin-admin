/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-19 12:16:35
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-28 16:41:11
 * @FilePath: /v3ts-lockin/types/vue-router.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RoleEnum } from '@/enums/roleEnum';
export {};

declare module 'vue-router' {
  // 对RouteMeta类型进行拓展
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderNo?: number;
    // title 标题
    title: string;
    // dynamic router level 动态路由层级
    dynamicLevel?: number;
    // dynamic router real route path
    realPath?: string;
    // Whether to ignore permissions 无视权限
    ignoreAuth?: boolean;
    // role Info  角色信息
    roles?: RoleEnum[];
    // Whether not to cache
    ingoreKeepAlive?: boolean;
    // Is it fixed on tab; 是否在tab页中固定
    affix?: boolean;
    // icon on tab Tab卡中的图标
    icon?: string;
    frameSrc?: string;
    // current page transition
    transitionName?: string;
    // Whether the route has been dynamically added
    hideBreadcrumb?: boolean;
    // Hide submenu
    hideChildrenInMenu?: boolean;
    // Carrying parameters
    carryParam?: boolean;
    // Used internally to mark single-level menus
    single?: boolean;
    // Currently active menu
    currentActiveMenu?: string;
    // Never show in tab
    hideTab?: boolean;
    // Never show in menu
    hideMenu?: boolean;
    isLink?: boolean;
    // only build for menu
    ignoreRoute?: boolean;
    // hide path for children;
    hidePathForChildren?: boolean;
  }
}
