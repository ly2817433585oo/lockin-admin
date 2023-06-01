/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-17 14:49:34
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-21 10:35:21
 * @FilePath: /v3ts-lockin/types/module.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}

// to record
declare module "virtual:*" {
  const result: any;
  export default result;
}
