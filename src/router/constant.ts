/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-18 14:41:16
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-04 17:17:02
 * @FilePath: /v3ts-lockin/src/router/constant.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const LAYOUT = () => import('@/layouts/default/index.vue');

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: _name || PARENT_LAYOUT_NAME,
      });
    });
};

// export const
