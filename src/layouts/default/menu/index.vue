<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-02 16:16:33
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-29 14:28:54
 * @FilePath: /v3ts-lockin/src/layouts/default/menu/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="tsx" setup>
  import { computed, toRef, unref } from 'vue';

  import { MenuModeEnum, MenuSplitTypeEnum } from '@/enums/menuEnum';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { ThemeEnum } from '@/enums/appEnum';
  import { useDesign } from '@/hooks/web/useDesgin';
  import AppLogo from '@/components/Application/src/AppLogo.vue';
  import { useAppInject } from '@/hooks/web/useAppInject';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import BasicMenu from '@/components/Menu/src/BasicMenu.vue';
  import { useSplitMenu } from './useLayoutMenu';

  interface propsType {
    theme?: ThemeEnum;
    splitType?: MenuSplitTypeEnum;
    isHorizontal?: boolean;
    menuMode?: MenuModeEnum;
    showLogo?: boolean;
  }

  const props = withDefaults(defineProps<propsType>(), {
    splitType: MenuSplitTypeEnum.NONE,
    showLogo: true,
  });

  const { getIsMobile } = useAppInject();

  const {
    getMenuMode,
    getMenuType,
    getMenuTheme,
    getCollapsed,
    getCollapsedShowTitle,
    getAccordion,
    getIsHorizontal,
    getIsSidebarType,
    getSplit,
  } = useMenuSetting();
  const { getShowLogo } = useRootSetting();

  const { prefixCls } = useDesign('layout-menu');

  const { menusRef } = useSplitMenu(toRef(props, 'splitType'));

  const getLogoClass = computed(() => {
    return [`${prefixCls}-logo`];
  });

  const getIsShowLogo = computed(() => {
    return unref(props.showLogo) && unref(getShowLogo) && unref(getIsSidebarType);
  });
  console.log(getIsShowLogo, unref(getIsSidebarType), 'getisshowlogo');

  const getComputedMenuMode = computed(() =>
    unref(getIsMobile) ? MenuModeEnum.INLINE : props.menuMode || unref(getMenuMode),
  );

  const getComputedMenuTheme = computed(() => props.theme || unref(getMenuTheme));

  const getCommonProps = computed(() => {
    const menus = unref(menusRef);
    return {
      menus,
      items: menus,
    };
  });

  function renderHeader() {
    if (!unref(getIsShowLogo) && !unref(getIsMobile)) return null;

    return (
      <AppLogo
        showTitle={!unref(getCollapsed)}
        theme={unref(props.theme)}
        class={unref(getLogoClass)}
      />
    );
  }

  function renderMenu() {
    const { menus, ...menusProps } = unref(getCommonProps);
    console.log(menus);
    if (!menus || !menus.length) return null;
    return (
      <BasicMenu
        items={menus}
        isHorizontal={props.isHorizontal}
        mode={unref(getComputedMenuMode as any)}
      ></BasicMenu>
    );
  }

  const MenuRender = () => {
    return (
      <>
        {renderHeader()}
        {renderMenu()}
      </>
    );
  };
</script>

<template>
  <MenuRender />
</template>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-menu';
  @logo-prefix-cls: ~'@{namespace}-app-logo`';

  .@{prefix-cls} {
    &-logo {
      height: @header-height;

      img {
        height: @logo-width;
        width: @logo-width;
      }
    }
  }
</style>
