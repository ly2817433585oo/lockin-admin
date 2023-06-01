/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-18 20:05:09
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-20 09:16:24
 * @FilePath: /v3ts-lockin/src/utils/http/axiosTransform.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/*
 Data processing class, can be configured according to the project
 */
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { RequestOptions, Result } from "#/axios";

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export abstract class AxiosTransform {
  /* 
    processing configuration before request 请求之前处理请求参数
  */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions
  ) => AxiosRequestConfig;

  /* 响应处理器 */
  transformResponseHook?: (
    res: AxiosResponse<Result>,
    options: RequestOptions
  ) => any;

  /* 请求失败处理 */
  reqeustCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  /**
   *  请求的拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig;

  /**
   * 响应的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /* 
    请求之前的错误拦截器
  */
  requestInterceptorsCatch?: (error: Error) => void;

  /* 
    响应的错误拦截器
  */
  responseInterceptorsCatch?: (
    axiosInstance: AxiosResponse,
    error: Error
  ) => void;
}
