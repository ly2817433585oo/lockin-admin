<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-23 23:59:55
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-23 16:32:13
 * @FilePath: /v3ts-lockin/src/components/Icon/src/SvgIcon.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-23 23:59:55
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-29 15:57:56
 * @FilePath: /v3ts-lockin/src/components/Icon/src/SvgIcon.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { withDefaults, computed, CSSProperties } from 'vue';
  import { useDesign } from '@/hooks/web/useDesgin';
  interface Props {
    prefix?: string;
    name: string;
    size?: number | string;
    spin?: boolean;
  }
  const { prefixCls } = useDesign('svg-icon');
  const props = withDefaults(defineProps<Props>(), {
    prefix: 'icon',
    size: 16,
    spin: false,
  });
  const symbolId = computed(() => `#${props.prefix}-${props.name}`);

  const getStyle = computed((): CSSProperties => {
    const { size } = props;
    let s = `${size}`;
    s = `${s.replace('px', '')}px`;
    return {
      width: s,
      height: s,
    };
  });
</script>

<template>
  <svg :class="[prefixCls, $attrs.class, props.spin && 'svg-icon-spin']" :style="getStyle">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-svg-icon';

  .@{prefix-cls} {
    display: inline-block;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentcolor;
  }

  .svg-icon-spin {
    animation: loadingCircle 1s infinite linear;
  }
</style>
