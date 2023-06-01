<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-05-29 14:36:34
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-31 15:43:10
 * @FilePath: /v3ts-lockin/src/layouts/default/setting/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { useDrawer } from '@/components/Drawer/src/useDrawer';
  import { Icon } from '@/components/Icon';

  import SettingDrawer from './SettingDrawer';
  defineOptions({ name: 'SettingDrawer' });

  const {
    register,
    methods: { openDrawer },
  } = useDrawer();
</script>

<template>
  <div @click="openDrawer(true)">
    <Icon icon="ion:settings-outline" />
    <SettingDrawer @register="register" />
  </div>
</template>

<style scoped lang="less"></style>
