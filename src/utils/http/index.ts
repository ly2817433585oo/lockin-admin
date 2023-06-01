/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-18 20:05:19
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-02 15:34:42
 * @FilePath: /v3ts-lockin/src/utils/http/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import type { AxiosResponse } from 'axios';
import type { RequestOptions } from '#/axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';

import { clone } from 'lodash-es';
import { LAxios } from './Axios';
import { deepMerge, setObjToUrlParams } from '@/utils';
import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums/httpEnum';
// import { useGlobSetting } from "@/hooks/setting";
import axios from 'axios';
import { isNull } from 'util';
import { isString } from '../is';
import { useGlobSetting } from '@/hooks/setting';

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;

// import { getToken } from "@/utils/auth";

const transform: AxiosTransform = {
  /* 
    处理响应数据。
  */
  transformResponseHook(res, options) {
    //todo i18n
    const { isTransformResponse, isReturnNativeResponse } = options;

    // 返回原始响应数据，包含响应头
    if (isReturnNativeResponse) {
      return res;
    }

    // 不进行任何处理 直接返回data
    if (!isTransformResponse) {
      return res.data;
    }

    // 错误时的返回
    const { data } = res;
    if (!data) {
      // todo
      throw new Error('request failed');
    }

    // 结构可在type.ts中定义
    const { code, result, message } = data;

    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
    if (hasSuccess) {
      // let successMsg = message;
      // if(isNull(successMsg) || )
      // todo 判断为空message 为定义的处理
      // todo 请求成功弹框选项的处理
      return result;
    }

    // todo 请求超时的处理
  },
  /* 
    请求之前处理config
  */
  beforeRequestHook: (config, options) => {
    console.log(config, options, 'beforeRequestHook');
    const { apiUrl, joinPrefix, joinParamsToUrl, formatData, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    // formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据
        // config.params = Object.assign(config.params || {},joinTimestamp(joinTime,false))
      } else {
        // 兼容restful 风格
        // config.url = config.url + params + `${joinTimestamp(joinTime,true)}`
      }
    } else {
      if (!isString(params)) {
        // formatDate && formatRequestDate(params);
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          (Object.keys(config.data).length > 0 || config.data instanceof FormData)
        ) {
          config.data = data;
          config.params = params;
        } else {
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // 兼容restful 风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }

    return config;
  },
  /* 
    实现请求拦截器处理
  */
  requestInterceptors: (config, options) => {
    // 设置token
    // const token = getToken();
    const token = 'fakeToken1';
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      (config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    return config;
  },
  /* 
    响应拦截器处理
  */
  responseInterceptors: (res) => {
    return res;
  },
  /* 
    响应错误处理
  */
  responseInterceptorsCatch(axiosInstance, error) {
    return error;
  },
};

// 将CreateAxiosOptions中的所有类型转化为可选
function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new LAxios(
    deepMerge(
      {
        // see https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        authenticationScheme: '',
        // 超时
        timeout: 10 * 1000,
        headers: { 'Content-type': ContentTypeEnum.JSON },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100,
          },
        },
      },
      opt || {},
    ),
  );
}

export const defHttp = createAxios();
