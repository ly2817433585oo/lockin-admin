/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-17 16:13:22
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-22 15:55:25
 * @FilePath: /v3ts-lockin/build/vite/plugins/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueTypeImports from '@rah-emil/vite-plugin-vue-type-imports';
// 可能会导致debugger位置、断点位置和调试位置不一致问题
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

import purgeIcons from 'vite-plugin-purge-icons';

import windiCSS from 'vite-plugin-windicss';
import { configSvgIconsPlugin } from './svgSprite';
import { configThemePlugin } from './theme';
import { configMockPlugin } from './mock';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;
  console.log(viteEnv);

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),

    vueJsx(),
    // 支持script setup语法糖 下的 组件命名
    vueSetupExtend(),
    //
    // VueTypeImports(),
  ];

  // vite-plugin-windicss
  vitePlugins.push(windiCSS());

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-theme
  vitePlugins.push(configThemePlugin(isBuild));

  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // vitePlugins.push(purgeIcons());

  return vitePlugins;
}
