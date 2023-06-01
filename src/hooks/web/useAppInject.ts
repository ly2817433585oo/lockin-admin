/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-09 14:28:34
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-09 14:30:00
 * @FilePath: /v3ts-lockin/src/hooks/web/useAppInject.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { userAppProviderContext } from '@/components/Application';
import { computed, unref } from 'vue';

export function useAppInject() {
  const values = userAppProviderContext();

  return {
    getIsMobile: computed(() => unref(values.isMobile)),
  };
}
