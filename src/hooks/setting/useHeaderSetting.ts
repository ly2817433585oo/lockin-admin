/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-09 14:31:46
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-09 15:18:00
 * @FilePath: /v3ts-lockin/src/hooks/setting/useHeaderSetting.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { HeaderSetting } from '#/config';

import { computed, unref } from 'vue';

import { useAppStore } from '@/store/modules/app';

import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
import { useRootSetting } from '@/hooks/setting/useRootSetting';
import { useFullContent } from '@/hooks/web/useFullContent';
import { MenuModeEnum } from '@/enums/menuEnum';

export function useHeaderSetting() {
  const { getFullContent } = useFullContent();

  const appStore = useAppStore();

  const getSetting = (key) => computed(() => appStore.getHeaderSetting[key]);

  const getShowFullHeaderRef = computed(() => {
    return (
      !unref(getFullContent) &&
      unref(getShowMixHeaderRef) &&
      unref(getShowHeader) &&
      !unref(getIsTopMenu) &&
      !unref(getIsMixSidebar)
    );
  });

  const getUnFixedAndFull = computed(() => !unref(getFixed) && !unref(getShowFullHeaderRef));
  const getShowInsetHeaderRef = computed(() => {
    const need = !unref(getFullContent) && unref(getShowHeader);
    return (
      (need && !unref(getShowMixHeaderRef)) ||
      (need && unref(getIsTopMenu)) ||
      (need && unref(getIsMixSidebar))
    );
  });

  const {
    getMenuMode,
    getSplit,
    getShowHeaderTrigger,
    getIsSidebarType,
    getIsMixSidebar,
    getIsTopMenu,
  } = useMenuSetting();

  const { getShowBreadCrumb, getShowLogo } = useRootSetting();

  const getShowMixHeaderRef = computed(() => !unref(getIsSidebarType) && unref(getShowHeader));

  const keys = [
    'showDoc',
    'theme',
    'show',
    'fixed',
    'bgColor',
    'showSearch',
    'useLockPage',
    'showFullScreen',
    'showNotice',
  ];

  const [
    getShowDoc,
    getHeaderTheme,
    getShowHeader,
    getFixed,
    getHeaderBgColor,
    getShowSearch,
    getUseLockPage,
    getShowFullScreen,
    getShowNotice,
  ] = keys.map(getSetting);

  const getShowBread = computed(() => {
    return (
      unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb) && !unref(getSplit)
    );
  });

  const getShowHeaderLogo = computed(() => {
    return unref(getShowLogo) || (!unref(getIsSidebarType) && !unref(getIsMixSidebar));
  });

  const getShowContent = computed(() => {
    return unref(getShowBread) || unref(getShowHeaderTrigger);
  });

  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    appStore.setProjectConfig({ headerSetting });
  }

  return {
    setHeaderSetting,
    getShowDoc,
    getShowSearch,
    getHeaderTheme,
    getUseLockPage,
    getShowFullScreen,
    getShowNotice,
    getShowBread,
    getShowContent,
    getShowHeaderLogo,
    getShowHeader,
    getFixed,
    getShowMixHeaderRef,
    getShowFullHeaderRef,
    getShowInsetHeaderRef,
    getUnFixedAndFull,
    getHeaderBgColor,
  };
}
