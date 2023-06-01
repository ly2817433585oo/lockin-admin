<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-22 14:07:28
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-28 13:05:38
 * @FilePath: /v3ts-lockin/src/layouts/default/trigger/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import SiderTrigger from './SiderTrigger.vue';
  import HeaderTrigger from './HeaderTrigger.vue';
  import { ThemeEnum } from '@/enums/appEnum';

  interface propsType {
    sider: boolean;
    theme?: ThemeEnum;
  }
  const props = withDefaults(defineProps<propsType>(), {
    sider: true,
  });
  console.log(props);
</script>

<template>
  <SiderTrigger v-if="props.sider" />
  <HeaderTrigger v-else :theme="props.theme" />
</template>

<style scoped lang="less"></style>
