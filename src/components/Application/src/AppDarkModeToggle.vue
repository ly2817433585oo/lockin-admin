<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-25 15:46:32
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-06 15:39:57
 * @FilePath: /v3ts-lockin/src/components/Application/src/AppDarkModeToggle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { useDesign } from '@/hooks/web/useDesgin';
  import { computed, unref } from 'vue';
  import { ThemeEnum } from '@/enums/appEnum';
  import { updateDarkTheme } from '@/logics/theme/dark';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';

  import { SvgIcon } from '@/components/Icon';
  const { prefixCls } = useDesign('dark-switch');

  const { setDarkMode, getDarkMode } = useRootSetting();

  const isDark = computed(() => getDarkMode.value === ThemeEnum.DARK);

  const getClass = computed(() => [prefixCls, { [`${prefixCls}--dark`]: unref(isDark) }]);

  function toggleDarkMode() {
    const darkMode = getDarkMode.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
    setDarkMode(darkMode);
    updateDarkTheme(darkMode);
  }
</script>

<template>
  <div :class="getClass" @click="toggleDarkMode">
    <div :class="`${prefixCls}--inner`"></div>
    <SvgIcon size="14" name="sun" />
    <SvgIcon size="14" name="moon" />
  </div>
</template>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-dark-switch';

  html[data-theme='dark'] {
    .@{prefix-cls} {
      border: 1px solid rgb(196 188 188);
    }
  }

  .@{prefix-cls} {
    position: relative;
    display: flex;
    width: 50px;
    height: 26px;
    padding: 0 6px;
    margin-left: auto;
    cursor: pointer;
    background-color: #151515;
    border-radius: 30px;
    justify-content: space-between;
    align-items: center;

    &--inner {
      position: absolute;
      z-index: 1;
      width: 18px;
      height: 18px;
      background-color: #fff;
      border-radius: 50%;
      transition: transform 0.5s, background-color 0.5s;
      will-change: transform;
    }

    &--dark {
      .@{prefix-cls}--inner {
        transform: translateX(calc(100% + 2px));
      }
    }
  }
</style>
