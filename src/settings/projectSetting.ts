/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-19 15:07:17
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-22 16:55:08
 * @FilePath: /v3ts-lockin/src/settings/projectSetting.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import type { ProjectConfig } from '#/config';
import {
  PermissionModeEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
  ThemeEnum,
} from '@/enums/appEnum';
import { CacheTypeEnum } from '@/enums/cacheEnum';
import { MenuModeEnum, MenuTypeEnum, MixSidebarTriggerEnum, TriggerEnum } from '@/enums/menuEnum';
import { primaryColor } from '../../build/config/themeConfig';
// import { primaryColor } from 'build/config/themeConfig';
import { HEADER_PRESET_BG_COLOR_LIST, SIDE_BAR_BG_COLOR_LIST } from './designSetting';

const setting: ProjectConfig = {
  // todo
  // 权限模式
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  // Whether to show the configuration button 是否显示配置按钮
  showSettingButton: true,
  // Whether to show the theme switch button
  showDarkModeToggle: true,
  // `Setting` button position
  settingButtonPosition: SettingButtonPositionEnum.AUTO,
  // Permission-related cache is stored in sessionStorage or localStorage 权限关系是否保存在浏览器内存
  permissionCacheType: CacheTypeEnum.LOCAL,
  // Session timeout processing   缓存过期处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
  // theme color
  themeColor: primaryColor,
  // Color Weakness mode 色弱模式
  colorWeak: false,
  // Whether to cancel the menu,the top,the multi-tab page dispaly, for possible embeded in other systems 全屏模式
  fullContent: false,
  // Whether to display the logo
  showLogo: true,
  // Whether to show footer
  showFooter: false,
  // Header configuration
  headerSetting: {
    // header bg color
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    // Fixed at the top
    fixed: true,
    // Whether to show top
    show: true,
    // theme
    theme: ThemeEnum.LIGHT,
    // Whether to enable the lock screen function
    useLockPage: true,
    // Whether to show the full screen button
    showFullScreen: true,
    // Whether to show document button
    showDoc: true,
    // Whether to show the notification button
    showNotice: true,
    // Whether to display the menu search
    showSearch: true,
  },
  menuSetting: {
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    fixed: true,
    // Menu collapsed 控制菜单折叠
    collapsed: false,
    // When sider hidden because of the responsive layout
    siderHidden: false,
    // Whether to display the menu name when folding the menu
    collapsedShowTitle: false,
    // Whether it can be dragged
    // Only limited to the opening of the left menu ,the mosue has a drag bar on then right side of menu
    canDrag: false,
    // Whether to show no dom
    show: true,
    // Whether to show dom
    hidden: false,
    // Menu width
    menuWidth: 210,
    // Menu mode
    mode: MenuModeEnum.INLINE,
    // Menu Type
    type: MenuTypeEnum.SIDEBAR,
    // Theme
    theme: ThemeEnum.LIGHT,
    // Split menu
    split: false,
    // top menu layout
    topMenuAlign: 'center',
    // Fold trigger position
    trigger: TriggerEnum.FOOTER,
    // Turn on according mode,only show a menu
    accordion: true,
    // Switch page to close menu
    closeMixSidebarOnChange: false,
    // Module opening method 'click' | 'hover'
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // Fixed expanded menu
    mxiSideFixed: false,
  },
};

export default setting;
