/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-09 18:21:52
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-22 16:54:17
 * @FilePath: /v3ts-lockin/src/layouts/default/sider/useLayoutSider.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEf
 */
import { Ref } from 'vue';

import { useAppStore } from '@/store/modules/app';
import { computed, unref, onMounted, nextTick } from 'vue';
import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
import { TriggerEnum } from '@/enums/menuEnum';

export function useSiderEvent() {
  const appStore = useAppStore();
  const { getMiniWidthNumber } = useMenuSetting();

  const getCollapsedWidth = computed(() => {
    return unref(getMiniWidthNumber);
  });

  function onBreakpointChange(broken: boolean) {
    appStore.setProjectConfig({
      menuSetting: {
        siderHidden: broken,
      },
    });
  }

  return { getCollapsedWidth, onBreakpointChange };
}

// Handle related operations of menu folding
export function useTrigger(getIsMobile: Ref<boolean>) {
  const { getTrigger, getSplit } = useMenuSetting();

  const getShowTrigger = computed(() => {
    const trigger = unref(getTrigger);
    console.log(trigger, 'trigger');
    return (
      trigger !== TriggerEnum.NONE &&
      !unref(getIsMobile) &&
      (trigger === TriggerEnum.FOOTER || unref(getSplit))
    );
  });

  const getTriggerAttr = computed(() => {
    if (unref(getShowTrigger)) {
      return {};
    }
    return {
      trigger: null,
    };
  });

  return { getShowTrigger, getTriggerAttr };
}
