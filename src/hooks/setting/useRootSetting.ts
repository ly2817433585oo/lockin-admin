/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-09 14:34:32
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-09 14:50:59
 * @FilePath: /v3ts-lockin/src/hooks/setting/useRootSetting.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { ProjectConfig } from '#/config';

import { computed } from 'vue';

import { useAppStore } from '@/store/modules/app';
import { ContentEnum, ThemeEnum } from '@/enums/appEnum';

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;

export function useRootSetting() {
  const appStore = useAppStore();

  const getPageLoading = computed(() => appStore.getPageLoading);

  const getDarkMode = computed(() => appStore.getDarkMode);

  const getSetting = (key) => computed(() => appStore.getProjectConfig[key]);

  const keys = [
    'openKeepAlive',
    'settingButtonPosition',
    'canEmbedIFramePage',
    'permissionMode',
    'showLogo',
    'cotentMode',
    'useOpenBackTop',
    'showSettingButton',
    'useErrorHandle',
    'showFooter',
    'showBreadCrumb',
    'themeColor',
    'showBreadCrumbIcon',
    'fullCotent',
    'colorWeak',
    'grayMode',
    'lockTime',
    'showDarkModeToggle',
  ];

  const [
    getOpenKeepAlive,
    getSettingButtonPosition,
    getCanEmbedIFramePage,
    getPermissionMode,
    getShowLogo,
    getContentMode,
    getUseOpenBackTop,
    getShowSettingButton,
    getUseErrorHandle,
    getShowFooter,
    getShowBreadCrumb,
    getThemeColor,
    getShowBreadCrumbIcon,
    getFullContent,
    getColorWeak,
    getGrayMode,
    getLockTime,
    getShowDarkModeToggle,
  ] = keys.map((key) => getSetting(key));

  const getLayoutContentMode = computed(() =>
    appStore.getProjectConfig.contentMode === ContentEnum.FULL
      ? ContentEnum.FULL
      : ContentEnum.FIXED,
  );

  function setRootSetting(setting: Partial<RootSetting>) {
    appStore.setProjectConfig(setting);
  }

  function setDarkMode(mode: ThemeEnum) {
    appStore.setDarkMode(mode);
  }

  return {
    setRootSetting,
    getSettingButtonPosition,
    getFullContent,
    getColorWeak,
    getGrayMode,
    getLayoutContentMode,
    getPageLoading,
    getOpenKeepAlive,
    getCanEmbedIFramePage,
    getPermissionMode,
    getShowLogo,
    getUseErrorHandle,
    getShowBreadCrumb,
    getShowBreadCrumbIcon,
    getUseOpenBackTop,
    getShowSettingButton,
    getShowFooter,
    getContentMode,
    getLockTime,
    getThemeColor,
    getDarkMode,
    setDarkMode,
    getShowDarkModeToggle,
  };
}
