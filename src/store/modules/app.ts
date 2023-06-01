/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-28 15:40:56
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-22 17:04:50
 * @FilePath: /v3ts-lockin/src/store/modules/app.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MenuSetting, ProjectConfig, HeaderSetting } from '#/config';
import { store } from '@/store';
import { ThemeEnum } from '@/enums/appEnum';
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '@/enums/cacheEnum';
import { Persistent } from '@/utils/cache/persistent';
import { defineStore } from 'pinia';
import { darkMode } from '@/settings/designSetting';
import { deepMerge } from '@/utils';

interface AppState {
  darkMode?: ThemeEnum;
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
  // beforeMiniInfo: BeforeMiniState;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || darkMode;
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
  },
  actions: {
    setDarkMode(mode: ThemeEnum) {
      this.darkMode = mode;
      // 存入localStorage
      // todo
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      console.log(this.projectConfig, 'this.projectConfig');
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
  },
});

export function useAppStoreWtihOut() {
  return useAppStore(store);
}
