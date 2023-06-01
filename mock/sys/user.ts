/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-01 16:28:47
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-29 13:53:07
 * @FilePath: /v3ts-lockin/mock/sys/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestTOken, requestParams } from '../_util';

export function createFakseUserList() {
  return [
    {
      userId: '1',
      username: 'lockin',
      password: '123456',
      realName: 'Lockin Admin',
      avator: '',
      desc: 'manager',
      token: 'fakeToken1',
      homePath: '/dashboard',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realName: 'test user',
      avatar: '',
      desc: 'tester',
      token: 'fakeToken2',
      homePath: '/dashboard/workbench',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
  ];
}

const fakseCodeList: any = {
  '1': ['1000', '3000', '5000'],
  '2': ['2000', '4000', '6000'],
};

export default [
  {
    url: '/basic-api/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      console.log(username, password);
      const checkUser = createFakseUserList().find(
        (item) => item.username === username && password === item.password,
      );
      if (!checkUser) {
        return resultError('Incorrect account or password!');
      }
      const { userId, username: _username, token, realName, desc, roles } = checkUser;
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realName,
        desc,
      });
    },
  },
  {
    url: '/basic-api/getUserInfo',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestTOken(request);
      const checkUser = createFakseUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained');
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/basic-api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestTOken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakseUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      return resultSuccess(undefined, { message: 'Token has been destoryed' });
    },
  },
] as MockMethod[];
