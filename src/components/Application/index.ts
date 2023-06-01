/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-20 15:14:48
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-28 16:01:46
 * @FilePath: /v3ts-lockin/src/components/Application/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { withInstall } from '@/utils';

import appProvider from './src/AppProvider.vue';
import appLogo from './src/AppLogo.vue';
import appDarkModeToggle from './src/AppDarkModeToggle.vue';

export { userAppProviderContext } from './src/useAppContext';

export const AppProvider = withInstall(appProvider);
export const AppLogo = withInstall(appLogo);
export const AppDarkModeToggle = withInstall(appDarkModeToggle);
