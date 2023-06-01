/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-02 16:16:48
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-06 10:39:14
 * @FilePath: /v3ts-lockin/src/layouts/default/menu/useLayoutMenu.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Menu } from '@/router/types';
import type { Ref } from 'vue';
import { watch, unref, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { MenuSplitTypeEnum } from '@/enums/menuEnum';
import { useThrottleFn } from '@vueuse/core';
import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
// import { getCHild } from '@/router/menus';
import { usePermissionStore } from '@/store/modules/permission';
import { useAppInject } from '@/hooks/web/useAppInject';
import { getMenus } from '@/router/menus';

export function useSplitMenu(splitType: Ref<MenuSplitTypeEnum>) {
  const menusRef = ref<Menu[]>([]);
  const { currentRoute } = useRouter();
  const { getIsMobile } = useAppInject();
  const permissionStore = usePermissionStore();
  const { setMenuSetting, getIsHorizontal, getSplit } = useMenuSetting();

  // const throttleHandleSplitLeftMenu = useThrottleFn(handle)

  const splitNotLeft = computed(
    () => unref(splitType) !== MenuSplitTypeEnum.LEFT && !unref(getIsHorizontal),
  );

  const getSplitTop = computed(() => unref(splitType) === MenuSplitTypeEnum.LEFT);

  const normalType = computed(() => {
    return unref(splitType) === MenuSplitTypeEnum.NONE || !unref(getSplit);
  });

  async function genMenus() {
    if (unref(normalType) || unref(getIsMobile)) {
      menusRef.value = await getMenus();
      return;
    }

    // todo
  }
  genMenus();

  return { menusRef };

  // watch(
  //   [() => unref(currentRoute).path, () => unref(splitType)],
  //   async ([path]: [string, MenuSplitTypeEnum]) => {
  //     if (unref(splitNotLeft) || unref(getIsMobile)) return;

  //     const { meta } = unref(currentRoute);
  //     const currentActiveMenu = meta.currentActiveMenu as string;

  //     // let parentPath = await getCurrentParentPath
  //   },
  //   {
  //     immediate: true,
  //   },
  // );
}
