/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-25 15:51:22
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-29 17:49:46
 * @FilePath: /v3ts-lockin/src/logics/theme/dark.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { darkCssIsReady, loadDarkThemeCss } from 'vite-plugin-theme/es/client';
import { addClass, hasClass, removeClass } from '@/utils/domUtils';

export async function updateDarkTheme(mode: string | null = 'light') {
  const htmlRoot = document.getElementById('htmlRoot');
  if (!htmlRoot) {
    return;
  }
  const hasDarkClass = hasClass(htmlRoot, 'dark');
  if (mode === 'dark') {
    if (import.meta.env.PROD && !darkCssIsReady) {
      await loadDarkThemeCss();
    }
    htmlRoot.setAttribute('data-theme', 'dark');
    if (!hasDarkClass) {
      addClass(htmlRoot, 'dark');
    }
  } else {
    htmlRoot.setAttribute('data-theme', 'light');
    if (hasDarkClass) {
      removeClass(htmlRoot, 'dark');
    }
  }
}
