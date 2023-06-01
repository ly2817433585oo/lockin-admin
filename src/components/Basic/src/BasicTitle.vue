<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-05-31 16:36:29
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-06-01 13:40:07
 * @FilePath: /v3ts-lockin/src/components/Basic/src/BasicTitle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { useDesign } from '@/hooks/web/useDesgin';
  import { computed, useSlots } from 'vue';

  defineOptions({ name: 'BasicTitle' });

  interface propsType {
    helpMessage?: string | string[];
    span?: boolean;
    normal?: boolean;
  }
  const props = withDefaults(defineProps<propsType>(), {
    helpMessage: '',
  });

  const { prefixCls } = useDesign('basic-title');
  const slots = useSlots();
  const getClass = computed(() => {
    return [
      prefixCls,
      { [`${prefixCls}-show-span`]: props.span && slots.default },
      { [`${prefixCls}-normal`]: props.normal },
    ];
  });
</script>

<template>
  <span :class="getClass"> <slot></slot> </span>
</template>

<style scoped lang="less"></style>
