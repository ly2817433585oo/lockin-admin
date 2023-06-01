/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-19 22:52:31
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-22 18:55:30
 * @FilePath: /v3ts-lockin/src/logics/initAppConig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { ProjectConfig } from '#/config';

// CFG config
import { PROJ_CFG_KEY } from '@/enums/cacheEnum';

import projectSetting from '@/settings/projectSetting';
import { useAppStore } from '@/store/modules/app';
import { deepMerge } from '@/utils';
import { Persistent } from '@/utils/cache/persistent';

export function initAppConfigStore() {
  // const localStore =  useLocaleStore();
  const appStore = useAppStore();
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});
  // const darkMode = appStore.getDarkMode;
  // todo 判断是否开了 灰色模式 和 色弱模式 并修改主题色

  appStore.setProjectConfig(projCfg);
  // todo 初始化 黑暗模式
  // todo
  // todo 清除无用的本地缓存
}
