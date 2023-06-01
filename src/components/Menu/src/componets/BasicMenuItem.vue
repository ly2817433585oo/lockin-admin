<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-05-05 09:26:08
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-09 16:37:17
 * @FilePath: /v3ts-lockin/src/components/Menu/src/componets/BasicMenuItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { Menu } from 'ant-design-vue';
  import MenuItemContent from './MenuItemContent.vue';
  import { contentProps } from '../props';

  const props = defineProps(contentProps);
</script>

<template>
  <Menu.Item>
    <MenuItemContent v-bind="props" />
  </Menu.Item>
</template>

<style scoped lang="less"></style>
