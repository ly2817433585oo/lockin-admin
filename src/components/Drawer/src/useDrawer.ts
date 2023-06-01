/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-05-29 22:15:11
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-31 16:04:30
 * @FilePath: /v3ts-lockin/src/components/Drawer/src/useDrawer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { DrawerInstance, ReturnMethods } from './typing';

import { isProdMode } from '@/utils/env';
import { tryOnMounted } from '@vueuse/core';
import { computed, getCurrentInstance, reactive, ref, toRaw, unref } from 'vue';
import { isEqual } from 'lodash-es';
import { DrawerProps } from 'ant-design-vue';

const dataTransferRef = reactive<any>({});

// drawer visible status manager
const visibleData = reactive<{ [key: number]: boolean }>({});

export function useDrawer() {
  if (!getCurrentInstance()) {
    throw new Error('useDrawer() can only be used inside setup() or functional components! ');
  }
  const drawer = ref<DrawerInstance | null>(null);
  const loaded = ref<Nullable<boolean>>(false);
  const uid = ref<string>('');

  function register(drawerInstance: DrawerInstance, uuid: string) {
    isProdMode() &&
      tryOnMounted(() => {
        drawer.value = null;
        loaded.value = null;
        dataTransferRef[unref(uid)] = null;
      });

    // 已注册
    if (unref(loaded) && isProdMode() && drawerInstance === unref(drawer)) {
      return;
    }
    uid.value = uuid;
    drawer.value = drawerInstance;
    loaded.value = true;

    drawerInstance.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible;
    };
  }

  const getInstance = () => {
    const instance = unref(drawer);
    if (!instance) {
      // todo
      console.log('userDrawer instance is undefined!');
    }
    return instance;
  };

  const methods: ReturnMethods = {
    setDrawerProps: (props: Partial<DrawerProps> | boolean) => {
      console.log(props);
      getInstance()?.setDrawerProps(props);
    },

    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)];
    }),

    openDrawer: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      getInstance()?.setDrawerProps(visible);
      if (!data) return;

      const urUid = unref(uid);
      const rawData = toRaw(data);
      if (openOnSet) {
        dataTransferRef[urUid] = null;
        dataTransferRef[urUid] = rawData;
        return;
      }

      const equal = isEqual(toRaw(dataTransferRef[urUid]), rawData);
      if (!equal) {
        dataTransferRef[urUid] = rawData;
      }
    },

    closeDrawer: () => {
      getInstance()?.setDrawerProps(false);
    },
  };

  return { register, methods };
}
