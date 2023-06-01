<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-17 14:45:43
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-01 13:55:02
 * @FilePath: /v3ts-lockin/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { AppProvider } from '@/components/Application';
</script>

<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>

<style scoped></style>
