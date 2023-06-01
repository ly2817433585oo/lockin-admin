/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-18 16:37:22
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-26 13:57:35
 * @FilePath: /v3ts-lockin/src/router/routes/modules/dashboard.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  meta: {
    orderNo: 10,
    title: 'Dashoard',
    icon:'mdi-light:home'
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        title: '分析页',
      },
    },
  ],
};

export default dashboard;
