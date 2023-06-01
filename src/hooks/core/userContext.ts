/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-20 22:38:00
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-20 23:07:59
 * @FilePath: /v3ts-lockin/src/hooks/core/userContext.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  inject,
  InjectionKey,
  UnwrapRef,
  reactive,
  readonly as defineReadonly,
  provide,
} from "vue";

export interface CreateContextOptions {
  readonly?: boolean;
  createProvider?: boolean;
  native?: boolean;
}

// 深度unwrap
type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
};


export function createConetxt<T>(
  context: any,
  key: InjectionKey<T> = Symbol(),
  options: CreateContextOptions = {}
) {
  const { readonly = true, createProvider = false, native = false } = options;
  const state = reactive(context);
  const provideData = readonly ? defineReadonly(state) : state;
  !createProvider && provide(key, native ? context : provideData);
  return {
    state,
  };
}

// 重载
export function useContext<T>(key: InjectionKey<T>, native?: boolean): T;

export function useContext<T>(
  key: InjectionKey<T> = Symbol(),
  defaultValue?: any
): ShallowUnwrap<T> {
  return inject(key, defaultValue || {});
}
