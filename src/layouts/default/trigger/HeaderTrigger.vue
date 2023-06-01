<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-22 14:07:46
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-06-01 15:05:22
 * @FilePath: /v3ts-lockin/src/layouts/default/trigger/HeaderTrigger.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { ThemeEnum } from '@/enums/appEnum';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { useDesign } from '@/hooks/web/useDesgin';
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';

  interface propsTyoe {
    theme?: ThemeEnum;
  }
  defineProps<propsTyoe>();

  const { prefixCls } = useDesign('layout-header-trigger');

  const { toggleCollapsed, getCollapsed } = useMenuSetting();
</script>

<template>
  <span :class="[prefixCls, theme]" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="getCollapsed" />
    <MenuFoldOutlined v-else />
  </span>
</template>

<style scoped lang="less">
</style>
