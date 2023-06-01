/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-19 21:40:07
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-29 13:47:48
 * @FilePath: /v3ts-lockin/src/api/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ErrorMessageMode } from '#/axios';
import { defHttp } from '@/utils/http';

import { LoginParams, LoginResultModel, GetUserInfoModel } from './sys/model/userModel';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
