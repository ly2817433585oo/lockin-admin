/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-09 19:02:09
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-12 13:50:52
 * @FilePath: /v3ts-lockin/src/layouts/default/setting/handler.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useAppStore } from '@/store/modules/app';
import type { ProjectConfig } from '#/config';

export function baseHandler(event: any, value: any) {
  const appStore = useAppStore();
  const config = handler(event, value);
  appStore.setProjectConfig(config);
  // if(event === Handle)
}　　　　　




export function handler(event: any, value: any): DeepPartial<ProjectConfig> {
  const appStpre = useAppStore();

  switch (event) {
  }

  return;
}
