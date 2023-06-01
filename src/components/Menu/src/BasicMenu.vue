<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-02 16:32:06
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-17 16:49:54
 * @FilePath: /v3ts-lockin/src/components/Menu/src/BasicMenu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { reactive, ref, toRefs, unref, computed } from 'vue';
  import { Menu } from 'ant-design-vue';
  import type { MenuState } from './types';
  import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum';
  import { basicPropsModule } from './props';

  import BasicSubMenuItem from './componets/BasicSubMenuItem.vue';

  import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router';
  import { isFunction } from '@/utils/is';
  import { basicProps } from './props';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { useDesign } from '@/hooks/web/useDesgin';

  const props = defineProps(basicProps);
  const isClickGo = ref(false);
  const currentActiveMenu = ref('');

  const menuState = reactive<MenuState>({
    defaultSelectedKeys: [],
    openKyes: [],
    selectedKeys: [],
    collapsedOpenKeys: [],
  });

  const { prefixCls } = useDesign('basic-menu');
  // items
  const { items, mode, accordion } = toRefs(props);

  const { getCollapsed, getTopMenuAlign, getSplit } = useMenuSetting();

  // 获取当前路由
  const { currentRoute } = useRouter();

  const getIsTopMenu = computed(() => {
    const { type, mode } = props;

    return (
      (type === MenuTypeEnum.TOP_MENU && mode === MenuModeEnum.HORIZONTAL) ||
      (props.isHorizontal && unref(getSplit))
    );
  });

  const getMenuClass = computed(() => {
    const align = props.isHorizontal && unref(getSplit) ? 'start' : unref(getTopMenuAlign);
    return [
      prefixCls,
      `justify-${align}`,
      {
        [`${prefixCls}__second`]: !props.isHorizontal && unref(getSplit),
        [`${prefixCls}__sidebar-hor`]: unref(getIsTopMenu),
      },
    ];
  });

  const getInlineCollapseOptions = computed(() => {
    const isInline = props.mode === MenuModeEnum.INLINE;
    console.log(props, isInline);

    const inlineCollapseOptions: { inlineCollapsed?: boolean } = {};
    if (isInline) {
      inlineCollapseOptions.inlineCollapsed = props.mixSider ? false : unref(getCollapsed);
    }
    return inlineCollapseOptions;
  });
</script>

<template>
  <Menu :class="getMenuClass" :mode="mode" v-bind="getInlineCollapseOptions">
    <template v-for="item in items" :key="item.path">
      <BasicSubMenuItem :item="item" :theme="theme" :isHorizontal="isHorizontal" />
    </template>
  </Menu>
</template>

<style scoped lang="less"></style>
