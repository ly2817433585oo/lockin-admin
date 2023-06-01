/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-21 10:18:08
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-21 10:19:45
 * @FilePath: /v3ts-lockin/src/hooks/web/useDesgin.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { userAppProviderContext } from "@/components/Application";

export function useDesign(scope: string) {
  const values = userAppProviderContext();

  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls,
  };
}
