/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-19 12:03:24
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-04-02 15:18:50
 * @FilePath: /v3ts-lockin/src/api/sys/model/userModel.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

export interface GetUserInfoModel {
  roles: RoleInfo[];
  userId: string | number;
  // 用户
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
