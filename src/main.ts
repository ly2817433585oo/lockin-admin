/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-17 14:45:43
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-22 18:52:41
 * @FilePath: /v3ts-lockin/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import "virtual:windi-bass.css";
// import "virtual:windi-components.css";
// import "virtual:windi-utilities.css";
import 'virtual:windi.css';
import '@/design/index.less';
import 'virtual:svg-icons-register';
import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@/router';
import { store } from '@/store';
import { setupRouterGuard } from './router/guard';
import { isDevMode } from './utils/env';
import { initAppConfigStore } from '@/logics/initAppConig';

if (isDevMode()) {
  import('ant-design-vue/es/style');
}

// async function bootstrap() {
//   const app = createApp(App);

  
// }
createApp(App).use(store).use(router).mount('#app');

initAppConfigStore();

setupRouterGuard(router);
