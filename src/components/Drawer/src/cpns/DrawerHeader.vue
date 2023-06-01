<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-05-31 16:27:20
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-06-01 13:32:53
 * @FilePath: /v3ts-lockin/src/components/Drawer/src/cpns/DrawerHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { BasicTitle } from '@/components/Basic';
  import { useDesign } from '@/hooks/web/useDesgin';

  interface propsType {
    title: string;
  }
  withDefaults(defineProps<propsType>(), {
    title: '',
  });
  defineOptions({ name: 'DrawerHeader' });
  // const emit = defineEmits(['close']);
  const { prefixCls } = useDesign('basic-drawer-header');

  // function handleClose() {
  //   emit('close');
  // }
</script>

<template>
  <BasicTitle :class="prefixCls">
    <slot name="title"></slot>
    {{ !$slots.title ? title : '' }}
  </BasicTitle>
</template>

<style scoped lang="less"></style>
