<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-24 16:39:27
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-09 21:02:45
 * @FilePath: /v3ts-lockin/src/components/Application/src/AppLogo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-24 16:39:27
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-24 17:11:03
 * @FilePath: /v3ts-lockin/src/components/Application/src/AppLogo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { computed } from 'vue';
  import { useGlobSetting } from '@/hooks/setting';
  import { useDesign } from '@/hooks/web/useDesgin';
  import { useUserStore } from '@/store/modules/user';

  const props = defineProps({
    // 主题
    theme: {
      type: String,
      validator: (v: string) => ['light', 'dark'].includes(v),
    },
    // 是否显示标题
    showTitle: {
      type: Boolean,
      default: true,
    },
    // 标题是否一直显示
    alwaysShowTitle: {
      type: Boolean,
    },
  });
  const { prefixCls } = useDesign('app-logo');
  // const {get} = use
  const useStore = useUserStore();
  const { title } = useGlobSetting();

  const getTitleCLass = computed(() => [`${prefixCls}__title`]);

  const getAppLogoClass = computed(() => [prefixCls]);
</script>

<template>
  <div class="anticon" :class="getAppLogoClass">
    <img src="@/assets/svg/logo3.svg" />
    <div class="ml-2 truncate md:opacity-100" :class="getTitleCLass" v-show="showTitle">
      {{ title }}
    </div>
  </div>
</template>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;

    &__title {
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
      line-height: normal;
    }
  }
</style>
