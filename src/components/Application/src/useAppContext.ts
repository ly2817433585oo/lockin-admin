/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-20 22:28:09
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-20 22:34:11
 * @FilePath: /v3ts-lockin/src/components/Application/src/useAppContext.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { InjectionKey, Ref } from "vue";
import { useContext, createConetxt } from "@/hooks/core/userContext";

// 全局注入类型
export interface AppProviderContextProps {
  prefixCls: Ref<string>;
  isMobile: Ref<boolean>;
}

// 拦截类型， 用于对provide/inject的传参进行类型约束
const key: InjectionKey<AppProviderContextProps> = Symbol();

export function createAppProviderContext(context: AppProviderContextProps) {
  return createConetxt<AppProviderContextProps>(context, key);
}

export function userAppProviderContext() {
  return useContext<AppProviderContextProps>(key);
}
