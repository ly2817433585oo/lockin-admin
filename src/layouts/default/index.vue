<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-18 16:40:03
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-28 12:43:18
 * @FilePath: /v3ts-lockin/src/layouts/default/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts" name="DefaultLayOut">
  import { Layout } from 'ant-design-vue';
  import { computed, unref } from 'vue';

  import LayoutSideBar from './sider/index.vue';
  import LayoutMutipleHeader from './header/MultipleHeader.vue';
  import { useDesign } from '@/hooks/web/useDesgin';
  import { useAppInject } from '@/hooks/web/useAppInject';
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  const { prefixCls } = useDesign('default-layout');
  // 判断是否为移动设备
  const { getIsMobile } = useAppInject();
  //
  const { getShowFullHeaderRef } = useHeaderSetting();

  const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting();

  const layoutClass = computed(() => {
    let cls: string[] = ['ant-layout'];
    cls.push('ant-layout-has-sider');
    // if (unref(getShowMenu)) {
    //   cls.push('ant-layout-has-sider');
    // }
    return cls;
  });
</script>

<template>
  <Layout :class="prefixCls">
    <Layout :class="[layoutClass]">
      <LayoutSideBar></LayoutSideBar>
      <Layout :class="`${prefixCls}-main`">
        <LayoutMutipleHeader />
      </Layout>
    </Layout>
  </Layout>
</template>

<style lang="less">
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;
    background-color: @content-bg;
    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
    }

    &-main {
      width: 100%;
      margin-left: 1px;
    }
  }
</style>
