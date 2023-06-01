<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-05-26 14:39:23
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-06-01 15:01:39
 * @FilePath: /v3ts-lockin/src/layouts/default/header/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { AppLogo } from '@/components/Application';
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting';
  import { useAppInject } from '@/hooks/web/useAppInject';
  import { useDesign } from '@/hooks/web/useDesgin';
  import { Layout } from 'ant-design-vue';
  import { computed, unref } from 'vue';

  import LayoutTrigger from '../trigger/index.vue';
  import LayoutMenu from '../menu/index.vue';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { MenuModeEnum } from '@/enums/menuEnum';

  import UserDropDown from './cpns/user-dropdown/index.vue';
  import { createAsyncComponent } from '@/utils/factory/createAsnycComponent';

  const SettingDrawer = createAsyncComponent(() => import('../setting/index.vue'), {
    loading: true,
  });
  defineOptions({ name: 'LayoutHeader' });

  const { getHeaderTheme, getShowHeaderLogo } = useHeaderSetting();

  const { getMenuMode, getSplitType } = useMenuSetting();

  const { prefixCls } = useDesign('layout-header');
  const { getIsMobile } = useAppInject();

  const getHeaderClass = computed(() => {
    const theme = unref(getHeaderTheme);
    return [
      prefixCls,
      {
        [`${prefixCls}--${theme}`]: theme,
        // [`${prefixCls}--fixed`]:props.
      },
    ];
  });
</script>

<template>
  <Layout.Header :class="getHeaderClass">
    <!-- left start logo/trigger/breadcrumb -->
    <div :class="`${prefixCls}-left`">
      <AppLogo
        v-if="getShowHeaderLogo || getIsMobile"
        :class="`${prefixCls}-logo`"
        :theme="getHeaderTheme"
      ></AppLogo>
      <LayoutTrigger :theme="getHeaderTheme" :sider="false" />
    </div>
    <!-- left end -->

    <!-- menu start -->
    <div :class="`${prefixCls}-menu`">
      <LayoutMenu
        :theme="getHeaderTheme"
        :is-horizontal="true"
        :split-type="getSplitType"
        :menu-mode="MenuModeEnum.HORIZONTAL"
        :show-logo="false"
      />
    </div>
    <!-- menu end -->
    <!-- action -->
    <div :class="`${prefixCls}-action`">
      <UserDropDown :theme="getHeaderTheme"></UserDropDown>

      <SettingDrawer :class="`${prefixCls}-action__item`" />
    </div>
  </Layout.Header>
</template>

<style lang="less">
  @import url('./index.less');
</style>
