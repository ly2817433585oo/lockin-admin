<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-20 15:02:42
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-29 18:52:56
 * @FilePath: /v3ts-lockin/src/views/sys/login/Login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts" name="Login">
  import LoginForm from './LoginForm.vue';

  import { useDesign } from '@/hooks/web/useDesgin';
  import { AppLogo, AppDarkModeToggle } from '@/components/Application';

  const { prefixCls } = useDesign('login');
</script>

<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <div class="absolute top-4 right-4"> <AppDarkModeToggle /> </div>

    <img
      src="@/assets/svg/chilling.svg"
      class="w-1/5 absolute bottom-4 right-4 hidden xl:block enter-x"
    />

    <span class="-enter-x xl:hidden">
      <AppLogo></AppLogo>
    </span>

    <div class="container relative h-full py-2 mx-auto">
      <div class="flex h-full">
        <img
          src="@/assets/svg/dancing.svg"
          class="absolute h-4/5 -mt-16 -enter-x bottom-1/10 -enter-x hidden xl:block"
        />

        <div class="hidden xl:flex xl:flex-col xl: w-7/12">
          <AppLogo :show-title="true"> </AppLogo>
        </div>
        <div class="flex w-full h-full xl:w-5/12">
          <div
            :class="`${prefixCls}-form`"
            class="relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:shadow-none xl:bg-transparent sm:px-8 xl:p-4 sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
          >
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';
  @drak-bg: #293146;

  html[data-theme='dark'] {
    .@{prefix-cls} {
      background-color: @drak-bg;

      .ant-input,
      .ant-input-password {
        background-color: #232a3b;
      }

      .ant-btn:not(.ant-btn-link, .ant-btn-primary) {
        border: 1px solid #4a5569;
      }

      &-form {
        background: transparent !important;
      }
    }
  }
  .@{prefix-cls} {
    min-height: 100%;
    overflow: hidden;

    @media (max-width: @screen-xl) {
      background-color: @drak-bg;

      .@{prefix-cls}-form {
        background-color: #fff;
      }
    }

    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &__title {
        font-size: 16px;
        color: #fff;
      }

      img {
        width: 32px;
      }
    }

    .container {
      .@{logo-prefix-cls} {
        display: flex;
        height: 80px;

        &__title {
          font-size: 24px;
          color: @drak-bg;
        }

        img {
          width: 48px;
        }
      }
    }

    input:not([type='checkbox']) {
      min-width: 360px;

      @media (max-width: @screen-xl) {
        min-width: 320px;
      }

      @media (max-width: @screen-lg) {
        min-width: 260px;
      }

      @media (max-width: @screen-md) {
        min-width: 240px;
      }

      @media (max-width: @screen-sm) {
        min-width: 160px;
      }
    }
  }
</style>
