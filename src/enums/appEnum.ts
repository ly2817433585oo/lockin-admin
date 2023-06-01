/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-19 15:09:43
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-03 16:26:33
 * @FilePath: /v3ts-lockin/src/enums/appEnum.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const SIDE_BAR_MINI_WIDTH = 48;
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 80;

export enum ContentEnum {
  // auto width
  FULL = 'full',
  // fixed width
  FIXED = 'fixed',
}

// 权限模式
export enum PermissionModeEnum {
  // role 角色权限
  ROLE = 'ROLE',
  // back 后端权限
  BACK = 'BACK',
  // route mapping 路由映射
  ROUTE_MAPPING = 'ROUTE_MAPPING',
}

// 主题
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

// 设置按钮位置
export enum SettingButtonPositionEnum {
  AUTO = 'auto',
  HEADER = 'header',
  FIXED = 'fixed',
}

//
export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE,
}
