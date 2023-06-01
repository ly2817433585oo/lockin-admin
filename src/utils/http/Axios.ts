/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-18 20:40:17
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-01 17:58:23
 * @FilePath: /v3ts-lockin/src/utils/http/Axios.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { RequestOptions, Result } from '#/axios';
import type { CreateAxiosOptions } from './axiosTransform';

import { cloneDeep } from 'lodash-es';
import { isFunction } from '@/utils/is';

import axios from 'axios';
import qs from 'qs';
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum';

export class LAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    /* 配置拦截器 */
    this.setupInterceptors();
  }

  private getTransform() {
    const { transform } = this.options;
    return transform;
  }
  /*
    配置拦截器
    请求拦截先添加的后执行，响应拦截后添加的先执行
 */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    // request interceptor configuration  processing 请求拦截器
    this.axiosInstance.interceptors.request.use(
      // @ts-ignore
      (config: AxiosRequestConfig) => {
        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config, this.options);
        }
        return config;
      },
      undefined,
    );
    // request interrceptor error capture 请求失败拦截器
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    // Response result interceptor processing 响应成功拦截器
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    // Response result interceptor error capture 响应错误拦截器
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, (error) => {
        // @ts-ignore
        return responseInterceptorsCatch(this.axiosInstance, error);
      });
  }

  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];
    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }
    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config);
    // cancel processing
    // 如果cancelToken 使用深拷贝  则外层无法使用cancel 来取笑请求
    // if(config.cancelToken) {
    //   conf.cancelToken = config.cancelToken
    // }

    const transform = this.getTransform();

    const { requestOptions } = this.options;
    // 用单独请求的requestOptions 覆盖创建http实例时的option
    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    // 以下三个钩子主要用来根据 requestOptions 处理请求参数和返回数据
    const { beforeRequestHook, transformResponseHook, reqeustCatchHook } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }

    conf.requestOptions = opt;
    // todo support form data
    conf = this.supportFormData(conf);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('requrst error!'));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (reqeustCatchHook && isFunction(reqeustCatchHook)) {
            reject(reqeustCatchHook(e, opt));
            return;
          }

          if (axios.isAxiosError(e)) {
            // todo rewrite error message from axios in here
          }
          reject(e);
        });
    });
  }
}
