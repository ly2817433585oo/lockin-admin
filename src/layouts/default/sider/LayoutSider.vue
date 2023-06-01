<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-02 14:47:05
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-09 21:29:50
 * @FilePath: /v3ts-lockin/src/layouts/default/sider/LayoutSider.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-02 14:44:55
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-02 16:12:36
 * @FilePath: /v3ts-lockin/src/layouts/default/side/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { useDesign } from '@/hooks/web/useDesgin';

  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { useSiderEvent, useTrigger } from './useLayoutSider';
  import LayoutTrigger from '../trigger/index.vue';
  import LayoutMenu from '../menu/index.vue';
  const { getMenuWidth, getCollapsed, getMenuTheme } = useMenuSetting();
  const { getCollapsedWidth, onBreakpointChange } = useSiderEvent();
  const { prefixCls } = useDesign('layout-sideBar');

  const { getMenuFixed } = useMenuSetting();

  const { getShowTrigger } = useTrigger(ref(false));

  const getSiderClass = computed(() => {
    return [
      prefixCls,
      {
        [`${prefixCls}--fixed`]: unref(getMenuFixed),
      },
    ];
  });
</script>

<template>
  <Layout.Sider
    ref="sideRef"
    collapsible
    :class="getSiderClass"
    :width="getMenuWidth"
    :collapsed="getCollapsed"
    :collapsed-width="getCollapsedWidth"
    :theme="getMenuTheme"
    @breakpoint="onBreakpointChange"
  >
    <template #trigger v-if="getShowTrigger">
      <LayoutTrigger />
    </template>
    <LayoutMenu :theme="getMenuTheme" />
  </Layout.Sider>
</template>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sideBar';

  .@{prefix-cls} {
    // z-index: inhe;
  }
</style>
