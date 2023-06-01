<!--
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-05-28 13:59:20
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-06-01 14:48:51
 * @FilePath: /v3ts-lockin/src/layouts/default/header/cpns/user-dropdown/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { ThemeEnum } from '@/enums/appEnum';
  import { useDesign } from '@/hooks/web/useDesgin';
  import { useUserStore } from '@/store/modules/user';
  import { Dropdown, Menu } from 'ant-design-vue';
  import { computed } from 'vue';
  import headerImg from '@/assets/imgs/headerImg.png';
  import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';
  import { createAsyncComponent } from '@/utils/factory/createAsnycComponent';

  const MenuItem = createAsyncComponent(() => import('./DropDownItem.vue'));
  type MenuEvent = 'logout' | 'doc' | 'lock';
  interface propsType {
    theme?: ThemeEnum;
  }

  defineOptions({ name: 'UserDropDown' });

  defineProps<propsType>();

  const { prefixCls } = useDesign('header-user-dropdown');
  const userStore = useUserStore();

  const getUserInfo = computed(() => {
    const { realName = '', avatar, desc } = userStore.getUserInfo || {};
    return { realName, avatar: avatar || headerImg, desc };
  });

  const handleLock = () => {
    // todo
  };
  const handleLoginOut = () => {
    // todo
    userStore.confirmLoginOut();
  };

  const openDoc = () => {
    // todo
  };

  function handleMenuClick(e: MenuInfo) {
    switch (e.key as MenuEvent) {
      case 'logout':
        handleLoginOut();
        break;
      case 'doc':
        openDoc();
        break;
      case 'lock':
        handleLock();
        break;
    }
  }
</script>

<template>
  <Dropdown placement="bottomLeft">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :src="getUserInfo.avatar" :class="`${prefixCls}__avatar`" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name`" class="truncate">
          {{ getUserInfo.realName }}
        </span>
      </span>
    </span>
    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem item-key="doc" icon="ion:document-text-outline" text="文档" />
        <MenuItem item-key="lock" icon="ion:lock-closed-outline" text="锁定屏幕" />
        <MenuItem item-key="logout" icon="ion:power-outline" text="退出系统" />
      </Menu>
    </template>
  </Dropdown>
</template>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    height: @header-height;
    padding: 0 0 0 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__avatar {
      border-radius: 50%;
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }
    }
  }
</style>
