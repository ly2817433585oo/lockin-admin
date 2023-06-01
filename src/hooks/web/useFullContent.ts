/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-09 14:52:24
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-09 14:54:55
 * @FilePath: /v3ts-lockin/src/hooks/web/useFoolContent.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { computed, unref } from 'vue';

import { useAppStore } from '@/store/modules/app';

import { useRouter } from 'vue-router';

export const useFullContent = () => {
  const appStore = useAppStore();
  const router = useRouter();
  const { currentRoute } = router;

  const getFullContent = computed(() => {
    const route = unref(currentRoute);
    const query = route.query;

    if (query && Reflect.has(query, '__full__')) {
      return true;
    }

    return appStore.getProjectConfig.fullContent;
  });

  return { getFullContent };
};
