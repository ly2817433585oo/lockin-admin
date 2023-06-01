<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-05-29 11:04:38
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-31 15:35:58
 * @FilePath: /v3ts-lockin/src/layouts/default/header/cpns/user-dropdown/DropDownItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { Icon } from '@/components/Icon';
  import { Menu } from 'ant-design-vue';
  interface propsType {
    itemKey: string;
    icon: string;
    text: string;
  }
  defineProps<propsType>();
  defineOptions({ name: 'DropDownItem' });
</script>

<template>
  <Menu.Item :key="itemKey">
    <template #icon>
      <Icon :icon="icon"></Icon>
    </template>
    {{ text }}
  </Menu.Item>
</template>

<style scoped lang="less"></style>
