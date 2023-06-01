/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-21 09:19:44
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-19 21:59:17
 * @FilePath: /v3ts-lockin/src/settings/designSetting.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/* 前缀 和 主题模式 */
import { ThemeEnum } from '../enums/appEnum';

export const prefixCls = 'lockin';

export const darkMode = ThemeEnum.LIGHT;

// app theme preset color
export const APP_PRESET_COLOR_LIST: string[] = [
  '#0960bd',
  '#0084f4',
  '#009688',
  '#536dfe',
  '#ff5c93',
  '#ee4f12',
  '#0096c7',
  '#9c27b0',
  '#ff9800',
];

// header preset color
export const HEADER_PRESET_BG_COLOR_LIST: string[] = [
  '#ffffff',
  '#151515',
  '#009688',
  '#5172DC',
  '#018ffb',
  '#409eff',
  '#e74c3c',
  '#24292e',
  '#394664',
  '#001529',
  '#383f45',
];
// sider preset color
export const SIDE_BAR_BG_COLOR_LIST: string[] = [
  '#001529',
  '#212121',
  '#273352',
  '#ffffff',
  '#191b24',
  '#191a23',
  '#304156',
  '#001628',
  '#28333E',
  '#344058',
  '#383f45',
];
