<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-05-05 09:27:06
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-26 14:05:26
 * @FilePath: /v3ts-lockin/src/components/Menu/src/componets/MenuItemContent.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { computed } from 'vue';
  import { contentProps } from '../props';
  import { Icon } from '@/components/Icon/index';
  const props = defineProps(contentProps);
  const getName = computed(() => props.item?.name);
</script>

<template>
  <span class="flex items-center">
    <!-- <Icon :icon="'mdi-light:home'" :color="'blue'"></Icon> -->
    {{ getName }}
  </span>
</template>

<style scoped lang="less"></style>
