import type { MenuSetting } from '#/config';

import { useAppStore } from '@/store/modules/app';

import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '@/enums/appEnum';
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '@/enums/menuEnum';
import { computed, unref, ref } from 'vue';

const mixSideHasChildren = ref(false);

export function useMenuSetting() {
  const appStore = useAppStore();

  const getSetting = (key) => computed(() => appStore.getMenuSetting[key]);

  const getShowSidebar = computed(() => {
    return (
      unref(getSplit) || (unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.HORIZONTAL)
    );
  });

  const keys = [
    'collapsed',
    'type',
    'mode',
    'fixed',
    'show',
    'hidden',
    'menuWidth',
    'trigger',
    'split',
    'bgColor',
    'mixSideTrigger',
    'canDrag',
    'accordion',
    'mxiSideFixed',
    'topMenuAlign',
    'closeMixSidebarOnChange',
    'collapsedShowTitle',
    'theme',
  ];
  const [
    getCollapsed,
    getMenuType,
    getMenuMode,
    getMenuFixed,
    getShowMenu,
    getMenuHidden,
    getMenuWidth,
    getTrigger,
    getSplit,
    getMenuBgColor,
    getMixSideTrigger,
    getCanDrag,
    getAccordion,
    getMixSideFixed,
    getTopMenuAlign,
    getCloseMixSidebarOnChange,
    getCollapsedShowTitle,
    getMenuTheme,
  ] = keys.map(getSetting);
  const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR);

  const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU);

  const getShowHeaderTrigger = computed(() => {
    if (
      unref(getMenuType) === MenuTypeEnum.TOP_MENU ||
      !unref(getShowMenu) ||
      unref(getMenuHidden)
    ) {
      return false;
    }
    return unref(getTrigger) === TriggerEnum.HEADER;
  });

  const getShowTopMenu = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit);
  });

  const getIsHorizontal = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL;
  });
  const getIsMixSidebar = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX;
  });

  const getIsMixMode = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX;
  });

  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle, siderHidden } = appStore.getMenuSetting;
    return siderHidden
      ? 0
      : collapsedShowTitle
      ? SIDE_BAR_SHOW_TIT_MINI_WIDTH
      : SIDE_BAR_MINI_WIDTH;
  });
  const getRealWidth = computed(() => {
    if (unref(getIsMixSidebar)) {
      return unref(getCollapsed) && !unref(getMixSideFixed)
        ? unref(getMiniWidthNumber)
        : unref(getMenuWidth);
    }
  });
  const getCalcContentWidth = computed(() => {
    const width =
      unref(getIsTopMenu) || !unref(getShowMenu) || (unref(getSplit) && unref(getMenuHidden))
        ? 0
        : unref(getIsMixSidebar)
        ? (unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH) +
          (unref(getMixSideFixed) && unref(mixSideHasChildren) ? unref(getRealWidth) : 0)
        : unref(getRealWidth);
    return `calc(100% - ${unref(width)}px)`;
  });

  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }

  return {
    setMenuSetting,

    toggleCollapsed,

    getMenuFixed,
    getRealWidth,
    getMenuType,
    getMenuMode,
    getShowMenu,
    getCollapsed,
    getMiniWidthNumber,
    getCalcContentWidth,
    getMenuWidth,
    getTrigger,
    getSplit,
    getMenuTheme,
    getCanDrag,
    getCollapsedShowTitle,
    getIsHorizontal,
    getIsSidebarType,
    getAccordion,
    getShowTopMenu,
    getShowHeaderTrigger,
    getTopMenuAlign,
    getMenuHidden,
    getIsTopMenu,
    getMenuBgColor,
    getShowSidebar,
    getIsMixMode,
    getIsMixSidebar,
    getCloseMixSidebarOnChange,
    getMixSideTrigger,
    getMixSideFixed,
    mixSideHasChildren,
  };
}
