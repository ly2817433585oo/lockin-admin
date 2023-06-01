<script setup lang="ts">
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons-vue';
  const { getCollapsed, toggleCollapsed } = useMenuSetting();
</script>

<template>
  <div @click.stop="toggleCollapsed">
    <DoubleRightOutlined v-if="getCollapsed"></DoubleRightOutlined>
    <DoubleLeftOutlined v-else></DoubleLeftOutlined>
  </div>
</template>

<style scoped lang="less"></style>
