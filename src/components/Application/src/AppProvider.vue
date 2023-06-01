<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-20 23:08:43
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-24 16:39:13
 * @FilePath: /v3ts-lockin/src/components/Application/src/AppProvider.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts" name="AppProvider">
import { ref, withDefaults, toRefs } from "vue";
import { createAppProviderContext } from "./useAppContext";
import { prefixCls as prefixClsDef } from "@/settings/designSetting";

const props = withDefaults(
  defineProps<{
    prefixCls?: string;
  }>(),
  { prefixCls: prefixClsDef }
);
const isMobile = ref(false);
// const isSetState = ref(false);

const { prefixCls } = toRefs(props);

// inject variables into the global
createAppProviderContext({ prefixCls, isMobile });
</script>

<template>
  <slot></slot>
</template>
