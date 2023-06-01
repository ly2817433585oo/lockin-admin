<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-05-19 16:04:24
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-06-01 14:45:33
 * @FilePath: /v3ts-lockin/src/components/Icon/src/Icon.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { computed, CSSProperties } from 'vue';
  import SvgIcon from './SvgIcon.vue';
  import { Icon } from '@iconify/vue';

  // import Iconify from '@purge-icons/generated';
  import { isString } from '@/utils/is';

  defineOptions({ name: 'Icon' });

  const SVG_END_WITH_FLAG = '|svg';
  interface props {
    icon: string;
    color?: string;
    size?: string | number;
    spin?: boolean;
    prefix?: string;
  }
  const props = withDefaults(defineProps<props>(), {
    size: 16,
    spin: false,
    prefix: '',
  });

  const isSvgIcon = computed(() => props.icon.endsWith(SVG_END_WITH_FLAG));
  const getSvgIcon = computed(() => props.icon.replace(SVG_END_WITH_FLAG, ''));

  const getWrapStyle = computed((): CSSProperties => {
    const { size, color } = props;
    let fs = size;
    if (isString(fs)) {
      fs = parseInt(size as string, 10);
    }

    return {
      fontSize: `${fs} px`,
      color: color,
      display: 'inline-flex',
    };
  });
</script>

<template>
  <SvgIcon :size="size" :name="getSvgIcon" v-if="isSvgIcon" />
  <span
    v-else
    :style="getWrapStyle"
    :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']"
  >
    <Icon :icon="icon"></Icon>
  </span>
</template>

<style scoped lang="less">
  .app-iconify {
    display: inline-block;

    &-spin {
      svg {
        animation: loadingCircle 1s infinite linear;
      }
    }
  }
</style>
