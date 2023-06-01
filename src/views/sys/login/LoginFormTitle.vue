<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-22 14:01:23
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-23 10:53:55
 * @FilePath: /v3ts-lockin/src/views/sys/login/LoginFormTitle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { computed,unref } from '@vue/reactivity';
import {LoginStateEnum, useLoginState} from './useLogin'

  const {getLoginState} = useLoginState();

  const getFormTitle = computed(()=>{
    const titleObj = {
      [LoginStateEnum.LOGIN]:'登录'
    }
    return titleObj[unref(getLoginState)]
  })
</script>

<template>
  <h2 class="text-2xl mb-3 font-bold text-center xl:text-left xl:text-left">
    {{getFormTitle}}
  </h2>
</template>

<style scoped lang="less"></style>
