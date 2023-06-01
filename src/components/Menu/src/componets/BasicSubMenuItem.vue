<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-05-04 22:11:16
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-26 14:24:47
 * @FilePath: /v3ts-lockin/src/components/Menu/src/componets/BasicSubMenuItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import type { Menu as MenuType } from '@/router/types';
  import { useDesign } from '@/hooks/web/useDesgin';
  import BasicMenuItem from './BasicMenuItem.vue';
  // import MenuItemContent from './MenuItemContent.vue';
  import { Menu } from 'ant-design-vue';
  import { Icon } from '@/components/Icon/index';

  import { itemProps } from '../props';

  import { computed } from 'vue';
  const { prefixCls } = useDesign('basic-menu-item');

  // interface itemProps {
  //   item: Partial<MenuType>;
  //   level: number;
  //   // theme: PropType<ThemeEnum>;
  //   showTitle: boolean;
  //   isHorizontal: boolean;
  // }

  const props = defineProps(itemProps);

  const getShowMenu = computed(() => !props.item?.meta?.hideMenu);
  const getName = computed(() => props.item?.name);
  const getIcon = computed(() => props.item?.icon);
  function menuHasChildren(menuTreeItem: MenuType): boolean {
    return (
      !menuTreeItem.meta?.hideChildrenInMenu &&
      Reflect.has(menuTreeItem, 'children') &&
      !!menuTreeItem.children &&
      menuTreeItem.children.length > 0
    );
  }
</script>

<template>
  <BasicMenuItem v-bind="props" v-if="!menuHasChildren(props.item) && getShowMenu" />
  <Menu.SubMenu
    v-if="menuHasChildren(props.item) && getShowMenu"
    :key="`submenu-${item.path}`"
    popup-class-name="app-top-menu-popup"
  >
    >
    <template #icon>
      <Icon :icon="getIcon"></Icon>
    </template>
    <template #title>
      {{ getName }}
      <!-- <MenuItemContent v-bind="props" :item="item" /> -->
    </template>

    <template v-for="childItem in item.children || []" ::key="childItem.path">
      <BasicMenuItem v-bind="props" :item="childItem" />
    </template>
  </Menu.SubMenu>
</template>

<style scoped lang="less"></style>
