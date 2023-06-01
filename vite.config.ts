/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-17 14:45:43
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-22 13:20:26
 * @FilePath: /v3ts-lockin/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path, { resolve } from 'path';
import { loadEnv } from 'vite';
import { wrapperEnv } from './build/utils';

import type { UserConfig, ConfigEnv } from 'vite';
import { createVitePlugins } from './build/vite/plugins';
// https://vitejs.dev/config/

function pathResolve(dir: string) {
  return path.resolve(process.cwd(), '.', dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';

  return {
    define: {
      // 处理vite-plugin-theme在vite 3.x版本的问题
      __COLOR_PLUGIN_OUTPUT_FILE_NAME__: undefined,
      __PROD__: true,
      __COLOR_PLUGIN_OPTIONS__: {},
    },
    resolve: {
      alias: {
        '@': pathResolve('src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true;@import (reference) "${resolve('src/design/config.less')}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      include: ['@iconify/iconify'],
    },
  };
};

// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//     },
//     extensions: [".mjs", ".ts", ".js", ".vue"],
//   },
// });
